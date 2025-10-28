import { handleApiException } from '@/core/utils'
import {
  CompanyLoginRequest,
  PatchCompanyProfileDto,
} from '@/lib/server/services/company/dtos'
import {
  Body,
  Catch,
  Post,
  Get,
  createHandler,
  Patch,
  Query,
  Param,
  Download,
  Res,
} from 'next-api-decorators'
import * as CompanyService from '@/lib/server/services/company'
import {
  RequiresSession,
  RestrictedValidationPipe,
  Role,
} from '@/lib/server/middleware'
import type { User } from '@prisma/client'
import { UserData } from '@/core/utils'

@Catch(handleApiException)
class CompanyRoutes {
  @Get('/profile')
  @RequiresSession()
  @Role('Company')
  public async getCompanyProfile(@UserData() user: User) {
    return await CompanyService.getCompanyProfile(user)
  }

  @Patch('/profile')
  @RequiresSession()
  @Role('Company')
  public async updateCompanyProfile(
    @UserData() user: User,
    @Body(RestrictedValidationPipe) req: PatchCompanyProfileDto
  ) {
    return await CompanyService.patchCompanyProfile(user, req)
  }

  @Get('/students')
  @RequiresSession()
  @Role('Company')
  public async getCompanyStudents(
    @UserData() user: User,
    @Query('page') page?: number,
    @Query('search') query?: string
  ) {
    return await CompanyService.getCompanyStudents(user, page, query)
  }

  @Get('/activities')
  @RequiresSession()
  @Role('Company')
  public async getCompanyActivities(@UserData() user: User) {
    return await CompanyService.getCompanyActivities(user)
  }

  @Get('/students/cv/:cv')
  @Download()
  @RequiresSession()
  @Role('Company')
  public async downloadCV(@UserData() user: User, @Param('cv') cv: string) {
    return await CompanyService.downloadCV(user, cv)
  }
}

export default createHandler(CompanyRoutes)
