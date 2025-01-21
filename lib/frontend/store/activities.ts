import { ActivityType } from '@prisma/client'
import { DateTime } from 'luxon'
import { StateCreator } from 'zustand'

export interface ActivitiesSlice {
  selectedDate: string
  cvDialogForActivity?: ActivityType

  setSelectedDate: (date: string) => void
  showCVDialog: (activity?: ActivityType) => void
}

export const createActivitiesSlice: StateCreator<
  ActivitiesSlice,
  [],
  [],
  ActivitiesSlice
> = (set) => ({
  selectedDate:
    (DateTime.fromISO('2025-02-24') <= DateTime.now() &&
    DateTime.now().startOf('day') <= DateTime.fromISO('2025-02-27')
      ? DateTime.now().startOf('day').toISODate()
      : '2025-02-24') ?? '2025-02-24',
  cvDialogVisible: undefined,
  setSelectedDate: (date) =>
    set({
      selectedDate: date,
    }),
  showCVDialog: (activity) =>
    set({
      cvDialogForActivity: activity,
    }),
})
