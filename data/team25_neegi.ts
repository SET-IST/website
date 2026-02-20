import type { IDepartment } from './team'

import person from '@/assets/team//avatar.webp';
import martaLourenco from '@/assets/team/2025/NEEGI/marta_lourenco.webp';
import luejeCruz from '@/assets/team/2025/NEEGI/lueje_cruz.webp';
import pedroFerreira from '@/assets/team/2025/NEEGI/pedro_ferreira.webp';
import carolinaNunes from '@/assets/team/2025/NEEGI/carolina_nunes.webp';
import afonsoFigueira from '@/assets/team/2025/NEEGI/afonso_figueira.webp';
import teresaMoura from '@/assets/team/2025/NEEGI/teresa_moura.webp';
import manuelTenazinha from '@/assets/team/2025/NEEGI/manuel_tenazinha.webp';
import dianaMartins from '@/assets/team/2025/NEEGI/diana_martins.webp';
import mariaJoaoLeite from '@/assets/team/2025/NEEGI/maria_joao_leite.webp';
import mariaLuisCosta from '@/assets/team/2025/NEEGI/maria_luis_costa.webp';
import joaoTarouca from '@/assets/team/2025/NEEGI/joao_tarouca.webp';
import franciscoDias from '@/assets/team/2025/NEEGI/francisco_dias.webp';
import madalenaFelix from '@/assets/team/2025/NEEGI/madalena_felix.webp';
import miguelVieira from '@/assets/team/2025/NEEGI/miguel_vieira.webp';
import margaridaSismeiro from '@/assets/team/2025/NEEGI/margarida_sismeiro.webp';
import madalenaMoura from '@/assets/team/2025/NEEGI/madalena_moura.webp';
import danielCampos from '@/assets/team/2025/NEEGI/daniel_campos.webp';
import ritaCosta from '@/assets/team/2025/NEEGI/rita_costa.webp';
import pedroLima from '@/assets/team/2025/NEEGI/pedro_lima.webp';
import joaoGoncalves from '@/assets/team/2025/NEEGI/joao_goncalves.webp';
import alexandreMarques from '@/assets/team/2025/NEEGI/alexandre_marques.webp';
import franciscaCerqueira from '@/assets/team/2025/NEEGI/francisca_cerqueira.webp';

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
