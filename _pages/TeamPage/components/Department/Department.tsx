import { Title } from '@mantine/core'
import classes from './department.module.css'

import { IDepartment, ImageFormat } from '@/data/team'
import TeamMember from '@/components/TeamMember'
import classNames from 'classnames'

export default function Department({
  name,
  slug,
  coordinators,
  members,
  imageFormat,
}: IDepartment & { imageFormat: ImageFormat }) {
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
          <TeamMember key={`${slug}-coordinator-${index}`} data={member} imageFormat={imageFormat} />
        ))}
      </div>
      <div className="w-full flex flex-wrap justify-center gap-x-28 gap-y-4">
        {members.map((member, index) => (
          <TeamMember key={`${slug}-member-${index}`} data={member} imageFormat={imageFormat} />
        ))}
      </div>
    </div>
  )
}
