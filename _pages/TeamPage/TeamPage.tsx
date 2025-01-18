import { teams } from '@/data/team'
import cn from 'classnames'
import Header from './components/Header'
import Department from './components/Department'

const TeamPage = () => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-8 py-16 px-5 md:px-32 lg:px-32 bg-[color:var(--mantine-color-white)]'
      )}
    >
      <Header />
      <div className="w-full flex flex-col gap-12">
        {teams[8].team.map((department, index) => (
          <Department key={index} {...department} imageFormat={teams[8].imageFormat} />
        ))}
      </div>
    </div>
  )
}

export default TeamPage
