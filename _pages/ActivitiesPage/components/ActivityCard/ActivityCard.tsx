import {
  Title,
  Text,
  Image as MantineImage,
  em,
  Container,
} from '@mantine/core'
import classes from './card.module.css'
import { useMediaQuery } from '@mantine/hooks'
import { PropsWithChildren, ReactNode } from 'react'
import { StaticImageData } from 'next/image'
import classNames from 'classnames'

interface ActivityCardProps {
  title: string
  image?: StaticImageData
}

const ActivityCard = ({
  title,
  children,
  image,
}: PropsWithChildren<ActivityCardProps>) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch">
      <div
        className={classNames(
          'grow flex flex-col justify-center items-start gap-4 p-4 sm:p-8 py-8 bg-[#00415a]'
        )}
      >
        <div className="flex flex-col gap-4">
          <Title className={classes.title}>{title}</Title>
          <Container p={0}>
            <Text size={isMobile ? 'md' : 'lg'} className={classes.description}>
              {children}
            </Text>
          </Container>
        </div>
      </div>
      {image && (
        <MantineImage className="sm:max-w-md" src={image.src} />
      )}
    </div>
  )
}

export default ActivityCard
