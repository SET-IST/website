/* Main Links, available to everyone */

import {
  IconCalendarStats,
  IconGift,
  IconList,
  IconSettings,
  IconSort09,
  IconUser,
  IconUserUp,
} from '@tabler/icons-react'
import { links as appLinks, links } from '@/data/links'
import { NavLinkExtendedProps, NavLinkVisibility } from './types'
import { rem } from '@mantine/core'
import { LogoutNavItem } from '@/components/Navbar/components'

export const MainNavLinks: NavLinkExtendedProps[] = [
  {
    visibility: NavLinkVisibility.MOBILE,
    label: 'Atividades',
    navId: 'activities',
    link: appLinks.activities,
    leftSection: (
      <IconList style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    ),
  },
  {
    visibility: NavLinkVisibility.MOBILE,
    label: 'Prémios',
    navId: 'prizes',
    link: appLinks.awards,
    leftSection: (
      <IconGift style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    ),
  },
  {
    visibility: NavLinkVisibility.MOBILE,
    label: 'Equipa',
    navId: 'team',
    link: appLinks.team,
    leftSection: (
      <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    ),
  },
]

export const SessionNavLinks: NavLinkExtendedProps[] = [
  {
    visibility: NavLinkVisibility.DESKTOP,
    label: 'Ver perfil',
    navId: 'profile',
    link: {
      Student: links.student.profile,
      Staff: links.student.profile,
      Company: links.company.profile,
    },
    leftSection: (
      <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    ),
  },
  {
    visibility: NavLinkVisibility.ALL,
    label: 'Definições',
    navId: 'settings',
    link: '',
    leftSection: (
      <IconSettings style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    ),
    nestedNav: [
      {
        visibility: NavLinkVisibility.ALL,
        navId: 'logout',
        link: '',
        component: <LogoutNavItem key={`nav_logout`} />,
      },
    ],
  },
]

export const StaffNavLinks: NavLinkExtendedProps[] = [
  {
    visibility: NavLinkVisibility.ALL,
    label: 'Staff',
    navId: 'staff',
    link: '',
    leftSection: (
      <IconUserUp style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    ),
    nestedNav: [
      {
        visibility: NavLinkVisibility.ALL,
        label: 'Inscrições',
        navId: 'enrollments',
        link: links.staff.manageEnrollments,
        leftSection: (
          <IconCalendarStats
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        ),
      },
      {
        visibility: NavLinkVisibility.ALL,
        label: 'Gerir pontos',
        navId: 'manage_points',
        link: links.staff.managePoints,
        leftSection: (
          <IconSort09
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        ),
      },
      {
        visibility: NavLinkVisibility.ALL,
        label: 'Validar brinde',
        navId: 'validate_prize',
        link: links.staff.validatePrize,
        leftSection: (
          <IconGift style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        ),
      },
    ],
  },
]
