import { useMediaQuery } from '@mantine/hooks'
import { DateTime } from 'luxon'
import { em } from '@mantine/core'
import {
  useActivities,
  useEnrollStudent,
  useUnEnrollStudent,
} from '@/lib/frontend/hooks/activities'
import Activity from './Activity'
import { useQueryClient } from '@tanstack/react-query'
import { showInfoNotification } from '@/components/Notifications'
import { useSession } from 'next-auth/react'
import { useBoundStore } from '@/lib/frontend/store'
import {
  EnrollUserResponse,
  UnEnrollUserResponse,
} from '@/lib/frontend/api/activities'
import ActivitySkeleton from './ActivitySkeleton'
import { User } from 'next-auth'
import { ActivityType, UserType } from '@prisma/client'
import { fetchStudentProfile } from '@/lib/frontend/api'
import { CVDialog } from '@/components/CVDialog'
import SpeedInterview from '@/assets/img/speed-interview.webp'
import ActivityCard from '@/_pages/ActivitiesPage/components/ActivityCard'

const UserActivities = () => {
  const session = useSession()
  const showLogin = useBoundStore((state) => state.showLoginDialog)
  const showCVDialog = useBoundStore((state) => state.showCVDialog)
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const currentDay = useBoundStore((state) => state.selectedDay)
  const { data: activities, isLoading } = useActivities(currentDay ? new Date(currentDay.date).toISOString() : '1970-01-01')

  const queryClient = useQueryClient()

  const {
    mutateAsync: enroll,
    isError: isEnrollError,
    error: enrollError,
  } = useEnrollStudent(queryClient)
  const {
    mutateAsync: unEnroll,
    isError: isUnEnrollError,
    error: unEnrollError,
  } = useUnEnrollStudent(queryClient)

  const enrollStudent = async (
    activityId: string,
    activityType: ActivityType
  ) => {
    if (session.status !== 'authenticated') {
      showLogin(true)
      return
    }

    if (
      session.data.user &&
      (session.data.user as User).role === UserType.Company
    )
      return

    const profile = await fetchStudentProfile()

    const missingInfo =
      (activityType === ActivityType.Workshop &&
        !profile?.studentDetails?.phoneNumber) ||
      (activityType === ActivityType.SpeedInterview &&
        (!profile?.studentDetails?.phoneNumber ||
          !profile.studentDetails.cvLocation))

    if (missingInfo) {
      showCVDialog(activityType)
      return
    }

    enroll(activityId).then((activity: EnrollUserResponse) => {
      showInfoNotification({
        title: 'Inscrição pendente de confirmação',
        message: activity?.title ?? '',
      })
    })
  }

  const unEnrollStudent = (activityId: string) => {
    unEnroll(activityId).then((activity: UnEnrollUserResponse) => {
      showInfoNotification({
        title: 'Inscrição cancelada com sucesso',
        message: activity?.title ?? '',
      })
    })
  }
  return (
    <>
      <div className="flex bg-[#ffffff] sm:bg-[color:var(--mantine-color-white)] flex-col sm:gap-4 sm:h-[26rem] sm:overflow-scroll sm:rounded-lg sm:p-2 sm:py-4">
        {!activities && (
          <>
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
        )}
        {activities instanceof Array && activities.map((activityData, index) => (
          <Activity
            key={`activity_${index}`}
            data={activityData}
            isMobile={isMobile}
            enrollCallback={enrollStudent}
            unEnrollCallback={unEnrollStudent}
          />
        ))}
        {activities && activities.length == 0 && (
          <ActivityCard title="SOON">
            As atividades deste ano ainda não foram publicadas. Podes voltar depois não te preocupes!
          </ActivityCard>
        )}
      </div>
      <CVDialog />
    </>
  )
}

export { UserActivities }
