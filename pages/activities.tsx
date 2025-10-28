//  Pages
import ActivitiesPage from '@/_pages/ActivitiesPage'
//  Layouts
import { NavbarLayout } from '@/_pages/layouts'
//  Types
import type { ReactElement } from 'react'

const Activities = () => {
  return <ActivitiesPage />
}

Activities.getLayout = (page: ReactElement<any>) => {
  return <NavbarLayout>{page}</NavbarLayout>
}

export default Activities
