import { Carousel } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import { Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core'
import classes from './DailyPrizes.module.css'
import { PrizeData, daily, prizes } from '@/data/prizes'
import classNames from 'classnames'

function PrizeCard({ image, title, description }: PrizeData) {
  return (
    <Paper
      p="xl"
      radius={0}
      style={{ backgroundImage: `url(${image.src})` }}
      className={classNames(classes.card, 'bg-[size:80%] sm:bg-[size:40%]')}
    >
      <div>
        <Text className={classNames(classes.category, '!text-lg md:!text-xl')}>
          {title}
        </Text>
        <Title className={classNames(classes.title, '!text-2xl md:!text-3xl')}>
          {description}
        </Title>
      </div>
    </Paper>
  )
}

export function PrizesCarousel() {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const slides = daily.map((prize, key) => (
    <Carousel.Slide key={`prize_${key}`}>
      <PrizeCard {...prize} />
    </Carousel.Slide>
  ))

  return (
    <div className="flex flex-col items-center justify-center">
      <Paper radius="md" className="overflow-hidden w-full sm:w-fit">
        <Carousel h={500} slideSize="100%" emblaOptions={{align: 'start', slidesToScroll: 1}}>
          {slides}
        </Carousel>
      </Paper>
    </div>
  )
}
