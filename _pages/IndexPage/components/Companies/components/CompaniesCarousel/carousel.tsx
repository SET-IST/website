import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import classes from './carousel.module.css'
import { useRef } from 'react'
import { homeCompaniesSlider } from '@/data/companies'

interface CompaniesCarouselProps {
  isMobile: boolean
}

export function CompaniesCarousel({ isMobile }: CompaniesCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnLastSnap: false,
      stopOnMouseEnter: true,
    })
  )
  const logoSize = isMobile ? 160 : 140
  const slides = homeCompaniesSlider.map((img, index) => (
    <Carousel.Slide key={`company_${index}`}>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Image
          src={img.src}
          alt="Picture of the author"
          height={logoSize}
          width={logoSize}
        />
      </div>
    </Carousel.Slide>
  ))

  return (
    <div style={{ height: 100, width: '100%', display: 'flex' }}>
      <Carousel
        plugins={[autoplay.current]}
        slideSize={isMobile ? '100%' : '20%'}
        height="100%"
        style={{ flex: 1, width: '100%' }}
        classNames={classes}
        slideGap="md"
        emblaOptions={{loop: true}}
        withIndicators={!isMobile}
        withControls={isMobile}
      >
        {slides}
      </Carousel>
    </div>
  )
}
