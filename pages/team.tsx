//  Layouts
import { FooterLayout, NavbarLayout } from '@/_pages/layouts'
//  Pages
import EquipaPage from '../_pages/TeamPage'
//  Types
import type { ReactElement } from 'react'

const Team = () => {
  return <EquipaPage />
}

Team.getLayout = (page: ReactElement) => {
  return (
    <NavbarLayout>
      <FooterLayout>{page}</FooterLayout>
    </NavbarLayout>
  )
}

export default Team
