import { teams } from '@/data/team'
import cn from 'classnames'
import Header from './components/Header'
import Department from './components/Department'
import {
  Paper,
  SegmentedControl,
} from '@mantine/core'


const TeamPage = () => {
  const currentDate = '2024-02-26'
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-8 py-16 px-5 md:px-32 lg:px-32 bg-[color:var(--mantine-color-white)]'
      )}
    >
      <Header />
      <Paper className="h-fit w-screen px-0 sm:p-6 flex flex-col justify-stretch">
            <div className="sticky sm:relative top-15 z-10 sm:top-0 px-2 sm:px-0 py-3 bg-[color:var(--mantine-color-white)]">
              <SegmentedControl
                fullWidth
                defaultValue={currentDate}
                data={[
                  {
                    label: '2017',
                    value: '2017',
                  },
                  {
                    label: '2018',
                    value: '2018',
                  },
                  {
                    label: '2019',
                    value: '2019',
                  },
                  {
                    label: '2020',
                    value: '2020',
                  },
                  {
                    label: '2021',
                    value: '2021',
                  },
                  {
                    label: '2022',
                    value: '2022',
                  },
                  {
                    label: '2023',
                    value: '2023',
                  },
                  {
                    label: '2024',
                    value: '2024',
                  },
                  {
                    label: '2025',
                    value: '2025',
                    disabled: true,
                  },
                ]}
              />
            </div>
          </Paper>
      <div className="w-full flex flex-col gap-12">
        {teams[8].team.map((department, index) => (
          <Department key={index} {...department} imageFormat={teams[8].imageFormat} />
        ))}
      </div>
    </div>
  )
}

export default TeamPage
