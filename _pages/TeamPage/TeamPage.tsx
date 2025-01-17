import { teams } from '@/data/team'
import cn from 'classnames'
import Header from './components/Header'
import Department from './components/Department'
import {
  Paper,
  SegmentedControl,
} from '@mantine/core'
import React, { useEffect, useRef } from 'react';


const TeamPage = () => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the scrollable container

  useEffect(() => {
    // Scroll to the right on mount
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollLeft = scrollableContainerRef.current.scrollWidth;
    }
  }, []); // Run only once when the component mounts


  return (
    <div
      className={cn(
        'flex flex-col items-center gap-8 py-16 px-5 md:px-32 lg:px-32 bg-[color:var(--mantine-color-white)]'
      )}
    >
      <Header />
      <Paper className="h-fit w-screen px-0 sm:p-6 flex flex-col justify-stretch">
          <div
            className="sticky sm:relative top-15 z-10 sm:top-0 px-2 sm:px-0 py-3 bg-[color:var(--mantine-color-white)]"
            ref={scrollableContainerRef}
            style={{
              overflowX: "auto",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              className="justify-evenly" // Use Tailwind utility to center evenly
              style={{
                display: "flex",
                width: "100%",
              }}
            >
                <SegmentedControl
                  fullWidth={false}
                  size={'md'}
                  defaultValue={'2024'} // most recent with people
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
                  style={{
                    flexShrink: 0, // Prevents shrinking of the SegmentedControl (necessary for scrolling)
                  }}
                />
              </div>
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
