import { useEdgeStore } from '@/lib/frontend/edgestore'
import { NavLink, rem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from '@/lib/frontend/utils/auth-client'

export function LogoutNavItem() {
  const { reset } = useEdgeStore()

  return (
    <NavLink
      leftSection={
        <IconLogout style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      label="Terminar sessão"
      onClick={async () => {
        await signOut()
        reset()
      }}
      variant="subtle"
    />
  )
}
