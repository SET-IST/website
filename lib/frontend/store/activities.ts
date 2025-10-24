import { ActivityType, CurrentDayState, Day } from '@prisma/client'
import { DateTime } from 'luxon'
import { StateCreator } from 'zustand'
import { fetchActiveDays } from '@/lib/frontend/api/activities'

export interface ActivitiesSlice {
  selectedDay?: Day
  cvDialogForActivity?: ActivityType
  activeDays: Day[]
  setSelectedDate: (date: string) => void
  showCVDialog: (activity?: ActivityType) => void
  fetchActiveDays: () => Promise<void>
}

export const createActivitiesSlice: StateCreator<
  ActivitiesSlice,
  [],
  [],
  ActivitiesSlice
> = (set) => ({
  selectedDay: {
    id: -1,
    dateCode: '01_01_1970',
    date: new Date(0),
    state: CurrentDayState.Active,
    activities: []
  },
  cvDialogVisible: undefined,
  activeDays: [],
  setSelectedDate: (date) =>
    set((state) => {
      const day = state.activeDays.find(d => d.date.toISOString() === date)
      return {selectedDay: day}
    }),
  showCVDialog: (activity) =>
    set({
      cvDialogForActivity: activity,
    }),
  fetchActiveDays: async () => {
    const result = await fetchActiveDays()
    const days = result.sort(
      (a, b) =>
        DateTime.fromJSDate(a.date).toMillis() -
        DateTime.fromJSDate(b.date).toMillis()
    )
    if (days.length > 0) {
      const today = DateTime.now().startOf('day')
      const dayDates = days.map((d) =>
        DateTime.fromJSDate(d.date).startOf('day')
      )
      const firstDay = dayDates[0]
      const lastDay = dayDates[dayDates.length - 1]
      let selected = days[0]
      if (today >= firstDay && today <= lastDay) {
        const match = dayDates.find((d) => d.hasSame(today, 'day'))
        if (match) {
          selected =
            days.find((d) =>
              DateTime.fromJSDate(d.date).hasSame(match, 'day')
            ) ?? days[0]
        }
      }

      set({
        activeDays: result,
        selectedDay: selected,
      })
    }
  },
})
