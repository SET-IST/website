import { useBoundStore } from '@/lib/frontend/store'
import { UnstyledButton, Text, Button, em } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSession } from '@/lib/frontend/utils/auth-client'
import { useRouter } from 'next/router'

interface TipProps {
  title: string
  description: string
  action?: {
    title: string
    url: string
    requiresLogin: boolean
  }
}

export default function Tip({ title, description, action }: TipProps) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const session = useSession()
  const router = useRouter()
  const showLogin = useBoundStore((state) => state.showLoginDialog)

  return (
    <div className="flex flex-col gap-4 items-start sm:border-l-2 sm:p-4 border-[var(--mantine-color-blue-6)] sm:hover:bg-[#003448] transition-all h-fit">
      <div>
        <Text
          className="!text-xl sm:!text-2xl !text-white"
          fw={600}
          mb={7}
          lh={1}
        >
          {title}
        </Text>
        <Text className="!text-[#7fa0ac]" fz={isMobile ? undefined : 'lg'}>
          {description}
        </Text>
      </div>
      {action && (
        <Button
          onClick={() => {
            if (action.requiresLogin && session.status !== 'authenticated') {
              showLogin(true)
              return
            }

            router.push(action.url)
          }}
          fullWidth={isMobile}
        >
          {action.title}
        </Button>
      )}
    </div>
  )
}
