import {
  Button,
  Container,
  Paper,
  Title,
  Text,
  SegmentedControl,
  Divider,
} from '@mantine/core'
import { UserActivities } from './components/UserActivities'
import Header from './components/Header'
import ActivityCard from './components/ActivityCard'

import SpeedInterview from '@/assets/img/speed-interview.webp'
import Workshop from '@/assets/img/workshop.jpeg'
import Palestra from '@/assets/img/palestra-palco.webp'
import { FooterLayout } from '../layouts'
import { useBoundStore } from '@/lib/frontend/store'

const ActivitiesPage = () => {
  const currentDate = useBoundStore((state) => state.selectedDate)
  const setCurrentDate = useBoundStore((state) => state.setSelectedDate)

  return (
    <div className="sm:h-screen pt-15 sm:pt-18 sm:pb-3 bg-[color:var(--mantine-color-gray-1)]">
      <div className="w-full h-full flex flex-col">
        <FooterLayout>
          <Header />
          <Paper className="h-fit w-screen px-0 sm:p-6 flex flex-col justify-stretch">
            <div className="sticky sm:relative top-15 z-10 sm:top-0 px-2 sm:px-0 py-3 bg-[color:var(--mantine-color-white)]">
              <SegmentedControl
                fullWidth
                defaultValue={currentDate}
                onChange={setCurrentDate}
                data={[
                  {
                    label: 'Dia 24',
                    value: '2025-02-24',
                  },
                  {
                    label: 'Dia 25',
                    value: '2025-02-25',
                  },
                  {
                    label: 'Dia 26',
                    value: '2025-02-26',
                  },
                  {
                    label: 'Dia 27',
                    value: '2025-02-27',
                  },
                ]}
              />
            </div>
            <UserActivities />
          </Paper>
          <ActivityCard title="Speed Interviews" image={SpeedInterview}>
            Uma Speed Interview é um pitch de 2/3 minutos em que te apresentas a
            um conjunto de empresas que te darão feedback, o que perfaz um total
            de 10 minutos de interação com as empresas. Podes submeter o teu CV
            para que as empresas tenham acesso ao mesmo durante o teu pitch! Se
            fores aceite, receberás um email com a confirmação do dia e hora
            para a sessão, que será na sala 0-67/0-69.
          </ActivityCard>
          <ActivityCard title="Palestras" image={Palestra}>
            Poderás ouvir e questionar profissionais experientes na área da
            palestra. Irão ser abordados temas da atualidade e, por isso,
            incentivamos a participarem e conhecerem os nossos oradores
            presentes, nesta edição.
          </ActivityCard>
          <ActivityCard title="Workshops" image={Workshop}>
            Esta atividade foi concebida para proporcionar um envolvimento
            direto entre empresas e estudantes, promovendo a troca de
            conhecimento e experiência. Durante esta atividade, a empresa
            organiza uma sessão interativa com duração de 30 a 45 minutos, em
            conjunto com os alunos.
          </ActivityCard>
        </FooterLayout>
      </div>
    </div>
  )
}

export default ActivitiesPage
