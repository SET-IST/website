import {
  Avatar,
  Text,
  Button,
  Paper,
  Skeleton,
  em,
  Tooltip,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconQrcode, IconQuestionMark } from '@tabler/icons-react'
import UserStats from './UserStats'
import { AnchorLink } from '@/components/AnchorLink'
import { UserType } from '@prisma/client'
import { useProfile } from '@/lib/frontend/hooks'
import { CompanyProfile, StudentProfile } from '@/lib/frontend/api'
import { useBoundStore } from '@/lib/frontend/store'
import { getCourse } from '@/lib/frontend/utils'
import { useRef } from 'react'
import { TruncatedText } from '@/components/TruncatedText'

const UserCard = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useProfile()

  // Setters
  const showSettings = useBoundStore((state) => state.showSettings)
  const showScanModal = useBoundStore((state) => state.showScanModal)
  const showRedeemModal = useBoundStore((state) => state.showRedeemModal)

  const spoilerControlRef = useRef<HTMLButtonElement>(null)

  return (
    <Paper
      className="h-fit min-w-min w-full sm:w-1/3 !rounded-none sm:!rounded-lg"
      withBorder
      p={isMobile ? 'xl' : 'lg'}
      bg="var(--mantine-color-body)"
    >
      <div className=" w-full flex flex-col justify-center items-center">
        {isUserLoading ? (
          <Skeleton circle height={120} />
        ) : (
          <Avatar src={user?.image} size={100} />
        )}

        <Skeleton visible={isUserLoading}>
          <Text c="#00415a" ta="center" fz="xl" fw={700} mt="md">
            {user?.name}
          </Text>
        </Skeleton>
        <Skeleton
          className="flex flex-col items-center gap-2"
          visible={isUserLoading}
        >
          <TruncatedText
            text={
              user?.role === UserType.Company
                ? (user as CompanyProfile)?.companyDetails?.description ||
                  'Sem descrição da empresa'
                : getCourse(
                    (user as StudentProfile)?.studentDetails?.university,
                    (user as StudentProfile)?.studentDetails?.course
                  )?.name ?? ''
            }
          />

          {user?.role === UserType.Company && (
            <AnchorLink
              preview={false}
              label={(user as CompanyProfile)?.companyDetails?.linkText}
              href={(user as CompanyProfile)?.companyDetails?.linkHref}
            />
          )}
        </Skeleton>

        <Skeleton className="mt-2" visible={isUserLoading}>
          <UserStats
            stats={
              user?.role === UserType.Company
                ? [
                    {
                      label: 'Scans',
                      value: (user as CompanyProfile)?.companyDetails?.scans,
                    },
                    {
                      label: 'Eventos',
                      value: (user as CompanyProfile)?.companyDetails
                        ?.activities.length,
                    },
                  ]
                : [
                    {
                      label: 'Pontos',
                      value: (user as StudentProfile)?.studentDetails?.points,
                    },
                    {
                      label: <span>Total</span>,
                      value: (
                        <Tooltip
                          w={240}
                          multiline
                          position="bottom"
                          label="O teu número total de pontos contando com os brindes que recebeste"
                          events={{
                            hover: true,
                            focus: false,
                            touch: true,
                          }}
                        >
                          <div className="relative h-fit">
                            <div className="top-[-0.1rem] start-6 absolute w-4 h-4 text-[color:#868e96] opacity-70">
                              <IconQuestionMark
                                style={{ width: '100%', height: '100%' }}
                                stroke={2.5}
                              />
                            </div>
                            <span>{(user as StudentProfile)?.totalPoints}</span>
                          </div>
                        </Tooltip>
                      ),
                    },
                    {
                      label: 'Bancas',
                      value: (user as StudentProfile)?.studentDetails?.scans,
                    },
                  ]
            }
          />
        </Skeleton>

        {user?.role !== UserType.Company && (
          <div className="flex flex-row gap-2 w-full min-w-fit">
            <Button
              className="!min-w-fit"
              fullWidth
              mt="lg"
              onClick={() => showRedeemModal(true)}
            >
              Receber brinde
            </Button>
            <Button
              onClick={() => showScanModal(true)}
              fullWidth
              mt="lg"
              leftSection={<IconQrcode size={24} />}
            >
              Scan
            </Button>
          </div>
        )}

        <Button
          onClick={() => showSettings(true)}
          variant="default"
          fullWidth
          mt="sm"
        >
          Editar perfil
        </Button>
      </div>
    </Paper>
  )
}

export { UserCard }
