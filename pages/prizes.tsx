//  Layouts
import { FooterLayout, NavbarLayout } from '@/_pages/layouts'

//  Pages
import PrizesPage from '@/_pages/PrizesPage'

//  Types
import type { ReactElement } from 'react'

const Prizes = () => {
  return <PrizesPage />
}

Prizes.getLayout = (page: ReactElement<any>) => {
  return (
    <NavbarLayout>
      <FooterLayout>{page}</FooterLayout>
    </NavbarLayout>
  )
}

export default Prizes
