import {
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  rem,
  Text,
  Stack,
  Button,
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import classes from './Navbar.module.css'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { links } from '@/data/links'
import { UserType } from '@prisma/client'
import { useBoundStore } from '@/lib/frontend/store'
import { NavProfileMenu } from './menu'
import { useProfile } from '@/lib/frontend/hooks'

interface AccountMenuProps {
  inverted: boolean
  renderForMobile: boolean
  closeCallback: () => void
}

export function AccountMenu({
  inverted,
  renderForMobile,
  closeCallback,
}: AccountMenuProps) {
  const router = useRouter()
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const showLoginDialog = useBoundStore((state) => state.showLoginDialog)

  const session = useSession()

  const {
    data: user,
  } = useProfile()

  return renderForMobile ? (
    <Stack gap={8}>
      {session.status === 'authenticated' ? (
        <UnstyledButton
          onClick={() => {
            router
              .push(
                user?.role === UserType.Company
                  ? links.company.profile
                  : links.student.profile
              )
              .then(() => closeCallback())
          }}
        >
          <Group
            gap={12}
            p="sm"
            className="rounded-lg hover:bg-gray-50 hover:bg-opacity-80"
          >
            <Avatar src={user?.image} alt={user?.name} radius="xl" size={50} />
            <Stack gap={2}>
              <Text
                ff="Greycliff CF, var(--mantine-font-family)"
                fw={600}
                size="md"
                lh={1}
                mr={3}
              >
                {user?.name}
              </Text>
              <span className=" font-medium text-[color:var(--mantine-color-dimmed)] text-[length:var(--mantine-font-size-sm)]">
                Ver perfil
              </span>
            </Stack>
          </Group>
        </UnstyledButton>
      ) : (
        <Button onClick={() => showLoginDialog(true)} variant="outline">
          Iniciar sessão
        </Button>
      )}
    </Stack>
  ) : (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        {session.status === 'authenticated' ? (
          <UnstyledButton
            className={classNames(
              classes.user,
              inverted && classes.inverted,
              classes.userActive && userMenuOpened,
              inverted
                ? 'hover:border-b-[color:var(--mantine-color-blue-6)]'
                : 'hover:bg-gray-200 hover:bg-opacity-10'
            )}
          >
            <Group gap={12}>
              <Avatar
                src={user?.image}
                alt={user?.name}
                radius="xl"
                size={35}
              />
              <Group gap={7}>
                <Text fw={600} size="sm" lh={1} mr={3}>
                  {user?.name}
                </Text>
                <IconChevronDown
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </Group>
            </Group>
          </UnstyledButton>
        ) : (
          <UnstyledButton
            onClick={() => showLoginDialog(true)}
            className={classNames(
              classes.user,
              inverted && classes.inverted,
              classes.userActive && userMenuOpened,
              inverted
                ? 'hover:border-b-[color:var(--mantine-color-blue-6)]'
                : 'hover:bg-gray-200 hover:bg-opacity-10'
            )}
          >
            <Group gap={12}>
              <Text fw={600} size="sm" lh={1} mr={3}>
                Iniciar sessão
              </Text>
            </Group>
          </UnstyledButton>
        )}
      </Menu.Target>
      {session.status === 'authenticated' && (
        <Menu.Dropdown py={0} px={0}>
          <NavProfileMenu closeCallback={closeCallback} />
        </Menu.Dropdown>
      )}
    </Menu>
  )
}
