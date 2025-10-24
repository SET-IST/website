import {
  Button,
  Container,
  Paper,
  Title,
  Text,
  SegmentedControl,
  Divider, SegmentedControlItem,
} from '@mantine/core'
import { UserActivities } from './components/UserActivities'
import Header from './components/Header'
import ActivityCard from './components/ActivityCard'

import SpeedInterview from '@/assets/img/speed-interview.webp'
import Workshop from '@/assets/img/workshop.jpeg'
import Palestra from '@/assets/img/palestra-palco.webp'
import { FooterLayout } from '../layouts'
import { useBoundStore } from '@/lib/frontend/store'
import { DateTime } from 'luxon'
import { useEffect } from 'react'

const ActivitiesPage =  () => {
  const currentDay = useBoundStore((state) => state.selectedDay)
  const setCurrentDate = useBoundStore((state) => state.setSelectedDate)
  const activeDays = useBoundStore((state) => state.activeDays)
  const fetchActiveDays = useBoundStore((state) => state.fetchActiveDays)

  useEffect(() => {
    fetchActiveDays()
  }, [fetchActiveDays]);

  return (
    <div className="sm:h-screen pt-15 sm:pt-18 sm:pb-3 bg-[color:var(--mantine-color-gray-1)]">
      <div className="w-full h-full flex flex-col">
        <FooterLayout>
          <Header />
          <Paper className="h-fit w-screen px-0 sm:p-6 flex flex-col justify-stretch">
            <div className="sticky sm:relative top-15 z-10 sm:top-0 px-2 sm:px-0 py-3 bg-[color:var(--mantine-color-white)]">
              <SegmentedControl
                fullWidth
                value={currentDay?.date?.toISOString()}
                onChange={setCurrentDate}
                data={activeDays.map(d => ({
                  label: 'Dia ' + d.date.getDay(),
                  value: DateTime.fromFormat(d.dateCode, "dd_LL_yyyy").toFormat("yyyy-LL-dd")
                }))}
              />
            </div>
            <UserActivities />
          </Paper>
          <ActivityCard title="Speed Interviews" image={SpeedInterview}>
            Uma Speed Interview é um pitch + entrevista com duração total de 8 minutos,
            seguidos de 2 minutos em que receberás feedback da empresa sobre o teu desempenho
            e CV. Aproveita esta oportunidade de te apresentares às empresas e obter feedback
            construtivo que podes levar para o mercado de trabalho! Submete o teu CV para as
            empresas terem acesso ao mesmo. Se fores selecionado, receberás um email de confirmação.
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
