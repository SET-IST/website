import { ApiClient } from '@/core/services/client'
import {
  enrollStudent, getActiveDays,
  getActivities,
  removeStudent,
} from '@/lib/server/services/activities'

type Unpacked<T> = T extends (infer U)[] ? U : T
export type ActivityData = Unpacked<Awaited<ReturnType<typeof getActivities>>>
export type EnrollUserResponse = Awaited<ReturnType<typeof enrollStudent>>
export type UnEnrollUserResponse = Awaited<ReturnType<typeof removeStudent>>
export type Day = Unpacked<Awaited<ReturnType<typeof getActiveDays>>>


export const fetchActivities = async (
  date: string
): Promise<ActivityData[]> => {
  const { data } = await ApiClient.get(`activities?date=${encodeURI(date)}`)
  return data
}

export const enrollUser = async (
  activityId: string
): Promise<EnrollUserResponse> => {
  const { data } = await ApiClient.post(`activities/${activityId}/enroll`)
  return data
}

export const unEnrollUser = async (
  activityId: string
): Promise<UnEnrollUserResponse> => {
  const { data } = await ApiClient.post(`activities/${activityId}/cancel`)
  return data
}

export const fetchActiveDays = async(): Promise<Day[]> => {
  const { data } = await ApiClient.get(`activities/activeDays`)
  return data
}