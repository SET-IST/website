import {
  ActionIcon,
  Avatar,
  Badge,
  Text,
  Tooltip,
  em,
  rem,
} from '@mantine/core'
import { IconArrowLeft, IconArrowRight, IconMapPin } from '@tabler/icons-react'
import { DateTime } from 'luxon'
import { ActivityUser } from './ActivityUser'
import { Carousel, Embla } from '@mantine/carousel'
import { useCallback, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { CompanyActivity as CompanyActivityData } from '@/lib/frontend/api'

interface ActivityComponentProps {
  data: CompanyActivityData
}

const CompanyActivity = ({ data }: ActivityComponentProps) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const [embla, setEmbla] = useState<Embla | null>(null)

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev()
  }, [embla])

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext()
  }, [embla])

  const showControls = isMobile || data.enrollments.length > 3

  const date = data?.date ? DateTime.fromISO(String(data.date)) : DateTime.now()
  return (
    <div className="w-full h-fit bg-[color:var(--mantine-color-white)] p-4 flex flex-col gap-4 sm:flex-row sm:gap-0 items-center sm:rounded-md border-b border-gray-100">
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
            {date.setLocale('pt').toFormat("d 'de' LLLL de yyyy 'às' HH:mm")}
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
        {data.enrollments.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <Text c="dimmed" lh={1} fw={500}>
              <span className="text-sm">Estudantes confirmados:</span>
            </Text>
            <div className="flex w-full flex-row items-center justify-between sm:justify-start gap-2">
              {showControls && (
                <ActionIcon
                  onClick={scrollPrev}
                  variant="default"
                  radius="xl"
                  aria-label="Settings"
                >
                  <IconArrowLeft
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
              <Carousel
                className="w-2/3"
                slideSize={isMobile ? '100%' : '33.33%'}
                slidesToScroll={isMobile ? 1 : 3}
                slideGap={0}
                align={isMobile ? 'center' : 'start'}
                withControls={false}
                getEmblaApi={setEmbla}
              >
                {data.enrollments.map((enrollment, index) => (
                  <Carousel.Slide key={`${data.id}_enroll_${index}`}>
                    <ActivityUser data={enrollment} />
                  </Carousel.Slide>
                ))}
              </Carousel>
              {showControls && (
                <ActionIcon
                  onClick={scrollNext}
                  variant="default"
                  radius="xl"
                  aria-label="Settings"
                >
                  <IconArrowRight
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyActivity
