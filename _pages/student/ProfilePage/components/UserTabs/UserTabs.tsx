import { Paper, Tabs, em, rem } from '@mantine/core'
import { ReactNode, useEffect, useState } from 'react'
import { useMediaQuery, useViewportSize, useWindowScroll } from '@mantine/hooks'
import { UserActivities, VisitedStands } from '.'
import classNames from 'classnames'

interface Tab {
  title: string
  ref: string
  component?: ReactNode
}

const tabs: Tab[] = [
  { title: 'Bancas visitadas', ref: 'visited', component: <VisitedStands /> },
  { title: 'Inscrições', ref: 'activities', component: <UserActivities /> },
]

const UserTabs = () => {
  const iconStyle = { width: rem(12), height: rem(12) }
  const [activeTab, setActiveTab] = useState<string | null>('visited')
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const [scroll, scrollTo] = useWindowScroll()

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
          className="w-full !bg-[color:var(--mantine-color-white)] rounded-md"
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
            className="sm:max-h-[calc(100%-2.6rem)] sm:overflow-y-scroll"
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
