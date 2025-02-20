import { ApiClient } from '@/core/services/client'
import {
  IPatchStudentProfile,
  getStudentCompanies,
  getStudentEnrollments,
  getStudentProfile,
  patchStudentProfile,
  requestAward,
  scanCompany as server_scanCompany,
  getRedemptionSettings,
  getAwardsList,
} from '@/lib/server/services/student'
import { Unpacked } from '../utils'

// Get types from backend services
export type StudentProfile = Awaited<ReturnType<typeof getStudentProfile>>
export type StudentProfilePatchResponse = Awaited<
  ReturnType<typeof patchStudentProfile>
>

export type ScannedCompany = Unpacked<
  Awaited<ReturnType<typeof getStudentCompanies>>
>
export type UserEnrollment = Unpacked<
  Awaited<ReturnType<typeof getStudentEnrollments>>
>
export type CompanyScan = Awaited<ReturnType<typeof server_scanCompany>>
export type AwardToken = Awaited<ReturnType<typeof requestAward>>
export type RedemptionSettings = Awaited<ReturnType<typeof getRedemptionSettings>>
export type Award = Awaited<ReturnType<typeof getAwardsList>>

export const fetchStudentProfile = async (): Promise<StudentProfile> => {
  const { data } = await ApiClient.get('student/profile')
  return data
}

export const updateStudentProfile = async (
  data: IPatchStudentProfile
): Promise<StudentProfilePatchResponse> => {
  const { data: profile } = await ApiClient.patch('student/profile', data)

  return profile
}

export const fetchStudentCompaniesScans = async (): Promise<
  ScannedCompany[]
> => {
  const { data } = await ApiClient.get('student/companies')
  return data
}

export const fetchEnrolledActivities = async (): Promise<UserEnrollment[]> => {
  const { data } = await ApiClient.get('student/enrollments')
  return data
}

export const scanCompany = async (companyId: string): Promise<CompanyScan> => {
  const { data } = await ApiClient.post(`student/scan/${companyId}`)
  return data
}

export const fetchAward = async (): Promise<AwardToken> => {
  const { data } = await ApiClient.get('student/award')
  return data
}

export const fetchRedemptionSettings = async (): Promise<RedemptionSettings> => {
  const { data } = await ApiClient.get('student/redemptionSettings')
  return await data
}

export const fetchAwardsList = async (): Promise<Award[]> => {
  const { data } = await ApiClient.get('student/awardsList')
  return await data
}
