// Coordenação
import marianaPatrao from '@/assets/team/2017/Mariana Patrao Coor.webp';
import diogoDores from '@/assets/team/2017/diogodores.webp';
import joaoOliveira from '@/assets/team/2017/Joao Oliveira Coor.webp';

// Suporte Informático
import rubenMartins from '@/assets/team/2017/Ruben Martins Suporte.webp';
import luisFilipe from '@/assets/team/2017/Luis Filipe Suporte.webp';
import tiagoMartins from '@/assets/team/2017/Tiago Martins_Suporte.webp';
import filipeCorreia from '@/assets/team/2017/filipespinformatico.webp';

// Relações Externas
import pedroAngelico from '@/assets/team/2017/Angelico.webp';
import mariaRicarte from '@/assets/team/2017/Maria Ricarte RE.webp';
import pedroRocha from '@/assets/team/2017/Pedro Rocha RE.webp';
import joelDamasio from '@/assets/team/2017/Joel Damasio RE.webp';
import nelsonCavaco from '@/assets/team/2017/Nelson Cavaco RE.webp';
import pedroPina from '@/assets/team/2017/Pedro_Pina_RE.webp';
import ricardoOliveira from '@/assets/team/2017/Ricardo Oliveira RE.webp';
import carolinaSantos from '@/assets/team/2017/Carolina Santos RE.webp';
import claudiaDias from '@/assets/team/2017/Claudia Sofia_RE.webp';
import joseSousa from '@/assets/team/2017/Jose diogo RE.webp';
import anaSilvestre from '@/assets/team/2017/Margarida_Silvestre_RE.webp';
import tiagoSereno from '@/assets/team/2017/Tiago Sereno RE.webp';
import joaoBarbosa from '@/assets/team/2017/Joao Barbosa RE.webp';
import danielAfonso from '@/assets/team/2017/Daniel Afoso RE.webp';
import joseAfonso from '@/assets/team/2017/Jose Afonso RE.webp';
import danielaTinoco from '@/assets/team/2017/Daniela_Tinoco_RE.webp';
import catarinaBelem from '@/assets/team/2017/CatarinaBelem.webp';

// Marketing
import martaBorges from '@/assets/team/2017/Marta Borges Chefe Markting.webp';
import carinaFonseca from '@/assets/team/2017/CarinaMarketing.webp';
import joanaChumbo from '@/assets/team/2017/Joana Chumbo_Markting.webp';
import joaoTeixeira from '@/assets/team/2017/Joao Teixeira_Markting.webp';
import leticiaRodrigues from '@/assets/team/2017/Leticia_Rodrigues_Markting.webp';
import joaoVieira from '@/assets/team/2017/Joao_Vieira_Marketing.webp';
import filipaRocha from '@/assets/team/2017/Filipa_Rocha_Markting.webp';

// Logistica
import reginaManuelito from '@/assets/team/2017/Regina Manuelito Chefe Logistica.webp';
import henriqueSantos from '@/assets/team/2017/Henrique_Santos_Logistica.webp';
import tiagoAlves from '@/assets/team/2017/Tiago Alves Logistica.webp';
import saraSantos from '@/assets/team/2017/Sara_Santos_Logistica.webp';
import goncaloMeireles from '@/assets/team/2017/Goncalo Meireles Logistica.webp';
import quevinJagmohandas from '@/assets/team/2017/Quevin Udai_RE.webp';
import pedroSilva from '@/assets/team/2017/Pedro_Silva_Logistica.webp';
import helderDuarte from '@/assets/team/2017/Helder_Duarte_Logistica.webp';
import joaoFreire from '@/assets/team/2017/Joao Freire Logistica.webp';
import joaoPinto from '@/assets/team/2017/Joao Pinto Logistica.webp';
import bernardoRato from '@/assets/team/2017/BernardoRato.webp';

// Event Supporter
import joaoValado from '@/assets/team/2017/valado.webp';
import sebastiaoBorges from '@/assets/team/2017/Sebastiao Beirao Event Supporter.webp';

import type { IDepartment } from './team'

const coordenacao17: IDepartment = {
  name: 'Coordenação',
  slug: 'coordenacao',
  coordinators: [
    {
      name: 'Mariana Patrão',
      image: marianaPatrao,
      role: 'Coordenadora',
      linkedin: 'https://pt.linkedin.com/in/mariana-patrão-291a0910a',
    },
    {
      name: 'Diogo Dores',
      image: diogoDores,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/diogodores/',
    },
    {
      name: 'João Oliveira',
      image: joaoOliveira,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/joliveiraee/',
    },
  ],
  members: [],
};

const suporteInformatico17: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [],
  members: [
    {
      name: 'Rúben Martins',
      image: rubenMartins,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/rubenjpmartins/',
    },
    {
      name: 'Luis Filipe',
      image: luisFilipe,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/lfilipemsantos',
    },
    {
      name: 'Tiago Martins',
      image: tiagoMartins,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/tiagomm',
    },
    {
      name: 'Filipe Correia',
      image: filipeCorreia,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/filipecorreia',
    },
  ],
};

