import { PrismaService } from '@/core/services/server'
import { EventLogType, User } from '@prisma/client'
import { DateTime } from 'luxon'

interface LogEventOptions {
  target?: { id: string }
  awardId?: number
  activityId?: number
}

export async function logEvent(
  actor: User,               // who performed the action
  type: EventLogType,
  description: string,
  options?: LogEventOptions  // optional target, award, or activity
) {
  await PrismaService.eventLog.create({
    data: {
      timestamp: DateTime.now().toJSDate(),
      type,
      description,
      actorId: actor.id,            // required actor
      targetId: options?.target?.id, 
      awardId: options?.awardId,
      activityId: options?.activityId,
    },
  })
}
