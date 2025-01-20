import { teams } from '@/data/team'
import cn from 'classnames'
import Header from './components/Header'
import Department from './components/Department'
import {
  Paper,
  SegmentedControl,
} from '@mantine/core'
import React, { useEffect, useRef } from 'react';
import { useBoundStore } from '@/lib/frontend/store'

const TeamPage = () => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the scrollable container

  useEffect(() => {
    // Scroll to the right on mount
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollLeft = scrollableContainerRef.current.scrollWidth;
    }
  }, []); // Run only once when the component mounts


  let yearData = teams.map((team) => ({value: String(team.year), label: String(team.year), disabled: false}));
  if (process.env.NEXT_PUBLIC_PREPARE_NEXT_EDITION == "true") {
    yearData.push({value: String(teams[teams.length-1].year +1), label: String(teams[teams.length-1].year +1), disabled: true});
  }

  // const currentYear = useBoundStore((state) => state.year)
  const teamIndex = useBoundStore((state) => state.teamIndex)
  const setCurrentYear = useBoundStore((state) => state.setSelectedYear)

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
              paddingLeft: "1rem",
              paddingRight: "1rem",
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
                  radius={'xl'}
                  color={'var(--mantine-color-blue-5)'}
                  transitionDuration={500}
                  style={{
                    flexShrink: 0, // Prevents shrinking of the SegmentedControl (necessary for scrolling)
                  }}
                  defaultValue={String(teams[teams.length-1].year)} // most recent with people photos
                  data = {yearData}
                  onChange={setCurrentYear}
                />
              </div>
            </div>
          </Paper>
      <div className="w-full flex flex-col gap-12">
        {teams[teamIndex].team.map((department, index) => (
          <Department key={index} {...department} imageFormat={teams[teamIndex].imageFormat} />
        ))}
      </div>
    </div>
  )
}

export default TeamPage
