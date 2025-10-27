import { useEffect, useState } from 'react'
import { Box, NavLink, NavLinkProps, em } from '@mantine/core'
import {
  MainNavLinks,
  NavLinkExtendedProps,
  NavLinkVisibility,
  SessionNavLinks,
  StaffNavLinks,
} from '@/data/nav'
import { useMediaQuery } from '@mantine/hooks'
import { User, useSession } from '@/lib/frontend/utils/auth-client'
import { UserType } from '@prisma/client'
import { NextRouter, useRouter } from 'next/router'

function isActive(
  link: NavLinkExtendedProps,
  router: NextRouter,
  level: number
) {
  if (link.nestedNav) {
    const subPath = router.pathname.split('/')[level + 1]
    return subPath !== '' && subPath === (link.link as string)
  } else {
    if (typeof link.link == 'object') {
      const links = link.link as Record<UserType, string>
      return Object.values(links).includes(router.pathname)
    } else {
      return link.link === router.pathname
    }
  }
}

function select(link: NavLinkExtendedProps, router: NextRouter, user?: User) {
  if (user && user.role && typeof link.link === 'object') {
    const links = link.link as Record<UserType, string>
    return router.push(links[user.role as UserType])
  } else {
    return router.push(link.link as string)
  }
}

function NavComposite(
  data: NavLinkExtendedProps[] = [],
  level: number,
  isMobile: boolean,
  router: NextRouter,
  closeCallback: () => void,
  user?: User,
) {
  const items = data.map((item: NavLinkExtendedProps, index) => {
    // Should it be visible?
    let visible = false
    switch (item.visibility) {
      case NavLinkVisibility.MOBILE:
        visible = isMobile
        break
      case NavLinkVisibility.DESKTOP:
        visible = !isMobile
        break
      case NavLinkVisibility.ALL:
        visible = true
        break
      case NavLinkVisibility.NONE:
        visible = false
        break
    }

    if (!visible) return null

    if (item.component) return item.component

    // Remove extended nav link props
    const navLinkDefault = {
      ...item,
      visibility: undefined,
      navType: undefined,
      link: undefined,
      linkFn: undefined,
      navId: undefined,
      nestedNav: undefined,
    } as NavLinkProps

    if (item.nestedNav) {
      return (
        <NavLink
          key={`nav_${level}_${index}`}
          {...navLinkDefault}
          active={isActive(item, router, level)}
          variant="subtle"
        >
          {NavComposite(
            item.nestedNav,
            level + 1,
            isMobile,
            router,
            closeCallback,
            user
          )}
        </NavLink>
      )
    } else {
      return (
        <NavLink
          key={`nav_${level}_${index}`}
          {...navLinkDefault}
          active={isActive(item, router, level)}
          onClick={() => {
            select(item, router, user).then(() => closeCallback())
          }}
          variant="subtle"
        />
      )
    }
  })

  return items
}

interface NavProfileMenuProps {
  closeCallback: () => void
}

export function NavProfileMenu({ closeCallback }: NavProfileMenuProps) {
  const session = useSession()
  const router = useRouter()
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`) ?? false
  const [profileNavlinks, setProfileNavLinks] = useState(MainNavLinks)
  const user = session.data?.user

  useEffect(() => {
    if (user) {
      setProfileNavLinks([
        ...SessionNavLinks,
        ...(user.role === UserType.Staff ? StaffNavLinks : []),
        ...MainNavLinks,
      ])
    }
  }, [user])

  return (
    <Box>
      {NavComposite(profileNavlinks, 0, isMobile, router, closeCallback, user)}
    </Box>
  )
}
