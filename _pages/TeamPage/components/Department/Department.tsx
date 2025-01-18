import { Title } from '@mantine/core'
import classes from './department.module.css'

import { IDepartment } from '@/data/team'
import TeamMember from '@/components/TeamMember'
import classNames from 'classnames'

export default function Department({
  name,
  slug,
  coordinators,
  members,
}: IDepartment) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Title
        py="sm"
        className={classNames(
          classes.title,
          'sticky sm:relative top-15 sm:top-0 bg-[color:var(--mantine-color-white)] z-10 border-b w-full'
        )}
      >
        {name}
      </Title>
      <div className="w-full flex flex-wrap justify-center gap-x-24 gap-y-4">
        {coordinators.map((member, index) => (
          <TeamMember key={`${slug}-coordinator-${index}`} data={member} />
        ))}
      </div>
      <div className="w-full flex flex-wrap justify-center gap-x-28 gap-y-4">
        {members.map((member, index) => (
          <TeamMember key={`${slug}-member-${index}`} data={member} />
        ))}
      </div>
    </div>
  )
}
