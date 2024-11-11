//TODO: Use links
import { useRouter } from 'next/router'
import { links } from '@/data/links'

import Palestra from '@/assets/img/palestra.webp'

import {
  Title,
  Text,
  Button,
  Image as MantineImage,
  em,
  Container,
} from '@mantine/core'
import classes from './ourmission.module.css'
import { useMediaQuery } from '@mantine/hooks'

const OurMissionSection = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  const router = useRouter()

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-stretch items-stretch">
      <div className="grow flex flex-col justify-between items-start gap-4 p-4 sm:p-8 py-8 bg-[#00415a]">
        <div className="flex flex-col gap-4">
          <Title className={classes.title}>A nossa missão</Title>
          <Container p={0}>
            <Text size={isMobile ? 'md' : 'lg'} className={classes.description}>
              Este evento enquadra-se na iniciativa{' '}
              <strong>IST Career Weeks</strong>, onde se pretende, por um lado,
              ajudar os alunos a conhecer melhor as oportunidades para o seu
              futuro profissional, e por outro, ajudar as empresas a divulgar as
              suas atividades e necessidades. Todos os anos estão presentes
              empresas e oradores, que partilham as suas experiências e
              know-how.
            </Text>
          </Container>
        </div>
        {/* <Button
          onClick={() => router.push(links.activities)}
          variant="filled"
          fullWidth={isMobile}
          mt={10}
          size={isMobile ? 'sm' : 'md'}
        >
          As nossas atividades
        </Button> */}
      </div>
      <MantineImage className=" sm:max-w-lg" src={Palestra.src} />
    </div>
  )
}

export default OurMissionSection