const relacoesExternas17: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [],
  members: [
    {
      name: 'Pedro Angélico',
      image: pedroAngelico,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/pedroangelico',
    },
    {
      name: 'Maria Ricarte',
      image: mariaRicarte,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/maria-ricarte-b50798b2',
    },
    {
      name: 'Pedro Rocha',
      image: pedroRocha,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/pedro-rocha-502166126/',
    },
    {
      name: 'Joel Damásio',
      image: joelDamasio,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/joel-dam%C3%A1sio-58a43a107/',
    },
    {
      name: 'Nelson Cavaco',
      image: nelsonCavaco,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/nelson-cavaco-a2488b12b/?trk=nav_responsive_tab_profile_pic',
    },
    {
      name: 'Pedro Pina',
      image: pedroPina,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/pedro-pina-a0b57787/',
    },
    {
      name: 'Ricardo de Oliveira',
      image: ricardoOliveira,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/ricardomdoliveira',
    },
    {
      name: 'Carolina Santos',
      image: carolinaSantos,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/carolina-santos-7597a512a/',
    },
    {
      name: 'Cláudia Dias',
      image: claudiaDias,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/claudiasofss/',
    },
    {
      name: 'José de Sousa',
      image: joseSousa,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jos%C3%A9-sousa-23141169/?trk=nav_responsive_tab_profile',
    },
    {
      name: 'Ana Margarida Silvestre',
      image: anaSilvestre,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/anamargaridasilvestre/',
    },
    {
      name: 'Tiago Sereno',
      image: tiagoSereno,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/tiagosereno/',
    },
    {
      name: 'João Barbosa',
      image: joaoBarbosa,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jtbarbosa/',
    },
    {
      name: 'Daniel Afonso',
      image: danielAfonso,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/daniel-martins-afonso-178691b7/',
    },
    {
      name: 'José Afonso',
      image: joseAfonso,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jos%C3%A9-afonso-b62018131/?trk=nav_responsive_tab_profile_pic',
    },
    {
      name: 'Daniela Tinoco',
      image: danielaTinoco,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/daniela-tinoco-693765a5/',
    },
    {
      name: 'Catarina Belem',
      image: catarinaBelem,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/catarina-bel%C3%A9m-20a114a8/',
    },
  ],
};

const marketing17: IDepartment = {
  name: 'Marketing',
  slug: 'marketing',
  coordinators: [],
  members: [
    {
      name: 'Marta Borges',
      image: martaBorges,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/anamartaborges/',
    },
    {
      name: 'Carina Fonseca',
      image: carinaFonseca,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/carinanfonseca',
    },
    {
      name: 'Joana Chumbo',
      image: joanaChumbo,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/joana-chumbo-82a183126/',
    },
    {
      name: 'João Teixeira',
      image: joaoTeixeira,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/joaocabralteixeira/',
    },
    {
      name: 'Letícia Rodrigues',
      image: leticiaRodrigues,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/leticiajrodrigues/',
    },
    {
      name: 'João Vieira',
      image: joaoVieira,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-vieira-a59446102/?trk=nav_responsive_tab_profile',
    },
    {
      name: 'Filipa Rocha',
      image: filipaRocha,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/filipa-rocha/',
    },
  ],
};

const logistics17: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [],
  members: [
    {
      name: 'Regina Manuelito',
      image: reginaManuelito,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/reginamanuelito',
    },
    {
      name: 'Henrique Santos',
      image: henriqueSantos,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/hfigueiredosantos/',
    },
    {
      name: 'Tiago Alves',
      image: tiagoAlves,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Sara Santos',
      image: saraSantos,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Gonçalo Meireles',
      image: goncaloMeireles,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Quevin Jagmohandas',
      image: quevinJagmohandas,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/quevinjagmohandas',
    },
    {
      name: 'Pedro Silva',
      image: pedroSilva,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/pmbrs/',
    },
    {
      name: 'Helder Duarte',
      image: helderDuarte,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/helder-duarte-a75212116/',
    },
    {
      name: 'João Freire',
      image: joaoFreire,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'João Pinto',
      image: joaoPinto,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-pinto-005b05111/',
    },
    {
      name: 'Bernardo Rato',
      image: bernardoRato,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/bernardo-rato-97043085/',
    },
  ],
};

const eventSupporter17: IDepartment = {
  name: 'Event Supporter',
  slug: 'event-supporter',
  coordinators: [],
  members: [
    {
      name: 'João Valado',
      image: joaoValado,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jvaladorodrigues/',
    },
    {
      name: 'Sebastião Borges',
      image: sebastiaoBorges,
      role: 'Colaborador',
      linkedin: 'https://www.facebook.com/sebastiao.beirao?fref=ts',
    },
  ],
};

export { 
  coordenacao17, 
  suporteInformatico17, 
  relacoesExternas17, 
  marketing17, 
  logistics17, 
  eventSupporter17 
};
