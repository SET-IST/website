//  Assets
import NintendSwitch2 from '@/assets/img/switch_2.webp'
import EscapeRoom from '@/assets/img/game_over.webp'
import Monitor from '@/assets/img/monitor.webp'
import ChatGPT from '@/assets/img/chat_gpt.webp'
import Tablet from '@/assets/img/tablet_lenovo.webp'
import Odisseias from '@/assets/img/odisseias.webp'
import Budapeste from '@/assets/img/budapeste.webp'
import { StaticImageData } from 'next/image'

export interface PrizeData {
  title: string
  image: StaticImageData
  description: string
}

const daily: PrizeData[] = [
  {
    title: 'Prémio do 1º dia (2025)',
    image: NintendSwitch2,
    description: 'Nintendo Switch 2',
  },
  {
    title: 'Prémio do 2º dia (2025)',
    image: Tablet,
    description: 'Tablet Lenovo + Capa',
  },
  {
    title: 'Prémio do 3º dia (2025)',
    image: ChatGPT,
    description: '6 meses ChatGPT Premium',
  },
  {
    title: 'Prémio do 4º dia (2025)',
    image: EscapeRoom,
    description: 'Escape Room',
  },
]

const prizes: PrizeData[] = [
  {
    title: 'Prémio dos CVs (2025)',
    image: Odisseias,
    description: 'Voo de helicóptero',
  },
  {
    title: 'Prémio das Atividades (2025)',
    image: Monitor,
    description: 'Monitor Dell',
  },
  {
    title: 'Prémio Final (2025)',
    image: Budapeste,
    description: 'Viagem a Budapeste',
  },
]

export { prizes, daily }
