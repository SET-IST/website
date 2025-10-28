import { databaseQueryWrapper } from '@/core/utils'
import { CompanyLoginRequest, PatchCompanyProfileDto } from './dtos'
import { PrismaService } from '@/core/services/server'
import {
  ForbiddenException,
  NotFoundException,
} from 'next-api-decorators'
import { downloadFile, getFile, getFullResourcePath } from '../../utils'
import { CompanyCategory, User } from '@prisma/client'

export async function getCompanyProfile(user: User) {
  return await databaseQueryWrapper(async () => {
    const company = await PrismaService.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        companyDetails: {
          select: {
            id: true,
            description: true,
            linkHref: true,
            linkText: true,
            category: true,
            scans: true,
            activities: true,
          },
        },
      },
    })

    const response = {
      ...company,
      image: getFullResourcePath(company.image),
    }

    return response
  })
}

export async function patchCompanyProfile(
  user: User,
  req: PatchCompanyProfileDto
) {
  return await databaseQueryWrapper(async () => {
    await PrismaService.companyDetails.update({
      where: {
        userId: user.id,
      },
      data: {
        user: {
          update: {
            name: req.name,
          },
        },
        description: req.description,
        linkHref: req.linkHref,
        linkText: req.linkText,
      },
    })
    return { message: 'Company profile updated' }
  })
}

export async function getCompanyStudents(
  user: User,
  page?: number,
  query?: string
) {
  return await databaseQueryWrapper(async () => {
    const company = await PrismaService.companyDetails.findUniqueOrThrow({
      where: {
        userId: user.id,
      },
    })

    const searchQuery = {
      AND: [
        // Disabled, we need to think another way of doing this
        // Although this enforces the policy "has to be scanned by the student", when the students
        // scans reset (everyday at midnight) the companies also lose access to the students CVs.
        /* {
          companies_ids: {
            has: user.id,
          },
        }, */
        // UPDATE: Nvm, found it
        {
          companies: {
            some: {
              userId: company.userId,
            },
          },
        },
        {
          OR: [
            {
              user: {
                name: {
                  contains: query,
                },
              },
            },
            {
              user: {
                email: {
                  contains: query,
                },
              },
            },
            {
              course: {
                contains: query,
              },
            },
            {
              university: {
                contains: query,
              },
            },
          ],
        },
      ],
    }

    const [details, count] = await PrismaService.$transaction([
      PrismaService.studentDetails.findMany({
        where: searchQuery,
        skip: (page ? page - 1 : 0) * 25,
        take: 25,
        select: {
          id: true,
          university: true,
          course: true,
          cvLocation: company.category === CompanyCategory.Platinum,
          user: {
            select: {
              name: true,
              image: true,
              email: true,
            },
          },
        },
      }),
      PrismaService.studentDetails.count({
        where: searchQuery,
      }),
    ])

    return {
      pagination: {
        pages: Math.ceil(count / 25),
      },
      data: details.map((student) => ({
        ...student,
        ...student.user,
        user: undefined,
        image: getFullResourcePath(student.user.image),
      })),
    }
  })
}

export async function getCompanyActivities(user: User) {
  return await databaseQueryWrapper(async () => {
    let activities = await PrismaService.companyDetails.findUniqueOrThrow({
      where: {
        userId: user.id,
      },
      select: {
        activities: {
          include: {
            enrollments: {
              select: {
                confirmed: true,
                student: {
                  select: {
                    id: true,
                    university: true,
                    course: true,
                    cvLocation: true,
                    user: {
                      select: {
                        name: true,
                        image: true,
                        email: true,
                      },
                    },
                  },
                },
              },
            },
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
    })

    return activities.activities.map((activity) => ({
      ...activity,
      companies: activity.companies.map((company) => ({
        ...company,
        user: {
          ...company.user,
          image: getFullResourcePath(company.user.image),
        },
      })),
      enrollments: activity.enrollments
        .filter((enrollment) => enrollment.confirmed)
        .map((enrollment) => ({
          ...enrollment,
          student: {
            ...enrollment.student,
            user: {
              ...enrollment.student.user,
              image: getFullResourcePath(enrollment.student.user.image),
            },
          },
        })),
    }))
  })
}

export async function downloadCV(user: User, path: string) {
  return await databaseQueryWrapper(async () => {
    // Check company role
    const company = await PrismaService.companyDetails.findUniqueOrThrow({
      where: {
        userId: user.id,
      },
      include: {
        activities: true,
      },
    })

    // Check if file exists
    const fileHead = await getFile(path)

    if (!fileHead) throw new NotFoundException('Student CV not found')

    // Check if student (owner of CV) scanned this company
    let connectedStudent = await PrismaService.studentDetails.findFirst({
      where: {
        AND: [
          {
            userId: fileHead.metadata?.userid,
          },
          {
            companies: {
              some: {
                userId: company.userId,
              },
            },
          },
        ],
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    let activityRelatedCV = false

    if (!connectedStudent) {
      // Ok, user didn't scan the company. Maybe it's an enrollment?

      const companyEvents = company.activities.map((activity) => activity.id)

      const userEventRegistrations =
        await PrismaService.activityEnrollment.count({
          where: {
            AND: [
              {
                userId: fileHead.metadata?.userid,
              },
              {
                activityId: {
                  in: companyEvents,
                },
              },
            ],
          },
        })

      if (userEventRegistrations === 0) {
        throw new ForbiddenException('Student is not connected to the company')
      }

      // Repeat the query but without the connect rule
      connectedStudent = await PrismaService.studentDetails.findUniqueOrThrow({
        where: {
          userId: fileHead.metadata?.userid,
        },
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      })

      activityRelatedCV = true
    }

    if (company.category !== CompanyCategory.Platinum && !activityRelatedCV) {
      throw new ForbiddenException(
        'Company does not have the required category'
      )
    }

    const fileData = await downloadFile(path)

    return {
      filename: `CV ${connectedStudent.user.name}`,
      contents: fileData?.Body as ReadableStream,
      contentType: 'application/pdf',
    }
  })
}
