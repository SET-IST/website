import { Title, Text, Container, em } from '@mantine/core'
import classes from './companies.module.css'
import { CompaniesCarousel } from './components'
import { useMediaQuery } from '@mantine/hooks'

export default function CompaniesSection() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4 py-12 bg-white">
      <div className="flex flex-col gap-4">
        <Title className={classes.title}>Empresas parceiras</Title>
        <Container p={0}>
          <Text size={isMobile ? 'md' : 'lg'} className={classes.description}>
            Todos os anos estão presentes no evento{' '}
            <strong className="text-[#009bd6]">mais de 50 empresas</strong> dos
            mais <strong className="text-[#009bd6]">diversos setores</strong>
          </Text>
        </Container>
      </div>
      {process.env.NEXT_PUBLIC_PREPARE_NEXT_EDITION == "true" ? ("") : <CompaniesCarousel isMobile={isMobile || false} />}
    </div>
  )
}
