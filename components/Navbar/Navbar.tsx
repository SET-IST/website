import { useDisclosure, useViewportSize, useWindowScroll } from '@mantine/hooks'
import {
  AppShell,
  Burger,
  Divider,
  Group,
  NavLink,
  Stack,
  rem,
} from '@mantine/core'

import SetLogoInverted from '@/assets/logos/logo_set_inverted.svg'
import SetLogo from '@/assets/logos/logo_set.svg'
import { PropsWithChildren, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { DesktopNavItem } from './components/DesktopNavItem'
import { useSession } from '@/lib/frontend/utils/auth-client'
import { MainNavLinks } from '@/data/nav'
import { useRouter } from 'next/router'
import { links } from '@/data/links'
import { LoginDialog } from '../LoginDialog'
import { NavProfileMenu } from './components/menu'
import { AccountMenu } from './components/Account'

type NavbarProps = PropsWithChildren & {
  startTransparent?: boolean
}

export default function Navbar({ children, startTransparent }: NavbarProps) {
  const [opened, { toggle, close }] = useDisclosure()
  const { height } = useViewportSize()
  const [scroll, scrollTo] = useWindowScroll()
  const router = useRouter()

  const isInverted = (): boolean => {
    return !!startTransparent ? scroll.y > height / 4 : true
  }

  return (
    <AppShell
      header={{ height: 70, offset: false }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      withBorder={false}
    >
      <AppShell.Header
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <Group
          h="100%"
          px="md"
          className={classNames(
            'transition-all duration-150',
            isInverted()
              ? 'bg-[color:var(--mantine-color-body)] border-b border-[color:var(--mantine-color-gray-3)]'
              : 'bg-transparent'
          )}
        >
          {/* Desktop menu */}

          <Group justify="space-between" style={{ flex: 1 }}>
            {/* Logo */}

            <Link
              href="#"
              onClick={(event) => {
                event.preventDefault()
                router.push(links.home)
              }}
              className="w-28 h-auto"
            >
              {isInverted() ? (
                <SetLogo aria-hidden />
              ) : (
                <SetLogoInverted aria-hidden />
              )}
            </Link>

            {/* Desktop navbar */}

            <Group ml="xl" gap={8} visibleFrom="sm">
              {MainNavLinks.filter(() => process.env.NEXT_PUBLIC_PREPARE_NEXT_EDITION != "true").map((link, index) => (
                <DesktopNavItem
                  key={`desktop_nav_${index}`}
                  link={link}
                  inverted={isInverted()}
                />
              ))}
            </Group>

            <Group ml="xl" gap={0} visibleFrom="sm">
              <AccountMenu
                closeCallback={close}
                renderForMobile={false}
                inverted={isInverted()}
              />
            </Group>
          </Group>

          {/* Mobile menu burger */}
          <Burger
            color={isInverted() ? 'gray.7' : 'white'}
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>

      {/* Mobile menu */}

      <AppShell.Navbar py="md" px="md">
        <Stack gap="xl">
          {/* Top section */}

          <Group justify="space-between">
            <Link
              href="#"
              onClick={(event) => {
                event.preventDefault()
                router.push(links.home)
                close()
              }}
              className="w-28 h-auto"
            >
              <SetLogo aria-hidden />
            </Link>

            <Burger opened={opened} onClick={close} hiddenFrom="sm" size="sm" />
          </Group>

          {/* Navigation */}

          <Stack gap={8} className="border-none">
            <AccountMenu
              closeCallback={close}
              renderForMobile={true}
              inverted={isInverted()}
            />
            <Divider />
            <NavProfileMenu closeCallback={close} />
          </Stack>
        </Stack>
      </AppShell.Navbar>

      {/* End Mobile menu */}

      <AppShell.Main>
        <LoginDialog />
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
