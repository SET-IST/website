import { AwardType } from '@prisma/client'
import { IsIn, IsInt, Max, Min, IsBoolean, IsOptional } from 'class-validator'

export class UpdatePointsDto {
  @IsInt()
  @Min(0)
  @Max(1000)
  points!: number
}

export class CreateAwardDto {
  @IsIn([AwardType.NORMAL, AwardType.SPECIAL])
  type!: AwardType
  @IsOptional()
  @IsBoolean()
  bypassPoints?: boolean 
}
