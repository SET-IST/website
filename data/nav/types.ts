import { NavLinkProps } from '@mantine/core'
import { UserType } from '@prisma/client'

export enum NavLinkVisibility {
  MOBILE,
  DESKTOP,
  ALL,
}

export type NavLinkExtendedProps = NavLinkProps & {
  nestedNav?: NavLinkExtendedProps[]
  visibility?: NavLinkVisibility
  navId: string
  link: string | Record<UserType, string>
  component?: JSX.Element
}
