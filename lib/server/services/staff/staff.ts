import { PrismaService } from '@/core/services/server'
import { databaseQueryWrapper } from '@/core/utils'
import { EventLogService, getFullResourcePath } from '../../utils'
import { EventLogType, User, UserType, AwardType, Award } from '@prisma/client'
import { getCompanyProfile } from '../company'
import { addTotalPoints, getRedemptionSettings, getStudentProfile, weightedRandomSelection } from '../student'
import { CreateAwardDto, UpdatePointsDto } from './dtos'
import { BadRequestException, ConflictException } from 'next-api-decorators'

export async function searchUser(query?: string) {
  return await databaseQueryWrapper(async () => {
    const searchQuery = {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
        {
          id: {
            contains: query,
          },
        },
      ],
    }

    const users = await PrismaService.user.findMany({
      where: searchQuery,
      take: 5,
    })

    return users.map((user) => ({
      ...user,
      image: getFullResourcePath(user.image),
    }))
  })
}

export async function getUser(uuid: string) {
  return await databaseQueryWrapper(async () => {
    return await PrismaService.user.findUniqueOrThrow({
      where: {
        id: uuid,
      },
    })
  })
}

export async function getUserDetails(uuid: string) {
  return await databaseQueryWrapper(async () => {
    const user = await getUser(uuid)

    return user!.role === UserType.Company
      ? getCompanyProfile(user!)
      : getStudentProfile(user!)
  })
}

export async function createAward(
  user: User,
  uuid: string,
  data: CreateAwardDto
) {
  return await databaseQueryWrapper(async () => {
    // Check if student already has an award
    let existingToken = await PrismaService.awardToken.findUnique({
      where: {
        userId: uuid,
      },
      select: {
        id: true,
        type: true,
      },
    })

    if (existingToken)
      throw new ConflictException('Student already has an award pending')

    const response = await PrismaService.$transaction(async (tx) => {
      // Fetch student and available prizes (don't require points for staff assignment)
      const studentTx = await tx.studentDetails.findUniqueOrThrow({
        where: {
          userId: uuid,
        },
        include: {
          redeemedPrizes: true,
        },
      })

      const redeemedPrizeIds = studentTx.redeemedPrizes.map((p) => p.awardId)
      let availablePrizes = await tx.award.findMany({
        where: {
          id: {
            notIn: redeemedPrizeIds,
          },
          amountAvailable: { gt: 0 },
        },
      })

      if (availablePrizes.length === 0) {
        availablePrizes = await tx.award.findMany({
          where: {
            amountAvailable: { gt: 0 },
          },
        })
      }

      if (availablePrizes.length === 0) {
        throw new BadRequestException(
          'No prizes available'
        )
      }

      const ratio = (await getRedemptionSettings()).RATIO
      // Prefer the type provided by staff; fallback to computed type if none provided
      const computedType = (studentTx.redeems + (ratio - 1)) % ratio === 0 ? AwardType.SPECIAL : AwardType.NORMAL
      const awardType = (data && data.type) ? data.type : computedType
      const selectedPrize = weightedRandomSelection(availablePrizes, awardType)

      return await tx.awardToken.create({
        data: {
          type: awardType,
          bypassPoints: true,
          student: {
            connect: {
              userId: uuid,
            },
          },
          award: {
            connect: {
              id: selectedPrize.id,
            },
          },
        },
        select: {
          id: true,
          type: true,
          award: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
    })
    await EventLogService.logEvent(
      user,
      EventLogType.AWARDS,
      `Created award ${response.id} (${response.type}) for student ${uuid}`
    )

    return response
  })
}

export async function readAward(uuid: string) {
  const details = await PrismaService.awardToken.findUniqueOrThrow({
      where: {
        id: uuid,
      },
      include: {
        student: {
          select: {
            id: true,
            user: true,
          },
        },
        award: true,
      },
    })
    return details
}

export async function redeemAward(uuid: string, awardOverride?: string) {
  return await databaseQueryWrapper(async () => {
    const details = await PrismaService.awardToken.findUniqueOrThrow({
      where: {
        id: uuid,
      },
      include: {
        student: {
          select: {
            id: true,
            user: true,
          },
        },
        award: true,
      },
    })

    let finalPrizeName = details.award.name
    if (awardOverride) {
      finalPrizeName = awardOverride
    }

    await PrismaService.$transaction(async (tx) => {
      await tx.awardToken.delete({
        where: {
          id: details.id,
        },
      })

      const studentUpdateData: any = {}
      if (!details.bypassPoints) {
        studentUpdateData.points = {
          decrement: (await getRedemptionSettings()).REDEEM,
        }
        studentUpdateData.redeems = {
          increment: 1,
        }
      }

      if (Object.keys(studentUpdateData).length > 0) {
        await tx.studentDetails.update({
          where: {
            userId: details.userId,
          },
          data: studentUpdateData,
        })
      }
      await tx.award.update({
        where: {
          id: details.awardId,
        },
        data: {
          amountAvailable: {
            decrement: 1,
          },
        },
      })

      await tx.redeemedPrize.create({
        data: {
          type: details.award.type,
          studentDetailsId: details.student.id,
          awardId: details.award.id,
        },
      })
    })
    return details
  })
}

export async function setStudentPoints(
  user: User,
  uuid: string,
  data: UpdatePointsDto
) {

  return await databaseQueryWrapper(async () => {
    await PrismaService.$transaction(async (tx) => {
      const studentTx = await tx.studentDetails.findUniqueOrThrow({
        where: {
          userId: uuid,
        },
        include: {
          dayTotalPoints: {
            include: {
              day: true
            }
          }
        }
      })

      const points_to_add = data.points - studentTx.points
      await addTotalPoints(studentTx, points_to_add)

      await PrismaService.studentDetails.update({
        where: {
          userId: uuid,
        },
        data: {
          points: data.points,
        },
      })

      await EventLogService.logEvent(
        user,
        EventLogType.POINTS,
        `Updated points of student ${uuid} from ${studentTx.points} to ${data.points} (${points_to_add})`
      )

    })
  })
}

export async function modifyAward(uuid: string, award_id: number) {
  return await databaseQueryWrapper(async () => {
    await PrismaService.$transaction(async (tx) => {
      await tx.awardToken.update({
        where: {
          id: uuid,
        },
        data: {
          awardId: award_id,
        },
      })
    })
    return await readAward(uuid)
  })
}
