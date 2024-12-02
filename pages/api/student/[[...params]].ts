import {
  createHandler,
  Get,
  Patch,
  Body,
  Param,
  BadRequestException,
  Post,
} from 'next-api-decorators'
import * as Server from '../../../lib/server/services/student'
import {
  RequiresSession,
  RestrictedValidationPipe,
  Role,
} from '@/lib/server/middleware'
import { UserData } from '@/core/utils'
import type { User } from '@prisma/client'
import { isUUID } from 'class-validator'

@RequiresSession()
@Role('Student', 'Staff')
class StudentRoutes {
  @Get('/profile')
  public async getStudentProfile(@UserData() user: User) {
    return await Server.getStudentProfile(user)
  }

  @Patch('/profile')
  public async patchStudentProfile(
    @UserData() user: User,
    @Body(RestrictedValidationPipe) data: Server.PatchStudentProfileDto
  ) {
    return await Server.patchStudentProfile(user, data)
  }

  @Get('/companies')
  public async getStudentCompanies(@UserData() user: User) {
    return await Server.getStudentCompanies(user)
  }

  @Get('/enrollments')
  public async getStudentEnrollments(@UserData() user: User) {
    return await Server.getStudentEnrollments(user)
  }

  @Post('/scan/:id')
  public async scan(@UserData() user: User, @Param('id') companyId: string) {
    if (!isUUID(companyId)) throw new BadRequestException('Invalid company id')
    return await Server.scanCompany(user, companyId)
  }

  @Get('/award')
  public async requestAward(@UserData() user: User) {
    return await Server.requestAward(user)
  }

  @Get('/redemptionSettings')
  public async getRedemptionSettings() {
    return await Server.getRedemptionSettings()
  }
}

export default createHandler(StudentRoutes)
