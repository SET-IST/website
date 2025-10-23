import { links } from '@/data/links'
import { useProfile } from '@/lib/frontend/hooks'
import { useBoundStore } from '@/lib/frontend/store'
import { Anchor, Button, Modal, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'

interface SectionProps {
  title: string
}

function Section({ title, children }: PropsWithChildren<SectionProps>) {
  return (
    <div>
      <Text fw={600} size="md">
        {title}
      </Text>
      <Text c="dimmed" size="sm">
        {children}
      </Text>
    </div>
  )
}

export function TCDialog() {
  const visible = useBoundStore((state) => state.tcModalVisible)
  const showDialog = useBoundStore((state) => state.showTermsAndConditionsModal)

  return (
    <Modal
      title={
        <Text fw="bold" size="lg">
          Termos e Condições - Plataforma de CVs
        </Text>
      }
      opened={visible}
      onClose={() => showDialog(false)}
      size="xl"
      centered
    >
      <div className="flex flex-col gap-4">
        <Section title="1. Objectivo">
          a) O presente documento tem por objetivo definir as condições para a
          submissão de currículos através da plataforma disponibilizada pela
          equipa do evento JET – Jornadas Empresariais e Tecnológicas, a decorrer entre os dias 24 a 27 de Fevereiro de 2025 no
          campus Taguspark do Instituto Superior Técnico, sito em Avenida
          Professor Doutor Cavaco Silva, 2744 -016 Porto Salvo, Portugal.
        </Section>
        <Section title="2. Informações">
          a) O evento JET – Jornadas Empresariais e Tecnológicas é organizado pelo
          núcleo LAGE2 – Laboratório de Apoio à Gestão de Atividades
          Extracurriculares dos Estudantes, registado como associação
          MSSKILLSLAB – Núcleo de Apoio À Gestão de Atividades Extracurriculares
          dos Estudantes, com sede em Instituto Superior Técnico – Campus
          Taguspark, Avenida Professor Doutor Cavaco Silva, 2744-016 Porto
          Salvo, Portugal. <br />
          <br />
          b) A submissão de currículos por parte dos alunos, e o posterior
          acesso por parte das empresas, tem por principal objetivo dar mais
          uma oportunidade aos alunos de serem reconhecidos pelas empresas que
          detêm acesso aos currículos. <br />
          <br />
          c) A plataforma de submissão de currículos do evento SET,
          incluída na app da SET, é uma plataforma onde os participantes desta
          edição podem submeter os seus currículos, em formato digital PDF, para
          consulta das empresas que escolham e decidam ter acesso aos
          currículos.
          <br />
          <br />
          d) O website do evento JET (
          <Anchor href="https://jet.tecnico.ulisboa.pt/" target="_blank">
            https://jet.tecnico.ulisboa.pt
          </Anchor>
          ) está hospedado nos servidores do Instituto Superior Técnico,
          localizados em Portugal.
        </Section>
        <Section title="3. Condições do tratamento dos currículos e da plataforma">
          a) Os currículos submetidos, em formato digital PDF, estão alojados
          nos servidores do Instituto Superior Técnico, localizados em Portugal.
          <br />
          <br />
          b) Apenas empresas que participam na mais recente edição da SET, e que
          decidam subscrever o serviço de acesso aos currículos, têm acesso à
          plataforma.
          <br />
          <br />
          c) A equipa do evento SET fornece credenciais de acesso à
          plataforma a cada empresa, sendo que cada empresa se compromete a que
          a credencial dada seja apenas usada por colaboradores da empresa.
          <br />
          <br />
          d) Os currículos submetidos estarão disponíveis na plataforma durante
          um ano após a sua submissão, sendo que a equipa do evento SET reserva
          o direito a apagar os ficheiros submetidos antes do prazo.
          <br />
          <br />
          e) Cada empresa também se compromete a apagar o(s) currículo(s)
          descarregado(s) um ano após o seu descarregamento a partir da
          plataforma disponibilizada.
          <br />
          <br />
          f) O aluno em algum momento pode ser contactado por alguma empresa,
          através de um contacto que este disponibilize no seu currículo, caso a
          empresa tenha interesse em apresentar alguma proposta ao aluno.
        </Section>
        <Text fw="bold" size="sm">
          Porto Salvo, 1 de Janeiro de 2025
        </Text>
      </div>
    </Modal>
  )
}
