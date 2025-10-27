import { Paper, Tabs, em, rem } from '@mantine/core'
import { ReactNode, useState } from 'react'
import { useMediaQuery, useWindowScroll } from '@mantine/hooks'
import { VisitedStands } from './VisitedStands'
import { UserActivities } from './UserActivities'
import { UserType } from '@prisma/client'
import { StudentDatatable } from './StudentDatatable'
import { CompanyActivities } from './CompanyActivities'
import { useSession } from '@/lib/frontend/utils/auth-client'

interface Tab {
  title: string
  ref: string
  component?: ReactNode
}

const UserTabs = () => {
  const session = useSession()
  const user = session.data?.user
  const isCompany = user?.role === UserType.Company

  const [activeTab, setActiveTab] = useState<string | null>(
    isCompany ? 'scans' : 'visited'
  )
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const tabs: Tab[] = isCompany
    ? [
        {
          title: 'Estudantes',
          ref: 'scans',
          component: <StudentDatatable />,
        },
        {
          title: 'Eventos',
          ref: 'activities',
          component: <CompanyActivities />,
        },
      ]
    : [
        {
          title: 'Bancas visitadas',
          ref: 'visited',
          component: <VisitedStands />,
        },
        {
          title: 'Inscrições',
          ref: 'activities',
          component: <UserActivities />,
        },
      ]

  return (
    <Paper
      className="w-full h-fit sm:h-full !rounded-none sm:!rounded-lg"
      radius="md"
      withBorder={!isMobile}
      pt={2}
      bg="var(--mantine-color-body)"
    >
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="default"
        defaultValue="gallery"
        color="blue.6"
        className="h-full"
      >
        <Tabs.List
          className="!sticky top-15 z-20 sm:relative sm:top-0 w-full !bg-[color:var(--mantine-color-white)] rounded-md"
          grow={isMobile}
        >
          {tabs.map((tab, index) => (
            <Tabs.Tab
              className="!text-[color:var(--mantine-color-gray-6)] font-semibold data-[active]:!text-[#00415a] !text-sm"
              key={`tab_${index}`}
              value={tab.ref}
            >
              {tab.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab, index) => (
          <Tabs.Panel
            className=" h-full sm:max-h-[calc(100%-2.6rem)] sm:overflow-y-scroll"
            key={`panel_${index}`}
            value={tab.ref}
          >
            {tab.component}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Paper>
  )
}

export { UserTabs }
