import { UserData, handleApiException } from '@/core/utils'
import {
  BadRequestException,
  Body,
  Catch,
  Get,
  Param,
  Patch,
  Post,
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

  @Get('/redeem/:uuid')
  public async redeemAward(@Param('uuid') uuid: string) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid award id')
    return await StaffService.redeemAward(uuid)
  }
}

export default createHandler(StaffRoutes)
