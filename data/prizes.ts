//  Assets
import Viagem from '@/assets/img/prizes/viagem.webp'
import Kobo from '@/assets/img/prizes/kobo.webp'
import Boat from '@/assets/img/prizes/boat.webp'
import Keyboard from '@/assets/img/prizes/keyboard.webp'
import { StaticImageData } from 'next/image'

export interface PrizeData {
  title: string
  image: StaticImageData
  description: string
}

const daily: PrizeData[] = [
  {
    title: 'Prémio Geral',
    image: Viagem,
    description: 'Câmera Digital + Viagem',
  },
  {
    title: 'Prémio do 1º dia',
    image: Kobo,
    description: 'Kobo + Capa + Candlelight (2p)',
  },
  {
    title: 'Prémio do 2º dia',
    image: Boat,
    description: 'Barco + Espetáculo (3p)',
  },
  {
    title: 'Prémio do 3º dia',
    image: Keyboard,
    description: 'Pack Jogos + Teclado e Rato Gaming',
  },
]

const prizes: PrizeData[] = [
  {
    title: 'Prémio dos CVs (2025)',
    image: Viagem,
    description: 'Voo de helicóptero',
  },
  {
    title: 'Prémio das Atividades (2025)',
    image: Viagem,
    description: 'Monitor Dell',
  },
  {
    title: 'Prémio Final (2025)',
    image: Viagem,
    description: 'Viagem a Budapeste',
  },
]

export { prizes, daily }
