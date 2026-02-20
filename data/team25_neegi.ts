import type { IDepartment } from './team'

import person from '@/assets/team//avatar.webp';
import martaLourenco from '@/assets/team/2025/NEEGI/Marta lourenço.jpg';
import luejeCruz from '@/assets/team/2025/NEEGI/Lueje cruz.jpg';
import pedroFerreira from '@/assets/team/2025/NEEGI/Pedro ferreira.jpg';
import carolinaNunes from '@/assets/team/2025/NEEGI/Carolina nunes.jpg';
import afonsoFigueira from '@/assets/team/2025/NEEGI/Afonso figueira.jpg';
import teresaMoura from '@/assets/team/2025/NEEGI/Teresa Moura.jpg';
import manuelTenazinha from '@/assets/team/2025/NEEGI/Manuel tenazinha.jpg';
import dianaMartins from '@/assets/team/2025/NEEGI/Diana martins.jpg';
import mariaJoaoLeite from '@/assets/team/2025/NEEGI/Maria joao leite.jpg';
import mariaLuisCosta from '@/assets/team/2025/NEEGI/Maria luis costa.jpg';
import joaoTarouca from '@/assets/team/2025/NEEGI/Joao tarouca.jpg';
import franciscoDias from '@/assets/team/2025/NEEGI/Francisco dias.jpg';
import madalenaFelix from '@/assets/team/2025/NEEGI/Madalena felix.jpg';
import miguelVieira from '@/assets/team/2025/NEEGI/Miguel Vieira.jpg';
import margaridaSismeiro from '@/assets/team/2025/NEEGI/Margarida sismeiro.jpg';
import madalenaMoura from '@/assets/team/2025/NEEGI/Madalena Moura.jpg';
import danielCampos from '@/assets/team/2025/NEEGI/Daniel campos.jpg';
import ritaCosta from '@/assets/team/2025/NEEGI/Rita Costa.jpg';
import pedroLima from '@/assets/team/2025/NEEGI/Pedro lima.jpg';
import joaoGoncalves from '@/assets/team/2025/NEEGI/João gonçalves.jpg';
import alexandreMarques from '@/assets/team/2025/NEEGI/Alexandre marques.jpg';
import franciscaCerqueira from '@/assets/team/2025/NEEGI/Francisca Cerqueira.jpg';

const coordenacao25_neegi: IDepartment = {
  name: 'Coordenação',
  slug: 'coordenacao',
  coordinators: [
    { name: 'Sofia Costa', image: person, role: 'Coordenadora Geral', linkedin: '' },
    { name: 'Francisco Silva', image: person, role: 'Vice-Coordenador Geral', linkedin: '' },
    { name: 'Tomás Carvalho', image: person, role: 'Tesoureiro', linkedin: '' },
  ],
  members: [],
}

const marketingDesign25_neegi: IDepartment = {
  name: 'Marketing & Design',
  slug: 'marketing-design',
  coordinators: [
    { name: 'Marta Lourenço', image: martaLourenco, role: 'Coordenadora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'António Trovão', image: person, role: 'Vice-Coordenadora', linkedin: '' },
  ],
  members: [
    { name: 'Lueje Cruz', image: luejeCruz, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Pedro Ferreira', image: pedroFerreira, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Carolina Nunes', image: carolinaNunes, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Afonso Figueira', image: afonsoFigueira, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Teresa Moura', image: teresaMoura, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Manuel Tenazinha', image: manuelTenazinha, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
  ],
}

const logistica25_neegi: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    { name: 'Diana Martins', image: dianaMartins, role: 'Coordenadora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Maria João Leite', image: mariaJoaoLeite, role: 'Vice-Coordenadora', linkedin: '', customImagePosition: 'center 50%' },
  ],
  members: [
    { name: 'Maria Luís Costa', image: mariaLuisCosta, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'João Tarouca', image: joaoTarouca, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Francisco Dias', image: franciscoDias, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Madalena Félix', image: madalenaFelix, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Miguel Vieira', image: miguelVieira, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' }
  ],
}

const relacoesExternas25_neegi: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    { name: 'Margarida Sismeiro', image: margaridaSismeiro, role: 'Coordenadora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Madalena Moura', image: madalenaMoura, role: 'Vice-Coordenadora', linkedin: '', customImagePosition: 'center 50%' }
  ],
  members: [
    { name: 'Daniel Campos', image: danielCampos, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Rita Costa', image: ritaCosta, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Pedro Lima', image: pedroLima, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'João Gonçalves', image: joaoGoncalves, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Alexandre Marques', image: alexandreMarques, role: 'Colaborador', linkedin: '', customImagePosition: 'center 50%' },
    { name: 'Francisca Cerqueira', image: franciscaCerqueira, role: 'Colaboradora', linkedin: '', customImagePosition: 'center 50%' }
  ],
}

export {
  coordenacao25_neegi,
  marketingDesign25_neegi,
  logistica25_neegi,
  relacoesExternas25_neegi,
}
