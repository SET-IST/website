//  Components
import { prizes } from '@/data/prizes'
import { PrizesCarousel } from './components/DailyPrizes/DailyPrizes'
import Prize from './components/Prize'
import TipsSection from './components/Tips'

const PrizesPage = () => {
  return (
    <div className="flex flex-col items-center pt-15 bg-white">
      <div className="w-full flex flex-col sm:gap-6 bg-[color:var(--mantine-color-white)]">
        <PrizesCarousel />
        {/*
        <div className="flex flex-col justify-stretch sm:flex-row">
          {prizes.map((item, key) => (
            <Prize key={`prize_${key}`} {...item} />
          ))}
        </div>
        */}
      </div>
      <TipsSection />
    </div>
  )
}

export default PrizesPage
