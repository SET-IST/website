//  Components
//import carolinaFerreira from "@/assets/team/2022/Carolina Ferreira.webp";
// Coordenacao

import franciscaFerreira from '@/assets/team/2021/franciscaFerreira.webp';
import joanaDrago from '@/assets/team/2021/joanaDrago.webp';
import miguelOliveira from '@/assets/team/2021/miguelOliveira.webp';

// Marketing
import helenaTeixeira from '@/assets/team/2021/helenaTeixeira.webp';
import anaMadalenaPaiva from '@/assets/team/2021/anaPaiva.webp';
import diogoVala from '@/assets/team/2021/diogoVala.webp';
import ceciliaPinto from '@/assets/team/2021/ceciliaPinto.webp';
import franciscaAlmeida from '@/assets/team/2021/franciscaAlmeida.webp';
import franciscoMonteiro from '@/assets/team/2021/franciscoMonteiro.webp';
import joaoDomingos from '@/assets/team/2021/joaoDomingos.webp';
import mariaCarneiro from '@/assets/team/2021/mariaCarneiro.webp';
import madalenaBarbeitos from '@/assets/team/2021/madalenaBarbeitos.webp';
import pauloSilva from '@/assets/team/2021/pauloSilva.webp';
import ricardoSimoes from '@/assets/team/2021/ricardoSimoes.webp';
import constancaRomao from '@/assets/team/2021/constancaRomao.webp';
import constancaReis from '@/assets/team/2021/constancaReis.webp';
import joanaLobo from '@/assets/team/2021/joanaLobo.webp';
import vascoSimoes from '@/assets/team/2021/vascoSimoes.webp';

// Relações Externas
import martaTeixeira from '@/assets/team/2021/martaTeixeira.webp';
import afonsoCarapeto from '@/assets/team/2021/afonsoCarapeto.webp';
import aliceOliveiradeSousa from '@/assets/team/2021/aliceSousa.webp';
import antonioMangueira from '@/assets/team/2021/antonioMangueira.webp';
import carolinaFerreira from '@/assets/team/2021/carolinaFerreira.webp';
import davidPinto from '@/assets/team/2021/davidPinto.webp';
import franciscaMagalhaes from '@/assets/team/2021/franciscaMagalhaes.webp';
import leonorMorgado from '@/assets/team/2021/leonorMorgado.webp';
import margaridaAbreu from '@/assets/team/2021/margaridaAbreu.webp';
import mariaCarolinaPessoa from '@/assets/team/2021/mariaPessoa.webp';
import franciscaReynoldsdeSousa from '@/assets/team/2021/franciscaReynolds.webp';
import joanaFigueira from '@/assets/team/2021/mariaJoanaFigueira.webp';
import mariaTeresaMadeira from '@/assets/team/2021/mariaTeresaMadeira.webp';
import marianaMelloeCastro from '@/assets/team/2021/marianaMelloCastro.webp';
import marianaBeiraoRodrigues from '@/assets/team/2021/marianaRodrigues.webp';
import marianaGarcia from '@/assets/team/2021/marianaGarcia.webp';
import marianaPaixao from '@/assets/team/2021/marianaPaixao.webp';
import miguelGoncalvesEic from '@/assets/team/2021/miguelGoncalvesLeic.webp';
import ritaBarreiros from '@/assets/team/2021/ritaBarreiros.webp';
import rosaCalheiros from '@/assets/team/2021/rosaMenezes.webp';

// Logistica
import alexandreMartins from '@/assets/team/2021/alexandreMartins.webp';
import danielSerrano from '@/assets/team/2021/danielSerrano.webp';
import diogoMartins from '@/assets/team/2021/diogoMartins.webp';
import filipaBraz from '@/assets/team/2021/filipaSilva.webp';
import joanaCarvalho from '@/assets/team/2021/joanaCarvalho.webp';
import joanaAlves from '@/assets/team/2021/joanaAlves.webp';
import joaoLobato from '@/assets/team/2021/joaoLobato.webp';
import juliaBarata from '@/assets/team/2021/juliaBarata.webp';
import leilaLemos from '@/assets/team/2021/leilaLemos.webp';
import leonorMourinha from '@/assets/team/2021/leonorMourinha.webp';
import mafaldaAbreu from '@/assets/team/2021/mafaldaAbreu.webp';
import mariaInesTavares from '@/assets/team/2021/inesTavares.webp';
import mariaInesBivarProa from '@/assets/team/2021/mariaProa.webp';
import mariaTeresaMagina from '@/assets/team/2021/teresaMagina.webp';
import tiagoLeitao from '@/assets/team/2021/tiagoLeitao.webp';

