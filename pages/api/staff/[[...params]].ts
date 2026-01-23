import { UserData, handleApiException } from '@/core/utils'
import {
  BadRequestException,
  Body,
  Catch,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  createHandler,
} from 'next-api-decorators'
import {
  RequiresSession,
  RestrictedValidationPipe,
  Role,
} from '@/lib/server/middleware'
import * as StaffService from '@/lib/server/services/staff'
import { isUUID } from 'class-validator'
import type { User } from '@prisma/client'

import { PrismaClient, EventLogType } from '@prisma/client'
const prisma = new PrismaClient()

@Catch(handleApiException)
@RequiresSession()
@Role('Staff')
class StaffRoutes {
  @Get('/users')
  public async searchUser(@Query('search') query: string) {
    return await StaffService.searchUser(query)
  }

  @Get('/users/:uuid')
  public async getUser(@Param('uuid') uuid: string) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid user id')
    return await StaffService.getUser(uuid)
  }

  @Get('/users/:uuid/details')
  public async getUserDetails(@Param('uuid') uuid: string) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid user id')
    return await StaffService.getUserDetails(uuid)
  }

  @Patch('/users/:uuid/set-points')
  public async setStudentPoints(
    @UserData() user: User,
    @Param('uuid') uuid: string,
    @Body(RestrictedValidationPipe) data: StaffService.UpdatePointsDto
  ) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid user id')
    return await StaffService.setStudentPoints(user, uuid, data)
  }

  @Post('/users/:uuid/create-award')
  public async createAward(
    @UserData() user: User,
    @Param('uuid') uuid: string,
    @Body(RestrictedValidationPipe) data: StaffService.CreateAwardDto
  ) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid user id')
    return await StaffService.createAward(user, uuid, data)
  }

  @Get('/award/read/:uuid')
  public async readAward(@Param('uuid') uuid: string) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid award token id')
    return await StaffService.readAward(uuid)
  }

  @Get('/award/redeem/:uuid')
  public async redeemAward(@Param('uuid') uuid: string) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid award token id')
    return await StaffService.redeemAward(uuid)
  }

  @Put('/award/modify/:uuid/:award_id')
  public async modifyAward(
    @Param('uuid') uuid: string,
    @Param('award_id') award_id: number,
  ) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid award token id')
    return await StaffService.modifyAward(uuid, Number(award_id))
  }

    // === EVENT LOG ROUTES ===

  @Get('/eventlog')
  public async getEventLogs(@Query('type') type?: EventLogType) {
    const where = type ? { type } : {}

    return await prisma.eventLog.findMany({
      where,
      include: {
        actor: { select: { id: true, name: true, role: true } },
        target: { select: { id: true, name: true, role: true } },
        award: { select: { id: true, name: true } },
        activity: { select: { id: true, title: true } },
      },
      orderBy: { timestamp: 'desc' },
    })
  }

  @Post('/eventlog')
  public async createEventLog(
    @Body()
    body: {
      actorId: string
      targetId?: string
      type: EventLogType
      description: string
      awardId?: number
      activityId?: number
    }
  ) {
    const { actorId, type, description } = body
    if (!actorId || !type || !description)
      throw new BadRequestException('Missing required fields')

    return await prisma.eventLog.create({
      data: {
        actorId,
        targetId: body.targetId,
        type,
        description,
        awardId: body.awardId,
        activityId: body.activityId,
      },
    })
  }
}

export default createHandler(StaffRoutes)
