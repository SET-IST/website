//  Layouts
import { StaffLayout } from '@/_pages/layouts'

//  Pages
import { EnrollmentsManagementForm } from '@/components/StaffForms'

//  Types
import type { ReactElement } from 'react'

const EnrollmentsManagement = () => {
  return <EnrollmentsManagementForm />
}

EnrollmentsManagement.getLayout = (page: ReactElement<any>) => {
  return <StaffLayout>{page}</StaffLayout>
}

export default EnrollmentsManagement