// Suporte Informático
import eduardoNoronha from '@/assets/team/2021/eduardoNoronha.webp';
import guilhermeCandido from '@/assets/team/2021/guilhermeCandido.webp';
import henriqueCandeias from '@/assets/team/2021/henriqueCandeias.webp';
import miguelGoncalvesEti from '@/assets/team/2021/miguelGoncalvesLeti.webp';
import samuelBarata from '@/assets/team/2021/samuelBarata.webp';
import vasylLanko from '@/assets/team/2021/maksymLanko.webp';



import type { IDepartment } from './team'

const coordenacao21: IDepartment = {
  name: 'Coordenação',
  slug: 'coordenacao',
  coordinators: [
    {
      name: 'Francisca Ferreira',
      image: franciscaFerreira,
      role: 'Co-coordenadora',
      linkedin: 'https://www.linkedin.com/in/francisca-ferreira-2835371b6/',
    },
    {
      name: 'Joana Drago',
      image: joanaDrago,
      role: 'Co-coordenadora',
      linkedin: 'https://www.linkedin.com/in/joana-drago-mitzlaff-a64646194/',
    },
    {
      name: 'Miguel Oliveira',
      image: miguelOliveira,
      role: 'Co-coordenador',
      linkedin: 'https://www.linkedin.com/in/miguelrmoliveira/',
    },
  ],
  members: [],
};

const relacoesExternas21: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    {
      name: 'Marta Teixeira',
      image: martaTeixeira,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/marta-teixeira-512a59178/',
    },
  ],
  members: [
    {
      name: 'Afonso Carapeto',
      image: afonsoCarapeto,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/afonso-carapeto-6b8a821a3',
    },
    {
      name: 'Alice Oliveira de Sousa',
      image: aliceOliveiradeSousa,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'António Mangueira',
      image: antonioMangueira,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/ant%C3%B3nio-manuel-serr%C3%A3o-mangueira-882165195/',
    },
    {
      name: 'Carolina Ferreira',
      image: carolinaFerreira,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'David Pinto',
      image: davidPinto,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/david-pinto-997660179/'
    },
    {
      name: 'Francisca Magalhães',
      image: franciscaMagalhaes,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/francisca-magalh%C3%A3es-86b4361b9/'
    },
    {
      name: 'Leonor Morgado',
      image: leonorMorgado,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/leonor-morgado-a8b7b2195/'
    },
    {
      name: 'Margarida Abreu',
      image: margaridaAbreu,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/margarida-abreu-0282241a3/'
    },
    {
      name: 'Maria Carolina Pessoa',
      image: mariaCarolinaPessoa,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/mariacarolinapessoa'
    },
    {
      name: 'Francisca Reynolds de Sousa',
      image: franciscaReynoldsdeSousa,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Joana Figueira',
      image: joanaFigueira,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Maria Teresa Madeira',
      image: mariaTeresaMadeira,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Mariana Mello e Castro',
      image: marianaMelloeCastro,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Mariana Beirão Rodrigues',
      image: marianaBeiraoRodrigues,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/mariana-beir%C3%A3o-rodrigues-2a489b198/'
    },
    {
      name: 'Mariana Garcia',
      image: marianaGarcia,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/marianacolacogarcia/'
    },
    {
      name: 'Mariana Paixão',
      image: marianaPaixao,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Miguel Gonçalves',
      image: miguelGoncalvesEic,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/miguel-gon%C3%A7alves-3912101a0/'
    },
    {
      name: 'Rita Barreiros',
      image: ritaBarreiros,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Rosa Calheiros',
      image: rosaCalheiros,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/rosa-calheiros-e-menezes-4abb041a3/'
    }
  ],
};

