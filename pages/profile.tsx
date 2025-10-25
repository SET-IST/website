//  Layouts
import { UserLayout } from '@/_pages/layouts'
//  Pages
import ProfilePage from '@/_pages/ProfilePage'
//  Types
import type { ReactElement } from 'react'

const UserProfile = () => {
  return <ProfilePage />
}

UserProfile.getLayout = (page: ReactElement<any>) => {
  return <UserLayout>{page}</UserLayout>
}

export default UserProfile
