import { useSession } from '@/lib/frontend/utils/auth-client'
import { useRouter } from 'next/router'
//  Components
import Loader from '../Loader'
//  Services
import { links } from '@/data/links'
//  Types
import type { UserType } from '@prisma/client'
import type { PropsWithChildren } from 'react'

type AuthGuardProps = PropsWithChildren & {
  roles: UserType[]
}

const AuthGuard = ({ children, roles }: AuthGuardProps) => {
  const { isPending, data } = useSession()
  const router = useRouter()

  if (isPending) return <Loader />

  if (
    !data ||
    (data && !roles.includes(data?.user?.role as UserType))
  ) {
    router.push(links.home)
    return <Loader />
  }

  // Display changelog to everyone that haven't saw it
  if (!data?.user.readChangelog && router.pathname !== links.changelog) {
    router.push(links.changelog)
    return <Loader />
  }

  return <>{children}</>
}

export default AuthGuard
export type { AuthGuardProps }
