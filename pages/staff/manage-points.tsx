//  Layouts
import { StaffLayout } from '@/_pages/layouts'

//  Pages
import { PointsManagementForm } from '@/components/StaffForms'

//  Types
import type { ReactElement } from 'react'

const PointsManagement = () => {
  return <PointsManagementForm />
}

PointsManagement.getLayout = (page: ReactElement<any>) => {
  return <StaffLayout>{page}</StaffLayout>
}

export default PointsManagement
