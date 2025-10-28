//  Layouts
import { StaffLayout } from '@/_pages/layouts'

//  Pages
import { PrizeValidationForm } from '@/components/StaffForms'

//  Types
import type { ReactElement } from 'react'

const PrizeValidation = () => {
  return <PrizeValidationForm />
}

PrizeValidation.getLayout = (page: ReactElement<any>) => {
  return <StaffLayout>{page}</StaffLayout>
}

export default PrizeValidation
