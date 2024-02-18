import {
  Avatar,
  Text,
  Button,
  Paper,
  Skeleton,
  em,
  ScrollArea,
  Overlay,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconQrcode } from '@tabler/icons-react'
import UserStats from './UserStats'
import { AnchorLink } from '@/components/AnchorLink'
import { UserType } from '@prisma/client'
import { useProfile } from '@/lib/frontend/hooks'
import { CompanyProfile, StudentProfile } from '@/lib/frontend/api'
import { useBoundStore } from '@/lib/frontend/store'
import { getCourse } from '@/lib/frontend/utils'

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
          <div className="relative h-fit pb-4 max-h-16 overflow-y-auto">
            <div className="fixed bottom-6 left-0 right-0 bg-[var(--mantine-color-white)] blur-sm h-5"></div>
            <Text
              className="sm:min-w-[18rem]"
              ta="center"
              c="dimmed"
              fw={500}
              fz="sm"
            >
              {user?.role === UserType.Company
                ? (user as CompanyProfile)?.companyDetails?.description ||
                  'Sem descrição da empresa'
                : getCourse(
                    (user as StudentProfile)?.studentDetails?.university,
                    (user as StudentProfile)?.studentDetails?.course
                  )?.name ?? ''}
            </Text>
          </div>

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
                      label: 'Bancas',
                      value: (user as StudentProfile)?.studentDetails?.scans,
                    },
                  ]
            }
          />
        </Skeleton>

        {user?.role !== UserType.Company && (
          <div className="flex flex-row gap-2 w-full min-w-fit">
            <Button fullWidth mt="lg" onClick={() => showRedeemModal(true)}>
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
