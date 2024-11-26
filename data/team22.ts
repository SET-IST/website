//  Components

// Coordenacao
import carolinaFerreira from "@/assets/team/2022/Carolina Ferreira.webp";
import helenaTeixeira from "@/assets/team/2022/Helena Teixeira.webp";
import ricardoSimoes from "@/assets/team/2022/Ricardo Simões.webp";

// Marketing
import madalenaBarbeitos from "@/assets/team/2022/Madalena Barbeitos.webp";
import franciscaMartins from "@/assets/team/2022/Francisca Martins.webp";
import franciscoGoncalves from "@/assets/team/2022/Francisco Gonçalves.webp";
import guilhermeBrazSilva from "@/assets/team/2022/Guilherme Silva.webp";
import joaoDomingos from "@/assets/team/2022/João Domingos.webp";
import carmoCordeiro from "@/assets/team/2022/Carmo Cordeiro.webp";
import mariaCabeleiraJesus from "@/assets/team/2022/Maria Cabeleira Jesus.webp";
import matildePinheiro from "@/assets/team/2022/Matilde Pinheiro.webp";
import ricardoCarvalho from "@/assets/team/2022/Ricardo Carvalho.webp";

// Design
import luisDias from "@/assets/team/2022/Luis Dias.webp";

// Relações Externas
import mariaTeresaMadeira from "@/assets/team/2022/Maria Teresa Madeira.webp";
import alexandreBento from "@/assets/team/2022/Alexandre Bento.webp";
import anaOliveira from "@/assets/team/2022/Ana Oliveira.webp";
import filipaBraz from "@/assets/team/2022/Filipa Braz.webp";
import franciscoPedro from "@/assets/team/2022/Francisco Pedro.webp";
import isabelPires from "@/assets/team/2022/Isabel Pires.webp";
import joseCosta from "@/assets/team/2022/José Costa.webp";
import manuelCandeias from "@/assets/team/2022/Manuel Candeias.webp";
import martimAbreu from "@/assets/team/2022/Martim Abreu.webp";
import pedroDeOliveiraTeixeira from "@/assets/team/2022/Pedro Teixeira.webp";
import ricardoPinto from "@/assets/team/2022/Ricardo Pinto.webp";
import tiagoDelgado from "@/assets/team/2022/Tiago Delgado.webp";

// Logistica
import joaoLobato from "@/assets/team/2022/João Lobato.webp";
import beatrizAlves from "@/assets/team/2022/Beatriz Alves.webp";
import bernardoOrmonde from "@/assets/team/2022/Bernardo Ormonde.webp";
import bernardoPinto from "@/assets/team/2022/Bernardo Pinto.webp";
import constancaFlorindo from "@/assets/team/2022/Constança Florindo.webp";
import contancaPrimor from "@/assets/team/2022/Constança Primor.webp";
import fabioSoares from "@/assets/team/2022/Fábio Soares.webp";
import inesCardeira from "@/assets/team/2022/Inês Cardeira.webp";
import joaoBayeux from "@/assets/team/2022/João Bayeux.webp";
import joaoBugalho from "@/assets/team/2022/João Bugalho.webp";
import joseAfonsoGarcia from "@/assets/team/2022/José Afonso Garcia.webp";
import leonorMira from "@/assets/team/2022/Leonor Mira.webp";
import liaNeves from "@/assets/team/2022/Lia Neves.webp";
import mariaCarolinaPessoa from "@/assets/team/2022/Maria Carolina Pessoa.webp";
import mariaMoura from "@/assets/team/2022/Maria Moura.webp";
import marianaFarinha from "@/assets/team/2022/Mariana Farinha.webp";
import martaAugusto from "@/assets/team/2022/Marta Augusto.webp";

// Suporte Informático
import franciscoSilva from "@/assets/team/2022/Francisco Silva.webp";
import samuelBarata from "@/assets/team/2022/Samuel Barata.webp";

import type { IDepartment } from './team'

const coordenacao22: IDepartment = {
  name: 'Coordenação',
  slug: 'coordenacao',
  coordinators: [
    {
      name: 'Carolina Ferreira',
      image: carolinaFerreira,
      role: 'Co-coordenadora',
      linkedin: '',
    },
    {
      name: 'Ricardo Simões',
      image: ricardoSimoes,
      role: 'Co-coordenador',
      linkedin: 'https://www.linkedin.com/in/ricardo-simoes00/',
    },
    {
      name: 'Helena Teixeira',
      image: helenaTeixeira,
      role: 'Co-coordenadora',
      linkedin: 'https://www.linkedin.com/in/helenateixeira-info/',
    },
  ],
  members: [],
};

