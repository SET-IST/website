import type { IDepartment } from './team'

import person from '@/assets/team//avatar.webp';

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
    { name: 'Marta Lourenço', image: person, role: 'Coordenadora', linkedin: '' },
    { name: 'António Trovão', image: person, role: 'Vice-Coordenadora', linkedin: '' },
  ],
  members: [
    { name: 'Lueje Cruz', image: person, role: 'Colaboradora', linkedin: '' },
    { name: 'Pedro Ferreira', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Carolina Nunes', image: person, role: 'Colaboradora', linkedin: '' },
    { name: 'Afonso Figueira', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Teresa Moura', image: person, role: 'Colaboradora', linkedin: '' },
    { name: 'Manuel Tenazinha', image: person, role: 'Colaborador', linkedin: '' },
  ],
}

const logistica25_neegi: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    { name: 'Diana Martins', image: person, role: 'Coordenadora', linkedin: '' },
    { name: 'Maria João Leite', image: person, role: 'Vice-Coordenadora', linkedin: '' },
  ],
  members: [
    { name: 'Maria Luís Costa', image: person, role: 'Colaboradora', linkedin: '' },
    { name: 'João Tarouca', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Francisco Dias', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Madalena Félix', image: person, role: 'Colaboradora', linkedin: '' },
    { name: 'Miguel Vieira', image: person, role: 'Colaborador', linkedin: '' }
  ],
}

const relacoesExternas25_neegi: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    { name: 'Margarida Sismeiro', image: person, role: 'Coordenadora', linkedin: '' },
    { name: 'Madalena Moura', image: person, role: 'Vice-Coordenadora', linkedin: '' }
  ],
  members: [
    { name: 'Daniel Campos', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Rita Costa', image: person, role: 'Colaboradora', linkedin: '' },
    { name: 'Pedro Lima', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'João Gonçalves', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Alexandre Marques', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Francisca Cerqueira', image: person, role: 'Colaboradora', linkedin: '' }
  ],
}

export {
  coordenacao25_neegi,
  marketingDesign25_neegi,
  logistica25_neegi,
  relacoesExternas25_neegi,
}
