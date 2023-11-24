//  Components
// People
// Comité Executivo
import AfonsoLeitao from '@/assets/team/Comite_Executivo/Afonso Leitao.webp'
import JoaoDomingos from '@/assets/team/Comite_Executivo/João Domingos.webp'
import MariaMadeira from '@/assets/team/Comite_Executivo/Maria Madeira.webp'
import MatildePinheiro from '@/assets/team/Comite_Executivo/Matilde Pinheiro.webp'
// Logistica
import AfonsoBatalha from '@/assets/team/Logistica/Afonso Batalha.webp'
import AfonsoSantos from '@/assets/team/Logistica/Afonso Santos.webp'
import AntonioPereira from '@/assets/team/Logistica/Antonio Pereira.webp'
import BeatrizAlves from '@/assets/team/Logistica/Beatriz Alves.webp'
import BeatrizVenceslau from '@/assets/team/Logistica/Beatriz Venceslau.webp'
import ConstancaFlorindo from '@/assets/team/Logistica/Constanca Florindo.webp'
import DuartePonce from '@/assets/team/Logistica/Duarte Ponce.webp'
import FabioSoares from '@/assets/team/Logistica/Fabio Soares.webp'
import FranciscoGoncalves from '@/assets/team/Logistica/Francisco Goncalves.webp'
import GuilhermeSilva from '@/assets/team/Logistica/Guilherme Silva.webp'
import InesCoelho from '@/assets/team/Logistica/Inês Coelho.webp'
import MadalenaBarbeitos from '@/assets/team/Logistica/Madalena Barbeitos.webp'
import MartaMoutinho from '@/assets/team/Logistica/Marta Moutinho.webp'
import MatildeSantos from '@/assets/team/Logistica/Matilde Santos.webp'
import PauloLopes from '@/assets/team/Logistica/Paulo Lopes.webp'
import RicardoCarvalho from '@/assets/team/Logistica/Ricardo Carvalho.webp'
// Design
import AfonsoVirtuoso from '@/assets/team/Design/Afonso Virtuoso.webp'
import BrunoSilva from '@/assets/team/Design/Bruno Silva.webp'
import InesSimoes from '@/assets/team/Design/Inês Simões.webp'
// Marketing
import AndreiaAzevedo from '@/assets/team/Marketing/Andreia Azevedo.webp'
import BernardoOrmonde from '@/assets/team/Marketing/Bernardo Ormonde.webp'
import EvanetteEvaristo from '@/assets/team/Marketing/Evanette Evaristo.webp'
import FranciscaMartins from '@/assets/team/Marketing/Francisca Martins.webp'
import GabrielGabriel from '@/assets/team/Marketing/Gabriel Gabriel.webp'
import JoanaBasto from '@/assets/team/Marketing/Joana Basto.webp'
import JoaoBayeux from '@/assets/team/Marketing/João Bayeux.webp'
import LiaNeves from '@/assets/team/Marketing/Lia Neves.webp'
import LuisDias from '@/assets/team/Marketing/Luis Dias.webp'
import MargaridaSilva from '@/assets/team/Marketing/Margarida Silva.webp'
import MariaMoura from '@/assets/team/Marketing/Maria Moura.webp'
import PedroGomes from '@/assets/team/Marketing/Pedro Gomes.webp'
import RaulAlves from '@/assets/team/Marketing/Raul Alves.webp'
// Relações Externas
import AnaOliveira from '@/assets/team/Relacoes_Externas/Ana Oliveira.webp'
import BeatrizPinto from '@/assets/team/Relacoes_Externas/Beatriz Pinto.webp'
import BernardoCastico from '@/assets/team/Relacoes_Externas/Bernardo Castiço.webp'
import CarlotaPinto from '@/assets/team/Relacoes_Externas/Carlota Pinto.webp'
import CarolinaCruz from '@/assets/team/Relacoes_Externas/Carolina Cruz.webp'
import CatarinaMachado from '@/assets/team/Relacoes_Externas/Catarina Machado.webp'
import ConstancaPrimor from '@/assets/team/Relacoes_Externas/Constança Primor.webp'
import HugoRita from '@/assets/team/Relacoes_Externas/Hugo Rita.webp'
import ManuelCandeias from '@/assets/team/Relacoes_Externas/Manuel Candeias.webp'
import MargaridaSousa from '@/assets/team/Relacoes_Externas/Margarida Sousa.webp'
import MariaAibeo from '@/assets/team/Relacoes_Externas/Maria Aibéo.webp'
import MariaPessoa from '@/assets/team/Relacoes_Externas/Maria Carolina Pessoa.webp'
import MartaAugusto from '@/assets/team/Relacoes_Externas/Marta Augusto.webp'
import MartimAbreu from '@/assets/team/Relacoes_Externas/Martim Abreu.webp'
import NunoMarques from '@/assets/team/Relacoes_Externas/Nuno Marques.webp'
import PedroClaro from '@/assets/team/Relacoes_Externas/Pedro Claro.webp'
import PedroCurvo from '@/assets/team/Relacoes_Externas/Pedro Curvo.webp'
import SalvadorTorpes from '@/assets/team/Relacoes_Externas/Salvador Torpes.webp'
// SI
import DiogoCatarino from '@/assets/team/Suporte_Informatico/Diogo Catarino.webp'
import FranciscoSilva from '@/assets/team/Suporte_Informatico/Francisco Silva.webp'
import GoncaloSilva from '@/assets/team/Suporte_Informatico/Gonçalo Silva.webp'
import HelenaTeixeira from '@/assets/team/Suporte_Informatico/Helena Teixeira.webp'
import JoaoLobato from '@/assets/team/Suporte_Informatico/João Lobato.webp'
import MarianaCarvalho from '@/assets/team/Suporte_Informatico/Mariana Carvalho.webp'
import RicardoHorta from '@/assets/team/Suporte_Informatico/Ricardo Horta.webp'
import RodrigoAlves from '@/assets/team/Suporte_Informatico/Rodrigo Alves.webp'
import SamuelBarata from '@/assets/team/Suporte_Informatico/Samuel Barata.webp'
import JoaoAlves from '@/assets/team/unknown.webp'
import { StaticImageData } from 'next/image'

