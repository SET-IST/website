import { NavLinkProps } from '@mantine/core'
import { UserType } from '@prisma/client'

import type { JSX } from "react";

export enum NavLinkVisibility {
  MOBILE,
  DESKTOP,
  ALL,
  NONE,
}

export type NavLinkExtendedProps = NavLinkProps & {
  nestedNav?: NavLinkExtendedProps[]
  visibility?: NavLinkVisibility
  navId: string
  link: string | Record<UserType, string>
  component?: JSX.Element
}
