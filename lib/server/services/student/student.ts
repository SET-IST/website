import { databaseQueryWrapper } from '@/core/utils'
import { PrismaService } from '../../../../core/services/server'
import { PointSetting, Award, AwardType, User, Prisma } from '@prisma/client'
import { PatchStudentProfileDto } from './dtos'
import { getFile, getFullResourcePath } from '@/lib/server/utils'
import { BadRequestException, ConflictException } from 'next-api-decorators'
import { getCurrentDayCode, visitedAllDayStands } from '../../utils/event'
import { DateTime } from 'luxon'

export function weightedRandomSelection(availablePrizes: Award[], awardType: AwardType): Award {
  const selectablePrizes = availablePrizes.filter((award) => award.type === awardType);
  
  const totalWeight = selectablePrizes.reduce((sum, award) => sum + award.amountAvailable, 0);
  let randomValue = Math.random() * totalWeight;

  for (const award of selectablePrizes) {
    randomValue -= award.amountAvailable;
    if (randomValue <= 0) {
      return award;
    }
  }

  console.error('Weighted random selection failed');
  return selectablePrizes[selectablePrizes.length - 1]; // Fallback (shouldn't reach here)
}

export async function getStudentProfile(user: User) {
  return await databaseQueryWrapper(async () => {
    let student = await PrismaService.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },

      include: {
        studentDetails: {
          select: {
            id: true,
            university: true,
            course: true,
            scans: true,
            points: true,
            dayTotalPoints: {
              include: {
                day: true
              },
            },
            cvLocation: true,
            phoneNumber: true,
            redeems: true,
          },
        },
      },
    })

    const response = {
      ...student,
      image: getFullResourcePath(student.image),
      cv:
        student.studentDetails?.cvLocation &&
        (await getFile(student.studentDetails?.cvLocation)),
      totalPoints: getTotalPoints(student.studentDetails as StudentDetails | null, true)
    }

    return response
  })
}

export async function patchStudentProfile(
  user: User,
  data: PatchStudentProfileDto
) {
  return await databaseQueryWrapper(async () => {
    await PrismaService.studentDetails.update({
      where: {
        userId: user.id,
      },
      data: {
        user: {
          update: {
            name: data.name,
            email: data.email,
          },
        },
        university: data.institutionCode,
        course: data.courseCode,
        phoneNumber: data.phoneNumber,
      },
    })
    return { message: 'User profile updated' }
  })
}

