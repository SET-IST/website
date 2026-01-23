// Layout
import { StaffLayout } from '@/_pages/layouts'

// Components
import { EventLogTable } from '@/components/StaffForms/EventLogTable'

// Types
import type { ReactElement } from 'react'

const EventLogPage = () => {
  return <EventLogTable />
}

EventLogPage.getLayout = (page: ReactElement) => {
  return <StaffLayout>{page}</StaffLayout>
}

export default EventLogPage
