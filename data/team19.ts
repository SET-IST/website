//  Components

// Coordenacao
import andremarques from '@/assets/team/2019/andremarques.webp';
import carolinaLucas from '@/assets/team/2019/carolinaLucas.webp';
import carolinapignatelli from '@/assets/team/2019/carolinapignatelli.webp';
import diogoalmeida from '@/assets/team/2019/diogoalmeida.webp';
import diogomartins from '@/assets/team/2019/diogomartins.webp';
import fabiosousa from '@/assets/team/2019/fabiosousa.webp';
import filipaRocha from '@/assets/team/2019/filipaRocha.webp';
import franciscaFerreira from '@/assets/team/2019/franciscaFerreira.webp';
import gabrielaGomes from '@/assets/team/2019/gabrielaGomes.webp';
import goncalomeireles from '@/assets/team/2019/goncalomeireles.webp';
import henriqueSantos from '@/assets/team/2019/henriqueSantos.webp';
import inesfialho from '@/assets/team/2019/inesfialho.webp';
import joanaguedes from '@/assets/team/2019/joanaguedes.webp';
import leonorBento from '@/assets/team/2019/leonorBento.webp';
import leticiarodrigues from '@/assets/team/2019/leticiarodrigues.webp';
import luisFilipe from '@/assets/team/2019/luisFilipe.webp';
import luistonicha from '@/assets/team/2019/luistonicha.webp';
import maragridaMorais from '@/assets/team/2019/maragridaMorais.webp';
import marianapatrao from '@/assets/team/2019/marianapatrao.webp';
import miguelgouveia from '@/assets/team/2019/miguelgouveia.webp';
import pedropina from '@/assets/team/2019/pedropina.webp';
import quevinudai from '@/assets/team/2019/quevinudai.webp';
import saraCardos from '@/assets/team/2019/saraCardos.webp';
import sarasantos from '@/assets/team/2019/sarasantos.webp';
import tiagoalves from '@/assets/team/2019/tiagoalves.webp';
import tiagofernandes from '@/assets/team/2019/tiagofernandes.webp';
import vascoFigueroa from '@/assets/team/2019/vascoFigueroa.webp';



import type { IDepartment } from './team'

const coordenacao19: IDepartment = {
  name: 'Comité Executivo',
  slug: 'comite-executivo',
  coordinators: [
    {
      name: 'Quevin Udai',
      image: quevinudai,
      role: 'COO',
      linkedin: '',
    },
    {
      name: 'Henrique Santos',
      image: henriqueSantos,
      role: 'COO',
      linkedin: '',
    },
    {
      name: 'Diogo Martins',
      image: diogomartins,
      role: 'CTO',
      linkedin: '',
    },
    {
      name: 'Tiago Fernandes',
      image: tiagofernandes,
      role: 'CFO',
      linkedin: '',
    },
  ],
  members: [],
};

const relacoesExternas19: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [],
  members: [
    { name: 'Mariana Cruz', image: marianapatrao, role: 'Empresas', linkedin: '' },
    { name: 'Carolina Pignatelli', image: carolinapignatelli, role: 'Empresas', linkedin: '' },
    { name: 'Mariana Patrão', image: marianapatrao, role: 'Empresas', linkedin: '' },
    { name: 'Ines Fialho', image: inesfialho, role: 'Empresas', linkedin: '' },
    { name: 'André Marques', image: andremarques, role: 'Empresas/Oradores', linkedin: '' },
    { name: 'Gabriela Gomes', image: gabrielaGomes, role: 'Empresas/Oradores', linkedin: '' },
    { name: 'Maria Odete Meneses', image: marianapatrao, role: 'Empresas', linkedin: '' },
    { name: 'Sara Cardoso', image: saraCardos, role: 'Empresas', linkedin: '' },
    { name: 'Cintia Almeida', image: carolinaLucas, role: 'Empresas', linkedin: '' },
    { name: 'Sara Machado', image: saraCardos, role: 'Empresas', linkedin: '' },
    { name: 'Gonçalo Botas', image: goncalomeireles, role: 'Oradores', linkedin: '' },
  ],
};

const marketing19: IDepartment = {
  name: 'Marketing',
    slug: 'marketing',
    coordinators: [
      {
        name: 'Letícia Rodrigues',
        image: leticiarodrigues,
        role: 'Coordenadora',
        linkedin: '',
      },
    ],
    members: [
      { name: 'Francisca Ferreira', image: franciscaFerreira, role: 'Colaboradora', linkedin: '' },
      { name: 'Inês Alves', image: inesfialho, role: 'Colaboradora', linkedin: '' },
      { name: 'Sara Santos', image: sarasantos, role: 'Colaboradora', linkedin: '' },
      { name: 'Leonor Bento', image: leonorBento, role: 'Colaboradora', linkedin: '' },
      { name: 'Vasco Figueiroa', image: vascoFigueroa, role: 'Colaborador', linkedin: '' },
      { name: 'Miguel Gouveia', image: miguelgouveia, role: 'Colaborador', linkedin: '' },
    ],
};

const logistica19: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    {
      name: 'Diogo Almeida',
      image: diogoalmeida,
      role: 'Coordenador',
      linkedin: '',
    },
  ],
  members: [
    { name: 'Tiago Alves', image: tiagoalves, role: 'Colaborador', linkedin: '' },
    { name: 'Margarida Morais', image: maragridaMorais, role: 'Colaboradora', linkedin: '' },
    { name: 'Pedro Pina', image: pedropina, role: 'Colaborador', linkedin: '' },
    { name: 'Fabio Sousa', image: fabiosousa, role: 'Colaborador', linkedin: '' },
    { name: 'Marco Coelho', image: diogoalmeida, role: 'Colaborador', linkedin: '' },
    { name: 'Carolina Lucas', image: carolinaLucas, role: 'Colaboradora', linkedin: '' },
    { name: 'Joana Guedes', image: joanaguedes, role: 'Colaboradora', linkedin: '' },
  ],
};

const suporteInformatico19: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [],
  members: [
    { name: 'Luís Filipe', image: luisFilipe, role: 'Prod. Audiovisuais', linkedin: '' },
    { name: 'Filipa Rocha', image: filipaRocha, role: 'Front End Dev. e Designer', linkedin: '' },
    { name: 'Luis Tonicha', image: luistonicha, role: 'Back End Dev.', linkedin: '' },
  ],
};



export {
  coordenacao19,
  logistica19,
  marketing19,
  relacoesExternas19,
  suporteInformatico19,
}