export async function getStudentCompanies(user: User) {
  return await databaseQueryWrapper(async () => {
    const details = await PrismaService.studentDetails.findUniqueOrThrow({
      where: {
        userId: user.id,
      },

      select: {
        companies: {
          select: {
            id: true,
            description: true,
            linkHref: true,
            linkText: true,
            category: true,
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    return details.companies.map((company) => ({
      ...company,
      user: {
        ...company.user,
        image: getFullResourcePath(company.user.image),
      },
    }))
  })
}

export async function getStudentEnrollments(user: User) {
  return await databaseQueryWrapper(async () => {
    let enrollments = await PrismaService.studentDetails.findUniqueOrThrow({
      where: {
        userId: user.id,
      },

      select: {
        enrolledActivities: {
          select: {
            activityId: true,
            confirmed: true,
            activity: {
              include: {
                companies: {
                  select: {
                    user: {
                      select: {
                        name: true,
                        image: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    // Company images
    enrollments = {
      enrolledActivities: enrollments.enrolledActivities.map(
        (activityEnrollment) => ({
          ...activityEnrollment,
          activity: {
            ...activityEnrollment.activity,
            confirmed: activityEnrollment.confirmed,
            companies: activityEnrollment.activity.companies.map((company) => ({
              ...company,
              user: {
                ...company.user,
                image: getFullResourcePath(company.user.image),
              },
            })),
          },
        })
      ),
    }

    return enrollments.enrolledActivities
  })
}

export async function scanCompany(user: User, companyId: string) {
  return await databaseQueryWrapper(async () => {
    const company = await PrismaService.companyDetails.findUniqueOrThrow({
      where: {
        userId: companyId,
      },
      select: {
        userId: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        description: true,
        linkHref: true,
        linkText: true,
      },
    })

    const student = await PrismaService.studentDetails.findFirstOrThrow({
      where: {
        userId: user.id,
      },
      include: {
        dayTotalPoints: {
          include: {
            day: true
          }
        }
      }
    })

    if (student.companies_ids.includes(company.userId))
      throw new ConflictException('Company already scanned')

    const points = (await visitedAllDayStands(student, company.userId))
      ? 50
      : (await getRedemptionSettings()).REWARD

    await PrismaService.$transaction([
      PrismaService.companyDetails.update({
        where: {
          userId: company.userId,
        },
        data: {
          students: {
            connect: {
              userId: student.userId,
            },
          },
          scans: {
            increment: 1,
          },
        },
      }),
      PrismaService.studentDetails.update({
        where: {
          userId: student.userId,
        },
        data: {
          companies: {
            connect: {
              userId: company.userId,
            },
          },
          companies_ids: {
            push: company.userId,
          },
          points: {
            increment: points,
          },
          scans: {
            increment: 1,
          },
        },
      })
    ])

    await addTotalPoints(student, points)

    return {
      ...company,
      user: {
        ...company.user,
        image: getFullResourcePath(company.user.image),
      },
      points: points,
    }
  })
}

export async function requestAward(user: User) {
  return await databaseQueryWrapper(async () => {
    // Check if an award already exists

    let prize = await PrismaService.awardToken.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        type: true,
        award: {
            select: {
              id: true,
              name: true,
            }
          }
      },
    })

    if (prize) return prize

    // Generate QR

    return await PrismaService.$transaction(async (tx) => {
      // Check points
      const studentTx = await tx.studentDetails.findUniqueOrThrow({
        where: {
          userId: user.id,
        },
        include: {
          redeemedPrizes: true
        },
      })

      if (studentTx.points - (await getRedemptionSettings()).REDEEM < 0) {
        throw new BadRequestException(
          'The student does not have enough points to request awards'
        )
      }

      const redeemedPrizeIds = studentTx.redeemedPrizes.map((p) => p.awardId)

      const ratio = (await getRedemptionSettings()).RATIO;
      const awardType = (studentTx.redeems + (ratio - 1)) % ratio === 0
      ? AwardType.SPECIAL
      : AwardType.NORMAL

      let availablePrizes = await tx.award.findMany({
        where: {
          id: {
            notIn: redeemedPrizeIds
          },
          amountAvailable: {
            gt: 0
          },
          type: awardType
        },
      })

      if (availablePrizes.length === 0) {
        availablePrizes = await tx.award.findMany({
          where: { amountAvailable: { gt: 0 } },
        })
      }

      if (availablePrizes.length === 0) {
        throw new BadRequestException(
          'No prizes available'
        )
      }
      
      const selectedPrize = weightedRandomSelection(availablePrizes, awardType);
      
      return await tx.awardToken.create({
        data: {
          type: awardType,
          student: {
            connect: {
              userId: user.id
            }
          },
          award: {
            connect: {
              id: selectedPrize.id
            }
          },
        },
        select: {
          id: true,
          type: true,
          award: {
            select: {
              id: true,
              name: true
            }
          }
        },
      })
    })
  })
}

export async function getRedemptionSettings() {
  return (await PrismaService.redemptionSettings.findMany()).reduce((acc, row) => {
    acc[row.setting] = row.amount;
    return acc;
  }, {} as Record<PointSetting, number>)
}

type StudentDetails = Prisma.StudentDetailsGetPayload<{
  include: {
    dayTotalPoints: {
      include: {
        day: true
      }
    }
  }
}>

export function getTotalPoints(studentDetails: StudentDetails | null, all?: boolean): number {
  if (!studentDetails) return 0;

  if(all) {
    return studentDetails.dayTotalPoints
      .reduce((sum, transaction) => {
        return sum + transaction.total_points
      }, 0)
  }

  const dayTotalPoints =
    studentDetails.dayTotalPoints.find(
      (points) => points.day.dateCode === getCurrentDayCode()
    ) ||
    studentDetails.dayTotalPoints.find(
      (points) =>
        points.day.dateCode === DateTime.fromMillis(0).toFormat('dd_LL_yyyy')
    );

  return dayTotalPoints?.total_points ?? 0;
}

export async function addTotalPoints(studentDetails: StudentDetails, totalPoints: number) {
  return databaseQueryWrapper(async () => {
    const currentDayCode = getCurrentDayCode();
    const defaultDayCode = DateTime.fromMillis(0).toFormat('dd_LL_yyyy');

    let day = await PrismaService.day.findFirst({
      where: {
        OR: [
          { dateCode: currentDayCode },
          { dateCode: defaultDayCode },
        ],
      },
      orderBy: {
        dateCode: currentDayCode === defaultDayCode ? 'asc' : 'desc',
      },
    });

    if (!day) {
      day = await PrismaService.day.create({
        data: { dateCode: defaultDayCode },
      });
    }

    return PrismaService.dayTotalPoints.upsert({
      where: {
        dayId_studentDetailsId: {
          dayId: day.id,
          studentDetailsId: studentDetails.id,
        },
      },
      update: {
        total_points: { increment: totalPoints },
      },
      create: {
        dayId: day.id,
        studentDetailsId: studentDetails.id,
        total_points: totalPoints,
      },
    });
  });
}

export async function getAwardsList() {
  return await PrismaService.award.findMany({
    select: {
      id: true,
      name: true,
      amountAvailable: true,
      type: true,
    },
  })
}