const relacoesExternas22: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    {
      name: 'Maria Teresa Madeira',
      image: mariaTeresaMadeira,
      role: 'Coordenadora',
      linkedin: '',
    },
  ],
  members: [
    {
      name: 'Alexandre Bento',
      image: alexandreBento,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/alexandre-esteves-bento-351946216',
    },
    {
      name: 'Ana Oliveira',
      image: anaOliveira,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/anaclloliveira',
    },
    {
      name: 'Filipa Braz',
      image: filipaBraz,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/filipa-braz/',
    },
    {
      name: 'Francisco Pedro',
      image: franciscoPedro,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/francisco-pedro-a27a99201/',
    },
    {
      name: 'Isabel Pires',
      image: isabelPires,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'José Costa',
      image: joseCosta,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Manuel Candeias',
      image: manuelCandeias,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/manuel-candeias-b1a017224',
    },
    {
      name: 'Martim Abreu',
      image: martimAbreu,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/martim-abreu-4b8a29225',
    },
    {
      name: 'Pedro de Oliveira Teixeira',
      image: pedroDeOliveiraTeixeira,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/pedro-de-oliveira-teixeira-656ba5223/',
    },
    {
      name: 'Ricardo Pinto',
      image: ricardoPinto,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Tiago Delgado',
      image: tiagoDelgado,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/tiago-delgado-775535223',
    },
  ],
};

const marketing22: IDepartment = {
  name: 'Marketing',
  slug: 'marketing',
  coordinators: [
    {
      name: 'Madalena Barbeitos',
      image: madalenaBarbeitos,
      role: 'Coordenadora',
      linkedin: 'https://www.linkedin.com/in/maria-madalena-barbeitos-a17b28116/',
    },
  ],
  members: [
    {
      name: 'Francisca Martins',
      image: franciscaMartins,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/francisca-ferreira-martins-5254a1221',
    },
    {
      name: 'Francisco Gonçalves',
      image: franciscoGoncalves,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/francisco-gon%C3%A7alves-0a59a2224/',
    },
    {
      name: 'Guilherme Braz Silva',
      image: guilhermeBrazSilva,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/guilherme-braz-silva-2a7839204/',
    },
    {
      name: 'João Domingos',
      image: joaoDomingos,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-domingos-a199161a3/',
    },
    {
      name: 'Carmo Cordeiro',
      image: carmoCordeiro,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Maria Cabeleira Jesus',
      image: mariaCabeleiraJesus,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/maria-jesus-2ab882222',
    },
    {
      name: 'Matilde Pinheiro',
      image: matildePinheiro,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/matildepinheiro/',
    },
    {
      name: 'Ricardo Carvalho',
      image: ricardoCarvalho,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Luis Dias',
      image: luisDias,
      role: 'Colaborador',
      linkedin: '',
    },
  ],
};

const logistica22: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    {
      name: 'João Lobato',
      image: joaoLobato,
      role: 'Coordenador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-lobato-57b9401a3/',
    },
  ],
  members: [
    {
      name: 'Beatriz Alves',
      image: beatrizAlves,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Bernardo Ormonde',
      image: bernardoOrmonde,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/bernardo-ormonde-3973171b8',
    },
    {
      name: 'Bernardo Pinto',
      image: bernardoPinto,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/bernardo-pinto/',
    },
    {
      name: 'Constança Florindo',
      image: constancaFlorindo,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Constança Primor',
      image: contancaPrimor,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Fábio Soares',
      image: fabioSoares,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'Inês Cardeira',
      image: inesCardeira,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/inesmcardeira',
    },
    {
      name: 'João Bayeux',
      image: joaoBayeux,
      role: 'Colaborador',
      linkedin: '',
    },
    {
      name: 'João Bugalho',
      image: joaoBugalho,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-bugalho-4a7790222',
    },
    {
      name: 'José Afonso Garcia',
      image: joseAfonsoGarcia,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/joseafonsogarcia',
    },
    {
      name: 'Leonor Mira',
      image: leonorMira,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Lia Neves',
      image: liaNeves,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Maria Carolina Pessoa',
      image: mariaCarolinaPessoa,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/mariacarolinapessoa/',
    },
    {
      name: 'Maria Moura',
      image: mariaMoura,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Mariana Farinha',
      image: marianaFarinha,
      role: 'Colaboradora',
      linkedin: '',
    },
    {
      name: 'Marta Augusto',
      image: martaAugusto,
      role: 'Colaboradora',
      linkedin: 'https://www.linkedin.com/in/martaclaugusto',
    },
  ],
};

const suporteInformatico22: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [],
  members: [
    {
      name: 'Francisco Silva',
      image: franciscoSilva,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/francisco-ribeiro-e-silva-144b511a9/',
    },
    {
      name: 'Samuel Barata',
      image: samuelBarata,
      role: 'Colaborador',
      linkedin: 'https://www.linkedin.com/in/samuel-barata/',
    },
  ],
};



export {
  coordenacao22,
  logistica22,
  marketing22,
  relacoesExternas22,
  suporteInformatico22,
}
