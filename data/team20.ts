//  Components

// Coordenacao
import tiagoFernandes from '@/assets/team/2020/TiagoFernandes.webp'
import diogoAlmeida from '@/assets/team/2020/DiogoAlmeida.webp';
import miguelOliveira from '@/assets/team/2020/MiguelOliveira.webp'

// Relações Externas
import inesFialho from '@/assets/team/2020/inesfialho.webp';
import fabioSousa from '@/assets/team/2020/FabioSousa.webp';
import saraMachado from '@/assets/team/2020/SaraMachado.webp';
import joaoLopes from '@/assets/team/2020/JoaoLopes.webp';
import joanaMitzlaff from '@/assets/team/2020/JoanaDragoMitzlaff.webp';
import alexandreMartins from '@/assets/team/2020/AlexandreMartins.webp';
import miguelSilveira from '@/assets/team/2020/MiguelSilveira.webp';
import inesAlves from '@/assets/team/2020/InesAlves.webp';
import veraSilva from '@/assets/team/2020/VeraSilva.webp';
import antonioMangueira from '@/assets/team/2020/AntonioMangueira.webp';
import tiagoSoares from '@/assets/team/2020/TiagoSoares.webp';
import martaTeixeira from '@/assets/team/2020/MartaTeixeira.webp';
import davidPinto from '@/assets/team/2020/DavidPinto.webp';
import miguelSimoes from '@/assets/team/2020/MiguelSimoes.webp';
import miguelGonçalves from '@/assets/team/2020/MiguelGoncalves.webp';
import andreMarques from '@/assets/team/2020/AndreMarques.webp';

// Marketing
import danielaMendes from '@/assets/team/2020/danielamendes.webp';
import marianaGarcia from '@/assets/team/2020/MarianaGarcia.webp';
import vascoFigueroa from '@/assets/team/2020/VascoFigueroa.webp';
import leonorMorgado from '@/assets/team/2020/LeonorMorgado.webp';
import helenaTeixeira from '@/assets/team/2020/HelenaTeixeira.webp';
import leilaLemos from '@/assets/team/2020/LeilaLemos.webp';
import filipaSilva from '@/assets/team/2020/FilipaSilva.webp';
import mafaldaAbreu from '@/assets/team/2020/MafaldaAbreu.webp';
import joanaAlves from '@/assets/team/2020/JoanaAlves.webp';
import margaridaAbreu from '@/assets/team/2020/MargaridaAbreu.webp';

// Logistica
import pedroRocha from '@/assets/team/2020/pedrorocha.webp';
import diogoMartins from '@/assets/team/2020/DiogoMartins.webp';
import joanaCarvalho from '@/assets/team/2020/JoanaCarvalho.webp';
import helderDuarte from '@/assets/team/2020/HelderDuarte.webp';
import joaoLobato from '@/assets/team/2020/JoaoLobato.webp';
import gonçaloMeireles from '@/assets/team/2020/GoncaloMeireles.webp';
import silviaAlmeida from '@/assets/team/2020/SilviaAlmeida.webp';
import vivianaBernardo from '@/assets/team/2020/VivianaBernardo.webp';
import henriqueCandeias from '@/assets/team/2020/HenriqueCandeias.webp';
import bernardoRaimundo from '@/assets/team/2020/BernardoRaimundo.webp';

// Suporte Informático
import joseBras from '@/assets/team/2020/JoseBras.webp';
import afonsoSousa from '@/assets/team/2020/AfonsoVarandasdeSousa.webp';
import luisTonicha from '@/assets/team/2020/LuisTonicha.webp';
import vascoPires from '@/assets/team/2020/VascoPires.webp';
import vascoSimoes from '@/assets/team/2020/VascoSimoes.webp';



import type { IDepartment } from './team'

const coordenacao20: IDepartment = {
  name: 'Coordenação',
  slug: 'coordenacao',
  coordinators: [
    {
        name: 'Tiago Fernandes',
        image: tiagoFernandes,
        role: 'Co-Coordenador Operacional',
        linkedin:'https://www.linkedin.com/in/tigasfer/',
    },
    {
        name: 'Diogo Almeida',
        image: diogoAlmeida,
        role: 'Co-Coordenador Operacional',
        linkedin:'https://www.linkedin.com/in/diogobrandaoalmeida/',
    },
    {
        name: 'Miguel Oliveira',
        image: miguelOliveira,
        role: 'Coordenador Financeiro',
        linkedin:'https://www.linkedin.com/in/miguelrmoliveira/',
    }
  ],
  members: [],
};

