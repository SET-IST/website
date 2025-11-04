import { Container, Title, Text, Button, em } from '@mantine/core'
import classes from './welcome.module.css'
import { useMediaQuery } from '@mantine/hooks'
import { links } from '@/data/links'
import { useRouter } from 'next/router'

export default function WelcomeSection() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center sm:items-center gap-4 p-4 py-8 sm:py-15 bg-white">
      <Title className={classes.title}>Bem vindo à JET</Title>
      <Container p={0}>
        <Text
          size={isMobile ? 'md' : 'lg'}
          className="!text-[#00415a] font-medium text-left sm:text-center"
        >
          As Jornadas de Engenharia e Gestão Industrial (JEGI) e a Semana
          Empresarial e Tecnológica (SET), as maiores feiras de emprego do
          <strong> IST Oeiras</strong>, juntam-se pela primeira vez para dar origem à <strong>JET -
          Jornadas Empresariais e Tecnológicas</strong>. A JET foi concebida
          para proporcionar aos <strong>estudantes</strong> uma experiência mais completa e
          enriquecedora, ampliando <strong>oportunidades, networking e
          aprendizagem</strong> para todos os alunos do IST.
        </Text>
      </Container>
      {process.env.NEXT_PUBLIC_PREPARE_NEXT_EDITION == "true" ? ("") : (
        <Button
          onClick={() => router.push(links.team)}
          mt={10}
          fullWidth={isMobile}
          size={isMobile ? 'sm' : 'md'}
        >
          Conhece a nossa equipa
        </Button>
      )}
    </div>
  )
}