const marketing21: IDepartment = {
  name: 'Marketing',
  slug: 'marketing',
  coordinators: [
    {
      name: 'Helena Teixeira',
      image: helenaTeixeira,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/helena-teixeira-1406a3186/',
    },
  ],
  members: [
    {
      name: 'Ana Madalena Paiva',
      image: anaMadalenaPaiva,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/ana-madalena-paiva/',
    },
    {
      name: 'Diogo Vala',
      image: diogoVala,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Cecília Pinto',
      image: ceciliaPinto,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/cec%C3%ADlia-pinto-a2a03b1a4/',
    },
    {
      name: 'Francisca Almeida',
      image: franciscaAlmeida,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/francisca-almeida-3173311a4'
    },
    {
      name: 'Francisco Monteiro',
      image: franciscoMonteiro,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/francisco-monteiro-62a28314a'
    },
    {
      name: 'João Domingos',
      image: joaoDomingos,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-domingos-a199161a3/'
    },
    {
      name: 'Maria Carneiro',
      image: mariaCarneiro,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Madalena Barbeitos',
      image: madalenaBarbeitos,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/maria-madalena-barbeitos-a17b28116/'
    },
    {
      name: 'Paulo Silva',
      image: pauloSilva,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/paulosilva2000'
    },
    {
      name: 'Ricardo Simões',
      image: ricardoSimoes,
      role: 'Colaborador',
      linkedin: 'www.linkedin.com/in/ricardo-simoes00'
    },
    {
      name: 'Constança Romão',
      image: constancaRomao,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Constança Reis',
      image: constancaReis,
      role: 'Colaboradora',
      linkedin: 'https://linkedin.com/in/constanca-reis097'
    },
    {
      name: 'Joana Lobo',
      image: joanaLobo,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Vasco Simões',
      image: vascoSimoes,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/vasco-gabriel-sim%C3%B5es/'
    }
  ],
};

const logistica21: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    {
      name: 'Alexandre Martins',
      image: alexandreMartins,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/alexandre-martins-17012000/',
    },
  ],
  members: [
    {
      name: 'Daniel Serrano',
      image: danielSerrano,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/daniel-g-serrano/',
    },
    {
      name: 'Diogo Martins',
      image: diogoMartins,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/diogo-martins-a1b653138/',
    },
    {
      name: 'Filipa Braz',
      image: filipaBraz,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/filipa-braz/',
    },
    {
      name: 'Joana Carvalho',
      image: joanaCarvalho,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/joana-carvalho-69a7b817b'
    },
    {
      name: 'Joana Alves',
      image: joanaAlves,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/joana-lemos-alves/'
    },
    {
      name: 'João Lobato',
      image: joaoLobato,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-lobato-57b9401a3/'
    },
    {
      name: 'Júlia Barata',
      image: juliaBarata,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/julia-sofia/'
    },
    {
      name: 'Leila Lemos',
      image: leilaLemos,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/leila-lemos-5535071a3/'
    },
    {
      name: 'Leonor Mourinha',
      image: leonorMourinha,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Mafalda Abreu',
      image: mafaldaAbreu,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/mafalda-abreu-92073b198/'
    },
    {
      name: 'Maria Inês Tavares',
      image: mariaInesTavares,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/maria-in%C3%AAs-tavares-5144601a4/'
    },
    {
      name: 'Maria Inês Bivar Prôa',
      image: mariaInesBivarProa,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Maria Teresa Magina',
      image: mariaTeresaMagina,
      role: 'Colaboradora',
      linkedin: 'https://pt.linkedin.com/in/mariateresamagina'
    },
    {
      name: 'Tiago Leitão',
      image: tiagoLeitao,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/tiago-leit%C3%A3o-engineer/'
    }
  ],
};

const suporteInformatico21: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [],
  members: [
    {
      name: 'Eduardo Noronha',
      image: eduardoNoronha,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/eduardo-noronha-878704143/',
    },
    {
      name: 'Guilherme Cândido',
      image: guilhermeCandido,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/guilherme-c%C3%A2ndido-1301911a3/',
    },
    {
      name: 'Henrique Candeias',
      image: henriqueCandeias,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/henrique-candeias-764467195',
    },
    {
      name: 'Miguel Gonçalves',
      image: miguelGoncalvesEti,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/miguel-gon%C3%A7alves-a78b78185/'
    },
    {
      name: 'Samuel Barata',
      image: samuelBarata,
      role: 'Colaborador',
      linkedin: ''
    },
    {
      name: 'Vasyl Lanko',
      image: vasylLanko,
      role: 'Colaborador',
      linkedin: ''
   }
  ],
};



export {
  coordenacao21,
  logistica21,
  marketing21,
  relacoesExternas21,
  suporteInformatico21,
}
