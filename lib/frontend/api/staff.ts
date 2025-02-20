import { ApiClient } from '@/core/services/client'
import { AwardType, User } from '@prisma/client'
import { StudentProfile } from './student'
import { CompanyProfile } from './company'
import {
  redeemAward as server_redeemAward,
  createAward as server_createAward,
} from '@/lib/server/services/staff'
import { activityManagement } from '@/lib/server/services/activities'

export type AwardData = Awaited<ReturnType<typeof server_redeemAward>>
export type AwardCreateData = Awaited<ReturnType<typeof server_createAward>>
export type ActivityManagementDetails = Awaited<
  ReturnType<typeof activityManagement>
>

export const fetchUsers = async (search?: string): Promise<User[]> => {
  let queryParams = new URLSearchParams()

  if (search) queryParams.append('search', search)

  const { data } = await ApiClient.get(
    `staff/users${queryParams.size > 0 ? '?' + queryParams.toString() : ''}`
  )
  return data
}

export const fetchUser = async (uuid: string): Promise<User> => {
  const { data } = await ApiClient.get(`staff/users/${uuid}`)
  return data
}

export const fetchUserDetails = async (
  uuid: string
): Promise<StudentProfile | CompanyProfile> => {
  const { data } = await ApiClient.get(`staff/users/${uuid}/details`)
  return data
}

export const readAward = async (uuid: string): Promise<AwardData> => {
  const { data } = await ApiClient.get(`staff/award/read/${uuid}`)
  return data
}

export const redeemAward = async (uuid: string): Promise<AwardData> => {
  const { data } = await ApiClient.get(`staff/award/redeem/${uuid}`)
  return data
}

export const modifyAward = async (uuid: string, award_id: number): Promise<AwardData> => {
  const { data } = await ApiClient.put(`staff/award/modify/${uuid}/${award_id}`)
  return data
}

export interface UpdateStudentPointsRequest {
  uuid: string
  points: number
}

export const updateStudentPoints = async ({
  uuid,
  points,
}: UpdateStudentPointsRequest) => {
  const { data: profile } = await ApiClient.patch(
    `staff/users/${uuid}/set-points`,
    {
      points,
    }
  )

  return profile
}

export interface CreateAwardRequest {
  uuid: string
  type: AwardType
}

export const createAward = async ({ uuid, type }: CreateAwardRequest) => {
  const { data: award } = await ApiClient.post(
    `staff/users/${uuid}/create-award`,
    {
      type,
    }
  )

  return award
}

export const fetchActivityDetails = async (
  id: number
): Promise<ActivityManagementDetails> => {
  const { data } = await ApiClient.get(`activities/manage/${id}`)
  return data
}

export enum EnrollmentManagementAction {
  ENROLL = 'ENROLL',
  DISCARD = 'DISCARD',
  CONFIRM = 'CONFIRM',
}

export interface ManageEnrollmentRequest {
  id: number
  userId: string
  action: EnrollmentManagementAction
}

export const manageEnrollment = async ({
  id,
  userId,
  action,
}: ManageEnrollmentRequest) => {
  const { data } = await ApiClient.patch(`activities/manage/${id}`, {
    action,
    userId,
  })

  return data
}
