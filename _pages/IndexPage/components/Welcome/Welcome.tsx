import { Container, Title, Text, Button, em } from '@mantine/core'
import classes from './welcome.module.css'
import { useMediaQuery } from '@mantine/hooks'

export default function WelcomeSection() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  return (
    <div className="flex flex-col justify-center items-start sm:items-center gap-4 p-4 py-8 sm:py-15 bg-white">
      <Title className={classes.title}>Bem vindo à SET</Title>
      <Container p={0}>
        <Text size={isMobile ? 'md' : 'lg'} className={classes.description}>
          A SET - <strong>Semana Empresarial e Tecnológica</strong> do Instituto
          Superior Técnico – Taguspark é um evento organizado por{' '}
          <strong>alunos</strong> de todos os cursos do campus, cujo objetivo é
          aproximar os mundos <strong>académico</strong> e{' '}
          <strong>empresarial</strong>.
        </Text>
      </Container>
      <Button mt={10} fullWidth={isMobile} size={isMobile ? 'sm' : 'md'}>
        Conhece a nossa equipa
      </Button>
    </div>
  )
}
