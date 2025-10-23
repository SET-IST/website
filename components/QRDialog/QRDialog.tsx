import { useBoundStore } from '@/lib/frontend/store'
import {
  Text,
  Modal,
  SegmentedControl,
  Transition,
  Code,
  Badge,
  Button,
} from '@mantine/core'
import classes from './QRDialog.module.css'
import { QrReader } from 'react-qr-reader'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { QRCode } from 'react-qrcode-logo'
import { useScan } from '@/lib/frontend/hooks/student'
import { AxiosError } from 'axios'
import { showErrorNotification } from '../Notifications'
import { PreviewCard } from '@/_pages/ProfilePage/components/UserCard/PreviewCard'
import { IconQrcode } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'

enum QRDialogTabs {
  Scan = 'scan',
  UserCode = 'user_code',
}

export function QRDialog() {
  const session = useSession()
  const user: User = session.data?.user

  const [currentTab, setCurrentTab] = useState<QRDialogTabs>(QRDialogTabs.Scan)
  const [companyCode, setCompanyCode] = useState<string | undefined>(undefined)

  const {
    mutateAsync: scan,
    data: scanResponse,
    isError,
    error,
    reset,
  } = useScan(useQueryClient())

  useEffect(() => {
    if (companyCode) {
      scan(companyCode).catch((error: AxiosError) => {
        if (![409, 404].includes(error.response?.status ?? 500)) {
          showErrorNotification({
            title: 'Ocorreu um erro, por favor tenta outra vez',
            message: error.message,
          })
        }
        setTimeout(() => {
          setCompanyCode(undefined)
          reset()
        }, 2000)
      })
    }
  }, [companyCode, scan, reset])

  // Getters
  const isVisible = useBoundStore((state) => state.scanModalVisible)

  // Setters
  const showScanModal = useBoundStore((state) => state.showScanModal)

  return (
    <Modal
      opened={isVisible}
      onClose={() => showScanModal(false)}
      styles={{
        content: {
          backgroundColor: 'rgb(28, 126, 214)',
        },
        body: {
          padding: '0px',
        },
        header: {
          backgroundColor: 'transparent',
        },
      }}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'scale-y', duration: 200 }}
      withCloseButton={false}
    >
      <div className="h-screen p-4 flex flex-col">
        <div className="w-full flex justify-end">
          <Modal.CloseButton
            iconSize={25}
            className="!text-white hover:!text-[#1C7ED6] hover:bg-white"
          />
        </div>
        <div className="grow flex flex-col items-center justify-start mt-10">
          <div className="flex flex-col gap-5">
            <SegmentedControl
              styles={{
                root: {
                  backgroundColor: 'color(srgb 0.2012 0.5543 0.875)',
                },
              }}
              classNames={{
                label: classes.SegmentedControlText,
              }}
              fullWidth
              defaultValue={currentTab}
              onChange={(value) => setCurrentTab(value as QRDialogTabs)}
              data={[
                {
                  label: 'Fazer scan de empresa',
                  value: QRDialogTabs.Scan,
                },
                {
                  label: 'O meu código',
                  value: QRDialogTabs.UserCode,
                },
              ]}
            />

            {currentTab === QRDialogTabs.Scan && (
              <div className="flex flex-col items-center gap-4">
                {!scanResponse && (
                  <>
                    <Text c="white" ta="center" fz={25} fw={700} mt="md">
                      Scan
                    </Text>
                    <div className="w-44 h-44 border-2 rounded-xl">
                      <QrReader
                        constraints={{
                          facingMode: 'environment',
                          aspectRatio: { ideal: 1 },
                        }}
                        videoStyle={{
                          borderRadius: '0.75rem',
                        }}
                        onResult={(result, error) => {
                          if (result) {
                            setCompanyCode(result.getText())
                          }
                        }}
                      />
                    </div>
                  </>
                )}
                <Transition
                  mounted={!!scanResponse}
                  transition="slide-up"
                  duration={200}
                  timingFunction="ease"
                  keepMounted
                >
                  {(styles) => (
                    <div
                      className="w-full flex flex-col gap-4 items-center"
                      style={styles}
                    >
                      <Text c="white" ta="center" fz={25} fw={700} mt="md">
                        +{scanResponse?.points} pontos
                      </Text>
                      <PreviewCard data={scanResponse} />
                      <Button
                        fullWidth
                        variant="filled"
                        leftSection={<IconQrcode />}
                        onClick={() => {
                          setCompanyCode(undefined)
                          reset()
                        }}
                      >
                        Fazer scan a outra empresa
                      </Button>
                    </div>
                  )}
                </Transition>
                <Transition
                  mounted={
                    isError &&
                    [404, 409, 403].includes(error.response?.status ?? 500)
                  }
                  transition="fade"
                  duration={200}
                  timingFunction="ease"
                  keepMounted
                >
                  {(styles) => (
                    <Badge style={styles} color="blue" size="lg" radius="md">
                      {error?.response?.status === 403 &&
                        'Este empresa não está presente na JET'}
                      {error?.response?.status === 409 &&
                        'Já fizeste scan desta empresa'}
                      {error?.response?.status === 404 &&
                        'Este código é inválido'}
                    </Badge>
                  )}
                </Transition>
              </div>
            )}
            {currentTab === QRDialogTabs.UserCode && (
              <div className="flex flex-col items-center gap-4">
                <Text c="white" ta="center" fz={25} fw={700} mt="md">
                  Código pessoal
                </Text>
                <div className="rounded-xl overflow-hidden">
                  <QRCode
                    fgColor="#1C7ED6"
                    eyeRadius={5}
                    qrStyle="dots"
                    value={user.id}
                  />
                </div>
                <Code className="text-lg" c="white" bg="transparent">
                  {user.id}
                </Code>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
