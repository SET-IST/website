import { links } from '@/data/links'
import { Title } from '@mantine/core'
import classes from './tips.module.css'
import Tip from './components/Tip'

const TipsSection = () => {
  return (
    <div className="w-full flex flex-col justify-between items-start gap-10 p-4 sm:p-8 sm:py-14 py-8 bg-[#00415a]">
      <Title className={classes.title}>Como participar</Title>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-6">
        <Tip
          title="Networking"
          description="Interage com as empresas e faz scan dos códigos QR"
        />
        <Tip
          title="Atividades"
          description="Participa em atividades, ganha pontos e habilita-te a ganhar o prémio das atividades"
          action={{
            title: 'Ver atividades',
            url: links.activities,
            requiresLogin: false,
          }}
        />
        <Tip
          title="Destaca-te"
          description="Faz upload do teu currículo e habilita-te a ganhar o prémio dos CVs"
          action={{
            title: 'Ver o meu perfil',
            url: links.student.profile,
            requiresLogin: true,
          }}
        />
      </div>
    </div>
  )
}

export default TipsSection