export interface TeamMember {
  name: string
  image: StaticImageData
  role: string
  linkedin: string
}

const coordenacao: TeamMember[] = [
  {
    name: 'João Domingos',
    image: JoaoDomingos,
    role: 'Co-Coordenador',
    linkedin: 'https://www.linkedin.com/in/joaogdomingos/',
  },
  {
    name: 'Maria Madeira',
    image: MariaMadeira,
    role: 'Co-Coordenadora',
    linkedin: 'https://www.linkedin.com/in/maria-teresa-madeira-',
  },
  {
    name: 'Matilde Pinheiro',
    image: MatildePinheiro,
    role: 'Co-Coordenadora',
    linkedin: 'https://www.linkedin.com/in/matildepinheiro/',
  },
  {
    name: 'Afonso Leitão',
    image: AfonsoLeitao,
    role: 'Coordenador Financeiro',
    linkedin: '',
  },
]
const logistica: TeamMember[] = [
  {
    name: 'Beatriz Alves',
    image: BeatrizAlves,
    role: 'Coordenadora',
    linkedin: '',
  },
  {
    name: 'Afonso Batalha',
    image: AfonsoBatalha,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/afonso-batalha/',
  },
  {
    name: 'Afonso Santos',
    image: AfonsoSantos,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/afonso-vaz-dos-santos-967964227',
  },
  {
    name: 'António Pereira',
    image: AntonioPereira,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/ap179/',
  },
  {
    name: 'Beatriz Venceslau',
    image: BeatrizVenceslau,
    role: 'Colaboradora',
    linkedin: 'http://linkedin.com/in/beatriz-venceslau',
  },
  {
    name: 'Constança Florindo',
    image: ConstancaFlorindo,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/constan%C3%A7a-florindo-08039523a',
  },
  {
    name: 'Duarte Ponce',
    image: DuartePonce,
    role: 'Colaborador',
    linkedin: 'https://pt.linkedin.com/in/duarte-ponce-77b666266',
  },
  {
    name: 'Fábio Soares',
    image: FabioSoares,
    role: 'Colaborador',
    linkedin: '',
  },
  {
    name: 'Francisco Gonçalves',
    image: FranciscoGoncalves,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/franciscotgg/',
  },
  {
    name: 'Guilherme Silva',
    image: GuilhermeSilva,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/guilherme-braz-silva/',
  },
  {
    name: 'Inês Coelho',
    image: InesCoelho,
    role: 'Colaboradora',
    linkedin: 'http://www.linkedin.com/in/in%C3%AAs-coelho-998808254',
  },
  {
    name: 'Madalena Barbeitos',
    image: MadalenaBarbeitos,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/madalena-barbeitos-a17b28116/',
  },
  {
    name: 'Marta Moutinho',
    image: MartaMoutinho,
    role: 'Colaboradora',
    linkedin: '',
  },
  {
    name: 'Matilde Santos',
    image: MatildeSantos,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/matilde-santos-85a090227/',
  },
  {
    name: 'Paulo Lopes',
    image: PauloLopes,
    role: 'Colaborador',
    linkedin: 'http://www.linkedin.com/in/paulo-lopes-693056227',
  },
  {
    name: 'Ricardo Carvalho',
    image: RicardoCarvalho,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/ricardo-carvalho1',
  },
]
const design: TeamMember[] = [
  {
    name: 'Afonso Virtuoso',
    image: AfonsoVirtuoso,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/afonso-virtuoso-327042257',
  },
  {
    name: 'Bruno Silva',
    image: BrunoSilva,
    role: 'Colaborador',
    linkedin: 'linkedin.com/in/bruno-silva-278907253',
  },
  {
    name: 'Inês Simões',
    image: InesSimoes,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/in%C3%AAs-sim%C3%B5es-732b75227/',
  },
]
const marketing: TeamMember[] = [
  {
    name: 'Francisca Martins',
    image: FranciscaMartins,
    role: 'Coordenadora',
    linkedin:
      'https://www.linkedin.com/in/francisca-ferreira-martins-5254a1221',
  },
  {
    name: 'Andreia Azevedo',
    image: AndreiaAzevedo,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/andreiasilvaazevedo/',
  },
  {
    name: 'Bernardo Ormonde',
    image: BernardoOrmonde,
    role: 'Colaborador',
    linkedin: 'http://www.linkedin.com/in/bernardo-ormonde-3973171b8',
  },
  {
    name: 'Evanette Evaristo',
    image: EvanetteEvaristo,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/evanette-evaristo-19760023a',
  },
  {
    name: 'Gabriel Gabriel',
    image: GabrielGabriel,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/gabriel-gabriel-bb261a25a',
  },
  {
    name: 'Joana Basto',
    image: JoanaBasto,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/joana-basto-916665255',
  },
  { name: 'João Bayeux', image: JoaoBayeux, role: 'Colaborador', linkedin: '' },
  {
    name: 'Lia Neves',
    image: LiaNeves,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/lia-neves-7015b6254',
  },
  {
    name: 'Luís Dias',
    image: LuisDias,
    role: 'Colaborador',
    linkedin: '',
  },
  {
    name: 'Margarida Silva',
    image: MargaridaSilva,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/margarida-silva-847936254/',
  },
  {
    name: 'Maria Moura',
    image: MariaMoura,
    role: 'Colaboradora',
    linkedin: 'http://linkedin.com/in/maria-mmoura-40b887254',
  },
  {
    name: 'Pedro Gomes',
    image: PedroGomes,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/pedro-gomes-25727516b',
  },
  {
    name: 'Raúl Alves',
    image: RaulAlves,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/raul-alves-174a54254/',
  },
]
const relacoesExternas: TeamMember[] = [
  {
    name: 'Ana Oliveira',
    image: AnaOliveira,
    role: 'Co-Coordenadora',
    linkedin: 'https://www.linkedin.com/in/anaclloliveira/',
  },
  {
    name: 'Manuel Candeias',
    image: ManuelCandeias,
    role: 'Co-Coordenador',
    linkedin: 'https://www.linkedin.com/in/manuel-candeias',
  },
  {
    name: 'Maria Carolina Pessoa',
    image: MariaPessoa,
    role: 'Co-Coordenadora',
    linkedin: 'https://www.linkedin.com/in/mariacarolinapessoa/',
  },
  {
    name: 'Beatriz Pinto',
    image: BeatrizPinto,
    role: 'Colaboradora',
    linkedin:
      'https://www.linkedin.com/in/beatriz-pinto-35a016234?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGTLDfxTHR8appMSAiYkeeQ%3D%3D',
  },
  {
    name: 'Bernardo Castiço',
    image: BernardoCastico,
    role: 'Colaborador',
    linkedin: 'http://www.linkedin.com/in/bernardo-casti%C3%A7o',
  },
  {
    name: 'Catarina Machado',
    image: CatarinaMachado,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/catarinatrgmachado',
  },
  {
    name: 'Carlota Pinto',
    image: CarlotaPinto,
    role: 'Colaboradora',
    linkedin: 'http://linkedin.com/in/carlota-pinto-023401251',
  },
  {
    name: 'Constança Primor',
    image: ConstancaPrimor,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/constan%C3%A7a-primor-9a19a0234',
  },
  {
    name: 'Carolina Cruz',
    image: CarolinaCruz,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/carolina-pinto-da-cruz-1b690b250/',
  },
  {
    name: 'Hugo Rita',
    image: HugoRita,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/hugorita288/',
  },
  {
    name: 'Margarida Sousa',
    image: MargaridaSousa,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/margarida-de-sousa-260007b3/',
  },
  {
    name: 'Maria Aibéo',
    image: MariaAibeo,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/maria-aib%C3%A9o-9643b4256',
  },
  {
    name: 'Marta Augusto',
    image: MartaAugusto,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/martaclaugusto/',
  },
  {
    name: 'Martim Abreu',
    image: MartimAbreu,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/martim-abreu-4b8a29225/',
  },
  {
    name: 'Nuno Marques',
    image: NunoMarques,
    role: 'Colaborador',
    linkedin: '',
  },
  {
    name: 'Pedro Claro',
    image: PedroClaro,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/pedro-claro-a38398230/',
  },
  {
    name: 'Pedro Curvo',
    image: PedroCurvo,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/pedro-curvo',
  },
  {
    name: 'Salvador Torpes',
    image: SalvadorTorpes,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/salvador-torpes-175263179',
  },
]
const suporteInformático: TeamMember[] = [
  {
    name: 'Francisco Silva',
    image: FranciscoSilva,
    role: 'Coordenador',
    linkedin:
      'https://www.linkedin.com/in/francisco-ribeiro-e-silva-144b511a9/',
  },
  {
    name: 'Gonçalo Silva',
    image: GoncaloSilva,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/goncaloacbs',
  },
  {
    name: 'Helena Teixeira',
    image: HelenaTeixeira,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/helenateixeira-info/',
  },
  {
    name: 'Samuel Barata',
    image: SamuelBarata,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/samuel-barata/',
  },
  {
    name: 'Diogo Catarino',
    image: DiogoCatarino,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/diogo-catarino/',
  },
  {
    name: 'Mariana Carvalho',
    image: MarianaCarvalho,
    role: 'Colaboradora',
    linkedin: 'https://www.linkedin.com/in/mariana-leite-carvalho',
  },
  {
    name: 'Ricardo Horta',
    image: RicardoHorta,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/ricardo-horta-9b2825254',
  },
  {
    name: 'João Alves',
    image: JoaoAlves,
    role: 'Colaborador',
    linkedin:
      'https://www.linkedin.com/in/jo%C3%A3o-maria-morgado-alves-28a865262',
  },
  {
    name: 'João Lobato',
    image: JoaoLobato,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/joao-rafael-lobato',
  },
  {
    name: 'Rodrigo Alves',
    image: RodrigoAlves,
    role: 'Colaborador',
    linkedin: 'https://www.linkedin.com/in/rodrigo-lucas-975562223/',
  },
]

export {
  coordenacao,
  design,
  logistica,
  marketing,
  relacoesExternas,
  suporteInformático,
}
