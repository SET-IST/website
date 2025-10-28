import { ActivityData } from '@/lib/frontend/api/activities'
import { Avatar, Badge, Button, Text, Tooltip, rem } from '@mantine/core'
import { ActivityType, UserType } from '@prisma/client'
import { IconMapPin } from '@tabler/icons-react'
import { DateTime } from 'luxon'
import { useSession } from '@/lib/frontend/utils/auth-client'

interface ActivityComponentProps {
  data: ActivityData
  isMobile?: boolean
  enrollCallback: (activityId: string, activityType: ActivityType) => void
  unEnrollCallback: (activityId: string) => void
}

interface ActivityButtonProps {
  data: ActivityData
  isMobile?: boolean
  enrollCallback: (activityId: string, activityType: ActivityType) => void
  unEnrollCallback: (activityId: string) => void
}

const ActivityButton = ({
  data,
  isMobile,
  enrollCallback,
  unEnrollCallback,
}: ActivityButtonProps) => {
  if (data?.type && data?.type !== ActivityType.Lecture) {
    if (data.confirmed == undefined) {
      return (
        <Button
          onClick={() => enrollCallback(String(data.id), data.type)}
          fullWidth={!!isMobile}
          className="min-w-fit"
        >
          Inscrever-me
        </Button>
      )
    }
    if (data.confirmed) {
      return (
        <Button disabled className="min-w-fit" fullWidth={!!isMobile}>
          Inscrito
        </Button>
      )
    } else {
      return (
        <Button
          variant="default"
          fullWidth={!!isMobile}
          className="min-w-fit"
          onClick={() => unEnrollCallback(String(data.id))}
        >
          Cancelar inscrição
        </Button>
      )
    }
  } else {
    return <></>
  }
}

const Activity = ({
  data,
  isMobile,
  enrollCallback,
  unEnrollCallback,
}: ActivityComponentProps) => {
  const session = useSession()
  const user = session.data?.user

  const date = data?.date ? DateTime.fromISO(String(data.date)) : DateTime.now()
  return (
    <div className="w-full h-fit bg-[color:var(--mantine-color-white)] hover:bg-gray-50 p-4 flex flex-col gap-4 sm:flex-row sm:gap-0 items-center sm:rounded-md">
      <div className="w-full h-fit flex flex-col gap-2">
        {data?.companies && (
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing="sm">
              {data.companies.map((company, index) => (
                <Tooltip
                  key={`${data.id}_company_${index}`}
                  label={company.user.name}
                  withArrow
                >
                  <Avatar src={company.user.image} radius="xl" />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Tooltip.Group>
        )}
        <div>
          <Text c="#00415a" fw={600}>
            <span className="text-base">{data?.title}</span>
          </Text>

          <Text c="dimmed" lh={1} fw={500}>
            <span className="text-sm">{data?.description}</span>
          </Text>
        </div>
        <div className="flex flex-row flex-wrap gap-1">
          <Badge radius="sm" variant="dot">
            {date.setLocale('pt').toFormat("d 'de' LLLL 'às' HH:mm")}
          </Badge>
          <Badge
            radius="sm"
            variant="default"
            leftSection={
              <IconMapPin style={{ width: rem(12), height: rem(12) }} />
            }
          >
            {data?.location}
          </Badge>
        </div>
      </div>

      {(user && user.role !== UserType.Company) && (
        <ActivityButton
          data={data}
          isMobile={isMobile}
          enrollCallback={enrollCallback}
          unEnrollCallback={unEnrollCallback}
        />
      )}
    </div>
  )
}

export default Activity
