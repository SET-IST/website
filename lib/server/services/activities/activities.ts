import { databaseQueryWrapper } from '@/core/utils'
import { PrismaService } from '../../../../core/services/server'
import {
  Activity,
  ActivityType, CurrentDayState,
  EventLogType,
  Prisma,
  UserType,
} from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@/lib/server/middleware'
import type { User } from '@prisma/client'
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from 'next-api-decorators'
import { PatchActivityDto } from './dtos'
import { DateTime } from 'luxon'
import { EventLogService, getFullResourcePath } from '@/lib/server/utils'

type ExtendedActivity = Activity & {
  confirmed?: boolean
  companies: {
    user: {
      name: string
      image: string | null
    }
  }[]
}

export async function getActivities(
  req: NextApiRequest,
  res: NextApiResponse,
  date: DateTime
): Promise<ExtendedActivity[] | undefined> {
  return await databaseQueryWrapper(async () => {
    let activities = await PrismaService.activity.findMany({
      where: {
        date: {
          gte: date.startOf('day').toJSDate(),
          lte: date.startOf('day').plus({ days: 1 }).toJSDate(),
        },
      },
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
    })
    const session = await getSession(req, res)

    // Sort activities by time
    activities.sort(
      (a, b) =>
        DateTime.fromJSDate(a.date).toMillis() -
        DateTime.fromJSDate(b.date).toMillis()
    )

    activities = activities.map((activity) => ({
      ...activity,
      companies: activity.companies.map((company) => ({
        ...company,
        user: {
          ...company.user,
          image: getFullResourcePath(company.user.image),
        },
      })),
    }))

    if (
      !session ||
      ![UserType.Student, UserType.Staff].includes(session.user?.role)
    )
      return activities

    const student = await PrismaService.studentDetails.findUniqueOrThrow({
      where: {
        userId: session.user.id,
      },
      include: {
        enrolledActivities: true,
      },
    })
    // Creates a dictionary with the key as activity id and value as confirmed from ActivityEnrollment model
    const enrolledActivities: Record<number, boolean> =
      student.enrolledActivities.reduce((acc, { activityId, confirmed }) => {
        acc[activityId] = confirmed
        return acc
      }, {} as Record<number, boolean>)

    return activities.map((activity) => {
      if (activity.id in enrolledActivities) {
        return {
          ...activity,
          confirmed: enrolledActivities[activity.id],
        }
      }
      return activity
    })
  })
}

export async function enrollStudent(user: User, id: number) {
  return await databaseQueryWrapper(async () => {
    const activity = await PrismaService.activity.findUniqueOrThrow({
      where: {
        id: id,
      },
    })

    if (activity.type === ActivityType.Lecture)
      throw new BadRequestException('Cannot enroll in a lecture')

    try {
      await PrismaService.activityEnrollment.create({
        data: {
          student: {
            connect: {
              userId: user.id,
            },
          },
          activity: {
            connect: {
              id: activity.id,
            },
          },
          confirmed: false,
        },
      })
      return activity
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new BadRequestException('Already enrolled')
          default:
            throw new InternalServerErrorException(error.message)
        }
      } else throw error
    }
  })
}

export async function removeStudent(user: User, id: number) {
  return await databaseQueryWrapper(async () => {
    const activity = await PrismaService.activity.findUniqueOrThrow({
      where: {
        id: id,
      },
    })

    if (activity.type === ActivityType.Lecture)
      throw new BadRequestException('Activity is not enrollable')

    const confirmed = await PrismaService.activityEnrollment.findUnique({
      where: {
        enrollmentId: {
          userId: user.id,
          activityId: activity.id,
        },
      },
    })

    try {
      if (confirmed?.confirmed)
        throw new ConflictException('Cannot remove confirmed enrollment')
      await PrismaService.activityEnrollment.delete({
        where: {
          enrollmentId: {
            userId: user.id,
            activityId: activity.id,
          },
        },
      })
      return activity
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new BadRequestException('Student not enrolled')
          default:
            throw new InternalServerErrorException(error.message)
        }
      } else throw error
    }
  })
}

export async function activityManagement(id: number) {
  return await databaseQueryWrapper(async () => {
    const activityToManagement = await PrismaService.activity.findUniqueOrThrow(
      {
        where: {
          id: id,
        },
        include: {
          enrollments: {
            include: {
              student: {
                select: {
                  id: true,
                  phoneNumber: true,
                  userId: true,
                  user: true,
                },
              },
            },
          },
        },
      }
    )

    return {
      ...activityToManagement,
      enrollments: activityToManagement.enrollments.map((enrollment) => ({
        ...enrollment,
        student: {
          ...enrollment.student,
          user: {
            ...enrollment.student.user,
            image: getFullResourcePath(enrollment.student.user.image),
          },
        },
      })),
    }
  })
}

export async function patchEnrollment(
  user: User,
  id: number,
  patchActivity: PatchActivityDto
) {
  return await databaseQueryWrapper(async () => {
    await EventLogService.logEvent(
      user,
      EventLogType.ENROLLMENTS,
      `Updated enrollment state of user ${patchActivity.userId} to ${patchActivity.action} at activity with id ${id}`
    )

    if (patchActivity.action != 'DISCARD') {
      const confirmed = patchActivity.action == 'CONFIRM'

      try {
        await PrismaService.activityEnrollment.upsert({
          where: {
            enrollmentId: {
              userId: patchActivity.userId,
              activityId: id,
            },
          },
          update: {
            confirmed: confirmed,
          },
          create: {
            student: {
              connect: {
                userId: patchActivity.userId,
              },
            },
            activity: {
              connect: {
                id: id,
              },
            },
            confirmed: confirmed,
          },
        })
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code == 'P2025') {
            throw new NotFoundException(String(error.meta?.cause))
          }
        } else throw error
      }
    } else {
      await PrismaService.activityEnrollment.delete({
        where: {
          enrollmentId: {
            userId: patchActivity.userId,
            activityId: id,
          },
        },
      })
    }

    return { message: 'Successfully updated activity management details' }
  })
}

export async function getActiveDays() {
  return (await databaseQueryWrapper(async () => {
    return await PrismaService.day.findMany({
      where: {
        state: CurrentDayState.Active
      }
    })
  })) ?? [];
}