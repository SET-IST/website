//  Components

// Coordenacao
import reginaManuelito from '@/assets/team/2018/reginamanuelito.webp';
import henriqueSantos from '@/assets/team/2018/henriquesantos.webp';

// Logistica
import diogoAlmeida from '@/assets/team/2018/diogoalmeida.webp';
import diogoMartins from '@/assets/team/2018/diogomartins.webp';
import goncaloMeireles from '@/assets/team/2018/goncalomeireles.webp';
import inesCastelbranco from '@/assets/team/2018/inescastel-branco.webp';
import tiagoAlves from '@/assets/team/2018/tiagoalves.webp';
import tiagoFernandes from '@/assets/team/2018/tiagofernandes.webp';

// Suporte Informático
import filipeCorreia from '@/assets/team/2018/filipecorreia.webp';
import luisFilipe from '@/assets/team/2018/luisfilipe.webp';

// Marketing
import catarinaMateus from '@/assets/team/2018/catarinamateus.webp';
import claudiaDias from '@/assets/team/2018/claudiadias.webp';
import inesJacob from '@/assets/team/2018/inesjacob.webp';
import joaoValado from '@/assets/team/2018/joaovalado.webp';
import leticiaRodrigues from '@/assets/team/2018/leticiarodrigues.webp';
import madalenaveloso from '@/assets/team/2018/madalenaveloso.webp';
import quevinJagmohandas from '@/assets/team/2018/quevinjagmohandas.webp';

// Relações Externas
import diogoDores from '@/assets/team/2018/diogodores.webp';
import joseSousa from '@/assets/team/2018/josesousa.webp';
import marcoAfonso from '@/assets/team/2018/marcoafonso.webp';
import margaridaSilvestre from '@/assets/team/2018/margaridasilvestre.webp';
import marianaPatrao from '@/assets/team/2018/marianapatrao.webp';
import miguelCoelho from '@/assets/team/2018/miguelcoelho.webp';
import nunoMacara from '@/assets/team/2018/nunomacara.webp';
import pedroAngelico from '@/assets/team/2018/pedroangelico.webp';
import pedroPina from '@/assets/team/2018/pedropina.webp';
import pedroRocha from '@/assets/team/2018/pedrorocha.webp';

import type { IDepartment } from './team'

const coordenacao18: IDepartment = {
  name: 'Comité Executivo',
  slug: 'comite-executivo',
  coordinators: [
    {
      name: 'Henrique Santos',
      image: henriqueSantos,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/hfigueiredosantos/',
    },
    {
      name: 'Regina Manuelito',
      image: reginaManuelito,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/reginamanuelito/',
    },
  ],
  members: [],
};

const relacoesExternas18: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    {
      name: 'Mariana Patrão',
      image: marianaPatrao,
      role: 'Coordenadora',
      linkedin: '',
    },
  ],
  members: [
    {
      name: 'Diogo Dores',
      image: diogoDores,
      role: 'Contacto Oradores',
      linkedin: '',
    },
    {
      name: 'José Sousa',
      image: joseSousa,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Marco Afonso',
      image: miguelCoelho,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Margarida Silvestre',
      image: margaridaSilvestre,
      role: 'Contacto Empresas',
      linkedin: '',
    },
    {
      name: 'Miguel Coelho',
      image: marcoAfonso,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Nuno Macara',
      image: nunoMacara,
      role: 'Contacto Empresas',
      linkedin: '',
    },
    {
      name: 'Pedro Angélico',
      image: pedroAngelico,
      role: 'Contacto Oradores',
      linkedin: '',
    },
    {
      name: 'Pedro Pina',
      image: pedroPina,
      role: 'Contacto Oradores',
      linkedin: '',
    },
    {
      name: 'Pedro Rocha',
      image: pedroRocha,
      role: 'Contacto Oradores',
      linkedin: '',
    },
  ],
};

const marketing18: IDepartment = {
  name: 'Marketing',
    slug: 'marketing',
    coordinators: [
      {
        name: 'Catarina Mateus',
        image: catarinaMateus,
        role: 'Coordenadora',
        linkedin: '',
      },
    ],
    members: [
      {
        name: 'Cláudia Dias',
        image: claudiaDias,
        role: 'Contacto Patrocínios',
        linkedin: '',
      },
      {
        name: 'Inês Jacob',
        image: inesJacob,
        role: 'Colaboradora',
        linkedin: '',
      },
      {
        name: 'João Valado',
        image: joaoValado,
        role: 'Produção Imagens',
        linkedin: '',
      },
      {
        name: 'Letícia Rodrigues',
        image: leticiaRodrigues,
        role: 'Redes Sociais',
        linkedin: '',
      },
      {
        name: 'Madalena Veloso',
        image: madalenaveloso,
        role: 'Redes Sociais',
        linkedin: '',
      },
      {
        name: 'Quevin Jagmohandas',
        image: quevinJagmohandas,
        role: 'Passatempos',
        linkedin: '',
      },
    ],
};

const logistica18: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    {
      name: 'Gonçalo Meireles',
      image: goncaloMeireles,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/gon%C3%A7alo-meireles-224230116/',
    },
  ],
  members: [
    {
      name: 'Diogo Almeida',
      image: diogoAlmeida,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Diogo Martins',
      image: diogoMartins,
      role: 'Responsável Som',
      linkedin: '',
    },
    {
      name: 'Inês Castel-branco',
      image: inesCastelbranco,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Tiago Alves',
      image: tiagoAlves,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Tiago Fernandes',
      image: tiagoFernandes,
      role: 'Responsável Streaming',
      linkedin: '',
    },
  ],
};

const suporteInformatico18: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [],
  members: [
    {
      name: 'Filipe Correia',
      image: filipeCorreia,
      role: 'Front-End Dev.',
      linkedin: '',
    },
    {
      name: 'Luís Filipe',
      image: luisFilipe,
      role: 'Prod. Cont. Audiovisual',
      linkedin: '',
    },
  ],
};



export {
  coordenacao18,
  logistica18,
  marketing18,
  relacoesExternas18,
  suporteInformatico18,
}
