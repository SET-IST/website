// Components

// Coordenação
import JoaoLobato from '@/assets/team/2025/Coordenacao/image00001.webp'
import JoaoDiegues from '@/assets/team/2025/Coordenacao/image00003.webp'
import PedroGomes from '@/assets/team/2025/Coordenacao/image00002.webp'

// Logística
import SamuelSousa from '@/assets/team/2025/Logistica/image00017.webp'
import AfonsoGomes from '@/assets/team/2025/Logistica/image00018.webp'
import BrunoSilva from '@/assets/team/2025/Logistica/image00020.webp'
import AfonsoVirtuoso from '@/assets/team/2025/Logistica/image00019.webp'
import DuarteNunes from '@/assets/team/2025/Logistica/image00021.webp'
import InesRibeiro from '@/assets/team/2025/Logistica/image00023.webp'
import EmaPinheiro from '@/assets/team/2025/Logistica/image00022.webp'
import JoanaGuia from '@/assets/team/2025/Logistica/image00024.webp'
import MarinaNobrega from '@/assets/team/2025/Logistica/image00025.webp'
import MadalenaMartins from '@/assets/team/2025/Logistica/image00027.webp'
import MartaAbreu from '@/assets/team/2025/Logistica/image00026.webp'
import RicardoAlvaro from '@/assets/team/2025/Logistica/image00028.webp'
import PedroBarao from '@/assets/team/2025/Logistica/image00029.webp'

// Marketing
import GabrielGabriel from '@/assets/team/2025/Marketing/image00010.webp'
import AnaPinto from '@/assets/team/2025/Marketing/image00011.webp'
import DenysTsiple from '@/assets/team/2025/Marketing/image00007.webp'
import EvanetteEvaristo from '@/assets/team/2025/Marketing/IMG_7316.webp'
import LuisDias from '@/assets/team/2025/Marketing/image00013.webp'
import JoanaMatias from '@/assets/team/2025/Marketing/image00012.webp'
import MadalenaBordadagua from '@/assets/team/2025/Marketing/image00016.webp'
import TomasAntao from '@/assets/team/2025/Marketing/image00014.webp'
import MariaLuis from '@/assets/team/2025/Marketing/image00015.webp'

// Relações Externas
import SaraMarques from '@/assets/team/2025/Relacoes_Externas/image00030.webp'
import DorisaSilva from '@/assets/team/2025/Relacoes_Externas/image00031.webp'
import AfonsoFigueira from '@/assets/team/2025/Relacoes_Externas/image00033.webp'
import AfonsoSantos from '@/assets/team/2025/Relacoes_Externas/image00034.webp'
import AfonsoLouro from '@/assets/team/2025/Relacoes_Externas/image00032.webp'
import FranciscoUva from '@/assets/team/2025/Relacoes_Externas/image00036.webp'
import BeatrizTome from '@/assets/team/2025/Relacoes_Externas/image00037.webp'
import JoaoPalma from '@/assets/team/2025/Relacoes_Externas/image00035.webp'
import LauraMira from '@/assets/team/2025/Relacoes_Externas/image00038.webp'
import LucasCardoso from '@/assets/team/2025/Relacoes_Externas/image00040.webp'
import TeresaMoura from '@/assets/team/2025/Relacoes_Externas/image00039.webp'
import MariaAntunes from '@/assets/team/2025/Relacoes_Externas/image00041.webp'
import DiogoBrito from '@/assets/team/2025/Relacoes_Externas/image00043.webp'
import MarianaLambeiro from '@/assets/team/2025/Relacoes_Externas/image00042.webp'
import PedroFerreira from '@/assets/team/2025/Relacoes_Externas/image00044.webp'
import TomasTeixeira from '@/assets/team/2025/Relacoes_Externas/image00045.webp'

// Suporte Informático
import SamuelBarata from '@/assets/team/2025/Suporte_Informatico/IMG_7317.webp'
import AfonsoPires from '@/assets/team/2025/Suporte_Informatico/image00006.webp'
import DanielaCorreia from '@/assets/team/2025/Suporte_Informatico/image00005.webp'
import FilipeMiranda from '@/assets/team/2025/Suporte_Informatico/image00004.webp'
import StefanKnutsen from '@/assets/team/2025/Suporte_Informatico/image00008.webp'
import SandraCastilho from '@/assets/team/2025/Suporte_Informatico/image00009.webp'

import type { IDepartment } from './team'

const coordenacao25: IDepartment = {
  name: 'Coordenação',
  slug: 'coordenacao',
  coordinators: [
    {
      name: 'João Lobato',
      image: JoaoLobato,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/joao-rafael-lobato/',
    },
    {
      name: 'Pedro Gomes',
      image: PedroGomes,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/pedro-gomes-25727516b/',
    },
    {
      name: 'João Diegues',
      image: JoaoDiegues,
      role: 'Coordenador Financeiro',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-diegues-6178ab319/',
    },
  ],
  members: [],
}

