import { Text, Modal, Transition, Badge } from '@mantine/core'
import { useEffect, useState } from 'react'
import { showErrorNotification } from '@/components/Notifications'
import { AxiosError } from 'axios'
import { Scanner } from '@yudiel/react-qr-scanner'

export interface ScannerProps {
  label: string
  visible: boolean
  fetchMethod: (uuid: string) => Promise<any>
  callback: (data: any) => void
  onClose: () => void
}

export function Reader({
  label,
  visible,
  fetchMethod,
  callback,
  onClose,
}: ScannerProps) {
  const [code, setCode] = useState<any | undefined>(undefined)
  const [error, setError] = useState<AxiosError | undefined>(undefined)

  useEffect(() => {
    if (error) {
      if (error.response?.status !== 404) {
        showErrorNotification({
          title: `Ocorreu um erro, por favor tenta outra vez`,
          message: error.message,
        })
      }
      setTimeout(() => {
        setError(undefined)
        setCode(undefined)
      }, 2000)
    }
  }, [error])

  useEffect(() => {
    if (code) {
      fetchMethod(code)
        .then((data) => {
          callback(data)
          onClose()
        })
        .catch(setError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return (
    <div className="flex flex-col items-center gap-4">
      <Text c="white" ta="center" fz={25} fw={700} mt="md">
        {label}
      </Text>
      <div className="w-44 h-44 border-2 rounded-xl">
        <Scanner
          constraints={{
            //facingMode: 'environment',
            aspectRatio: { ideal: 1 },
          }}
          /*videoStyle={{
            borderRadius: '0.75rem',
          }}*/
          onScan={(result) => result && setCode(result[0].rawValue) }
        />
      </div>

      <Transition
        mounted={!!error && error.response?.status === 404}
        transition="fade"
        duration={200}
        timingFunction="ease"
        keepMounted
      >
        {(styles) => (
          <Badge style={styles} color="blue" size="lg" radius="md">
            {error?.response?.status === 404 && 'Este código é inválido'}
          </Badge>
        )}
      </Transition>
    </div>
  )
}