const relacoesExternas20: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    {
      name: 'Inês Fialho',
      image: inesFialho,
      role: 'Coordenadora',
      linkedin:'https://www.linkedin.com/in/in%C3%AAs-sousa-fialho-4b332513b/'
    },
  ],
  members: [
    {
      name: 'Fábio Sousa',
      image: fabioSousa,
      role: 'Colaborador',
      linkedin:'',
    },
    {
      name: 'Sara Machado',
      image: saraMachado,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'João Lopes',
      image: joaoLopes,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/joão-lopes-54a800189/'
    },
    {
      name: 'Joana Drago Mitzlaff',
      image: joanaMitzlaff,
      role: 'Colaboradora',
      linkedin:'https://www.linkedin.com/in/joana-drago-mitzlaff-a64646194/',
    },
    {
      name: 'Alexandre Martins',
      image: alexandreMartins,
      role: 'Colaborador',
      linkedin:'http://linkedin.com/in/alexandre-martins-b05a97196/',
    },
    {
      name: 'Miguel Silveira',
      image: miguelSilveira,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/migueladsilveira/'
    },
    {
      name: 'Inês Alves',
      image: inesAlves,
      role: 'Colaboradora',
      linkedin:'https://www.linkedin.com/in/inês-alves-06aa6a183/'
    },
    {
      name: 'Vera Silva',
      image: veraSilva,
      role: 'Colaboradora',
      linkedin:'https://www.linkedin.com/in/vera-silvaa32'
    },
    {
      name: 'António Mangueira',
      image: antonioMangueira,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/ant%C3%B3nio-manuel-serr%C3%A3o-mangueira-882165195/'
    },
    {
      name: 'Tiago Soares',
      image: tiagoSoares,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/tiago-miguel-soares/'
    },
    {
      name: 'Marta Teixeira',
      image: martaTeixeira,
      role: 'Colaboradora',
      linkedin:'https://linkedin.com/in/marta-teixeira-512a59178'
    },
    {
      name: 'David Pinto',
      image: davidPinto,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/david-pinto-997660179/'
    },
    {
      name: 'Miguel Santos Simões',
      image: miguelSimoes,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/miguelssimoes/'
    },
    {
      name: 'Miguel Gonçalves',
      image: miguelGonçalves,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/miguel-gon%C3%A7alves-a78b78185/'
    },
    {
      name: 'André Marques',
      image: andreMarques,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/andré-marques-951584161'
    } 
  ],
};

const marketing20: IDepartment = {
  name: 'Marketing',
  slug: 'marketing',
  coordinators: [
    {
      name: 'Daniela Mendes',
      image: danielaMendes,
      role: 'Coordenadora',
      linkedin:'http://linkedin.com/in/daniela-mendes-656906153'
    },
  ],
  members: [
    {
      name: 'Mariana Garcia',
      image: marianaGarcia,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Vasco Figueroa',
      image: vascoFigueroa,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/vasco-figueiroa/'
    },
    {
      name: 'Leonor Morgado',
      image: leonorMorgado,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Helena Teixeira',
      image: helenaTeixeira,
      role: 'Colaboradora',
      linkedin:'https://www.linkedin.com/in/sarasofiasantos/',
    },
    {
      name: 'Leila Lemos',
      image: leilaLemos,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Filipa Silva',
      image: filipaSilva,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Mafalda Abreu',
      image: mafaldaAbreu,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Joana Alves',
      image: joanaAlves,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Margarida Abreu',
      image: margaridaAbreu,
      role: 'Colaboradora',
      linkedin:'',
    },
  ],
};

const logistica20: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    {
      name: 'Pedro Rocha',
      image: pedroRocha,
      role: 'Coordenador',
      linkedin:'https://www.linkedin.com/in/pedro-rocha-502166126',
    },
  ],
  members: [
    {
      name: 'Diogo Martins',
      image: diogoMartins,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/diogo-martins-a1b653138',
    },
    {
      name: 'Joana Carvalho',
      image: joanaCarvalho,
      role: 'Colaboradora',
      linkedin:'https://www.linkedin.com/in/joana-carvalho-69a7b817b/',
    },
    {
      name: 'Hélder Duarte',
      image: helderDuarte,
      role: 'Colaborador',
      linkedin:'',
    },
    {
      name: 'João Lobato',
      image: joaoLobato,
      role: 'Colaborador',
      linkedin:'',
    },
    {
      name: 'Gonçalo Meireles',
      image: gonçaloMeireles,
      role: 'Colaborador',
      linkedin:'http://www.linkedin.com/in/gonçalo-meireles-224230116/',
    },
    {
      name: 'Sílvia Almeida',
      image: silviaAlmeida,
      role: 'Colaboradora',
      linkedin:'https://www.linkedin.com/in/s%C3%ADlvia-urmal-de-almeida-6b2813184/',
    },
    {
      name: 'Viviana Bernardo',
      image: vivianaBernardo,
      role: 'Colaboradora',
      linkedin:'',
    },
    {
      name: 'Henrique Candeias',
      image: henriqueCandeias,
      role: 'Colaborador',
      linkedin:'',
    },
    {
      name: 'Bernardo Raimundo',
      image: bernardoRaimundo,
      role: 'Colaborador',
      linkedin:'',
    }
  ],
};

const suporteInformatico20: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [],
  members: [
    {
      name: 'José Brás',
      image: joseBras,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/jos%C3%A9-br%C3%A1s-73777a163/',
    },
    {
      name: 'Afonso Varandas de Sousa',
      image: afonsoSousa,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/afonsovarandas/',
    },
    {
      name: 'Luís Tonicha',
      image: luisTonicha,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/lu%C3%ADs-tonicha-a07465160/',
    },
    {
      name: 'Vasco Pires',
      image: vascoPires,
      role: 'Colaborador',
      linkedin:'https://www.linkedin.com/in/vascocfpires/',
    },
    {
      name: 'Vasco Simões',
      image: vascoSimoes,
      role: 'Colaborador',
      linkedin:'',
    },
  ],
};



export {
  coordenacao20,
  logistica20,
  marketing20,
  relacoesExternas20,
  suporteInformatico20,
}