const logistica25: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    {
      name: 'Samuel Sousa',
      image: SamuelSousa,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/samuelsousa99037/',
    },
  ],
  members: [
    {
      name: 'Afonso Gomes',
      image: AfonsoGomes,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/afonso-gomes-0a10702a9/',
    },
    {
      name: 'Afonso Virtuoso',
      image: AfonsoVirtuoso,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/afonso-virtuoso-327042257/',
    },
    {
      name: 'Bruno Silva',
      image: BrunoSilva,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Duarte Pedro Nunes',
      image: DuarteNunes,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Ema Pinheiro',
      image: EmaPinheiro,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/ema-pinheiro-77879a256/',
    },
    {
      name: 'Inês Ribeiro',
      image: InesRibeiro,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/in%C3%AAs-martins-ribeiro/',
    },
    {
      name: 'Joana Guia',
      image: JoanaGuia,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/joana-guia-161196259/',
    },
    {
      name: 'Madalena Martins',
      image: MadalenaMartins,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Marina Nóbrega',
      image: MarinaNobrega,
      role: 'Colaboradora',
      linkedin: 'www.linkedin.com/in/marina-mnóbrega',
    },
    {
      name: 'Marta Abreu',
      image: MartaAbreu,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Pedro Barão',
      image: PedroBarao,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/pedro-bar%C3%A3o-96a2b422a/',
    },
    {
      name: 'Ricardo Álvaro',
      image: RicardoAlvaro,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/ricardo-patroc%C3%ADnio-%C3%A1lvaro-557896296/',
    },
  ],
}

const marketingDesign25: IDepartment = {
  name: 'Marketing e Design',
  slug: 'design',
  coordinators: [
    {
      name: 'Ana Pinto',
      image: AnaPinto,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/ana-pinto-996a452bb/',
    },
    {
      name: 'Denys Tsiple',
      image: DenysTsiple,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/denys-undefined-aa5b26275/',
    },
    {
      name: 'Gabriel Gabriel',
      image: GabrielGabriel,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/gabrieldggabriel/',
    },
  ],
  members: [
    {
      name: 'Evanette Evaristo',
      image: EvanetteEvaristo,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/evanette-evaristo-19760023a/',
    },
    {
      name: 'Joana Matias',
      image: JoanaMatias,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/joana-m-400b152a0/',
    },
    {
      name: 'Luís Dias',
      image: LuisDias,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Madalena Bordadágua',
      image: MadalenaBordadagua,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/madalena-bordad%C3%A1gua-1bb49a187/',
    },
    {
      name: 'Maria Luís Costa',
      image: MariaLuis,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/maria-lu%C3%ADs-costa-ab5761296/',
    },
    {
      name: 'Tomás Antão',
      image: TomasAntao,
      role: 'Colaborador',
      linkedin: '',
    },
  ],
}

const relacoesExternas25: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes_externas',
  coordinators: [
    {
      name: 'Dorisa Silva',
      image: DorisaSilva,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/dorisa-silva-026574213/',
    },
    {
      name: 'Sara Marques',
      image: SaraMarques,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/sara-marques-b87050298/',
    },
  ],
  members: [
    {
      name: 'Afonso Figueira',
      image: AfonsoFigueira,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Afonso Louro',
      image: AfonsoLouro,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/afonso-silva-louro-4a6a0632a/',
    },
    {
      name: 'Afonso Santos',
      image: AfonsoSantos,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/afonso-rio-tinto-santos/',
    },
    {
      name: 'Beatriz Tomé',
      image: BeatrizTome,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/beatriz-tom%C3%A9-59aa742b1/',
    },
    {
      name: 'Francisco Uva',
      image: FranciscoUva,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/francisco-sousa-uva/',
    },
    {
      name: 'João Palma',
      image: JoaoPalma,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-palma-47b66228b/',
    },
    {
      name: 'Laura Mira',
      image: LauraMira,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Lucas Cardoso',
      image: LucasCardoso,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/lucas-cardoso-9356382b6/',
    },
    {
      name: 'Teresa Moura',
      image: TeresaMoura,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/teresa-seabra-moura-6891a22a6/',
    },
    {
      name: 'Mariana Antunes',
      image: MariaAntunes,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Mariana Lameiro',
      image: MarianaLambeiro,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Diogo Brito',
      image: DiogoBrito,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/diogo-brito-22166a329/',
    },
    {
      name: 'Pedro Ferreira',
      image: PedroFerreira,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Tomás Teixeira',
      image: TomasTeixeira,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/tomasmgteixeira/',
    },
  ],
}

const suporteInformatico25: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte_informatico',
  coordinators: [
    {
      name: 'Samuel Barata',
      image: SamuelBarata,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/samuel-barata/',
    },
  ],

  members: [
    {
      name: 'Afonso Pires',
      image: AfonsoPires,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/afonso-pires-b155a2222/',
    },
    {
      name: 'Daniela Correia',
      image: DanielaCorreia,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Filipe Miranda',
      image: FilipeMiranda,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/filipe-miranda-a90804317',
    },
    {
      name: 'Sandra Castilho',
      image: SandraCastilho,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/sandra-castilho-20a8071a5/',
    },
    {
      name: 'Stefan Knutsen',
      image: StefanKnutsen,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/stefan-knutsen/',
    },
  ],
}

export {
  coordenacao25,
  marketingDesign25,
  logistica25,
  relacoesExternas25,
  suporteInformatico25,
}
