import type { IDepartment } from './team'
import person from '@/assets/team//avatar.webp';

// Direção
import duarteBarbosa from '@/assets/team/2026/Direcao/Coordenacao_Geral_Duarte_Barbosa.webp';
import gabrielGabriel from '@/assets/team/2026/Direcao/Coordenacao_Geral_Gabriel_Gabriel.webp';
import joanaQueiros from '@/assets/team/2026/Direcao/Coordenacao_Geral_Joana_Queiros.webp';
import saraMarques from '@/assets/team/2026/Direcao/Coordenacao_Geral_Sara_Marques.webp';
import marianaNobrega from '@/assets/team/2026/Direcao/Coordenacao_Financeira_Mariana_Nobrega.webp';
import tomasRosado from '@/assets/team/2026/Direcao/Coordenacao_Financeira_Tomas_Rosado.webp';
import franciscoColaco from '@/assets/team/2026/Direcao/Secretario_Francisco_Colaco.webp';

const direcao26: IDepartment = {
  name: 'Direção',
  slug: 'direção',
  coordinators: [
    { name: 'Duarte Barbosa', image: duarteBarbosa, role: 'Coordenador Geral', linkedin: 'www.linkedin.com/in/duartefbarbosa' },
    { name: 'Gabriel Gabriel', image: gabrielGabriel, role: 'Coordenador Geral', linkedin: 'https://www.linkedin.com/in/gabrieldggabriel/' },
    { name: 'Joana Queirós', image: joanaQueiros, role: 'Coordenadora Geral', linkedin: '' },
    { name: 'Sara Marques', image: saraMarques, role: 'Coordenadora Geral', linkedin: 'https://www.linkedin.com/in/sarapmmarques?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
  ],
  members: [
    { name: 'Marina Nóbrega', image: marianaNobrega, role: 'Tesoureira', linkedin: 'www.linkedin.com/in/marina-mnóbrega' },
    { name: 'Tomás Rosado', image: tomasRosado, role: 'Tesoureiro', linkedin: '' },
    { name: 'Francisco Colaço', image: franciscoColaco, role: 'Secretário', linkedin: 'https://www.linkedin.com/in/franciscocolaco/' },
  ],
}

// Marketing & Design
import marketingAfonsoFigueira from '@/assets/team/2026/Marketing/Marketing_Afonso_Figueira.webp';
import marketingFelipeKoyama from '@/assets/team/2026/Marketing/Marketing_Felipe_Koyama.webp';
import marketingGabrielaNegroni from '@/assets/team/2026/Marketing/Marketing_Gabriela_Negroni.webp';
import marketingGuilhermeRomano from '@/assets/team/2026/Marketing/Marketing_Guilherme_Romano.webp';
import marketingHenriqueCavaco from '@/assets/team/2026/Marketing/Marketing_Henrique_Cavaco.webp';
import marketingHugoYe from '@/assets/team/2026/Marketing/Marketing_Hugo_Ye.webp';
import marketingMadalenaBordadagua from '@/assets/team/2026/Marketing/Marketing_Madalena_Bordadagua.webp';
import marketingMargaridaSimoes from '@/assets/team/2026/Marketing/Marketing_Margarida_Simoes.webp';
import marketingPedroFerreira from '@/assets/team/2026/Marketing/Marketing_Pedro_Ferreira.webp';
import marketingTomasAntao from '@/assets/team/2026/Marketing/Marketing_Tomas_Antao.webp';
import marketingXavierSilva from '@/assets/team/2026/Marketing/Marketing_Xavier_Silva.webp';

const marketingDesign26: IDepartment = {
  name: 'Marketing & Design',
  slug: 'marketing-design',
  coordinators: [
    { name: 'Afonso Figueira', image: marketingAfonsoFigueira, role: 'Coordenador', linkedin: '' },
    { name: 'Madalena Bordadágua', image: marketingMadalenaBordadagua, role: 'Coordenadora', linkedin: '' },
    { name: 'Pedro Ferreira', image: marketingPedroFerreira, role: 'Coordenador', linkedin: 'https://www.linkedin.com/in/pedro-ferreira-368010334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Tomás Antão', image: marketingTomasAntao, role: 'Coordenador', linkedin: '' },
  ],
  members: [
    { name: 'Felipe Koyama', image: marketingFelipeKoyama, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/felipe-koyama-092642395/?skipRedirect=true' },
    { name: 'Gabriela Negroni', image: marketingGabrielaNegroni, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/gabrielayadanegroni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Guilherme Romano', image: marketingGuilhermeRomano, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/guilherme-romano-38796a38b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Henrique Cavaco', image: marketingHenriqueCavaco, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/henrique-cavaco-347797279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Hugo Ye', image: marketingHugoYe, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/hugo-ye-9a1a65338/' },
    { name: 'Margarida Simões', image: marketingMargaridaSimoes, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/margarida-sim%C3%B5es-111367352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Ricardo Formigo', image: person, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/ricardoformigo?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Rodrigo Silva', image: person, role: 'Colaborador', linkedin: '' },
    { name: 'Xavier Silva', image: marketingXavierSilva, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/xaviersilva456' },
  ],
}

// Logística
import logisticaAfonso from '@/assets/team/2026/Logistica/Logistica_Afonso.webp';
import logisticaAfonsoHenriques from '@/assets/team/2026/Logistica/Logistica_Afonso_Henriques.webp';
import logisticaDiogoFevereiro from '@/assets/team/2026/Logistica/Logistica_Diogo_Fevereiro.webp';
import logisticaGabrielaSilva from '@/assets/team/2026/Logistica/Logistica_Gabriela_Silva.webp';
import logisticaKarenPaliche from '@/assets/team/2026/Logistica/Logistica_Karen_Paliche.webp';
import logisticaMadalenaFelix from '@/assets/team/2026/Logistica/Logistica_Madalena_Felix.webp';
import logisticaMargarida from '@/assets/team/2026/Logistica/Logistica_Margarida.webp';
import logisticaMariaCosta from '@/assets/team/2026/Logistica/Logistica_Maria_Costa.webp';
import logisticaMiguelTrepa from '@/assets/team/2026/Logistica/Logistica_Miguel_Trepa.webp';
import logisticaMiguelVieira from '@/assets/team/2026/Logistica/Logistica_Miguel_Vieira.webp';
import logisticaRafael from '@/assets/team/2026/Logistica/Logistica_Rafael.webp';
import logisticaTiagoVideira from '@/assets/team/2026/Logistica/Logistica_Tiago_Videira.webp';
import logisticaZara from '@/assets/team/2026/Logistica/Logistica_Zara.webp';

const logistica26: IDepartment = {
  name: 'Logística',
  slug: 'logistica',
  coordinators: [
    { name: 'Maria Costa', image: logisticaMariaCosta, role: 'Coordenadora', linkedin: 'https://www.linkedin.com/in/maria-lu%C3%ADs-costa-ab5761296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Madalena Félix', image: logisticaMadalenaFelix, role: 'Coordenadora', linkedin: 'www.linkedin.com/in/madalena-félix-912468330' },
    { name: 'Miguel Vieira', image: logisticaMiguelVieira, role: 'Coordenador', linkedin: '' },
  ],
  members: [
    { name: 'Afonso Rocha', image: logisticaAfonso, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/afonso-r0cha' },
    { name: 'Afonso Henriques', image: logisticaAfonsoHenriques, role: 'Colaborador', linkedin: '' },
    { name: 'Diogo Fevereiro', image: logisticaDiogoFevereiro, role: 'Colaborador', linkedin: '' },
    { name: 'Gabriela Silva', image: logisticaGabrielaSilva, role: 'Colaboradora', linkedin: '' },
    { name: 'Margarida Simões', image: logisticaMargarida, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/margarida-sim%C3%B5es-111367352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Miguel Trêpa', image: logisticaMiguelTrepa, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/migueltrepa' },
    { name: 'Karen Paliche', image: logisticaKarenPaliche, role: 'Colaboradora', linkedin: 'http://linkedin.com/in/karen-paliche-953373250' },
    { name: 'Rafael Afonso', image: logisticaRafael, role: 'Colaborador', linkedin: 'www.linkedin.com/in/rafael-afonso-305187300' },
    { name: 'Tiago Videira', image: logisticaTiagoVideira, role: 'Colaborador', linkedin: 'www.linkedin.com/in/tiago-videira-78a887196' },
    { name: 'Zara Hassanali', image: logisticaZara, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/zara-hassanali-a94016246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
  ],
}

// Relações Externas
import reAfonsoMendes from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Afonso_Mendes.webp';
import reCamilaDelgado from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Camila_Delgado.webp';
import reCarlotaPereira from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Carlota_Pereira.webp';
import reDorisaSilva from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Dorisa_Silva.webp';
import reFranciscoBica from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Francisco_Bica.webp';
import reFranciscoFranco from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Francisco_Franco.webp';
import reGoncaloCosta from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Goncalo_Costa.webp';
import reGoncaloReboleira from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Goncalo_Reboleira.webp';
import reJoaoAmaral from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Joao_Amaral.webp';
import reMarianaAntunes from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Mariana_Antunes.webp';
import reRitaCardeira from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Rita_Cardeira.webp';
import reSofiaVarandas from '@/assets/team/2026/Relacoes_Externas/Relacoes_Externas_Sofia_Varandas.webp';
import reAfonsoLouro from '@/assets/team/2026/Relacoes_Externas/Externas_Externas_Afonso_Louro.webp';
import reCarolinaNunes from '@/assets/team/2026/Relacoes_Externas/Externas_Externas_Carolina_Nunes.webp';
import reEvanetteEvaristo from '@/assets/team/2026/Relacoes_Externas/Externas_Externas_Evanette_Evaristo.webp';
import reJoaoGoncalves from '@/assets/team/2026/Relacoes_Externas/Externas_Externas_Joao_Goncalves.webp';

const relacoesExternas26: IDepartment = {
  name: 'Relações Externas',
  slug: 'relacoes-externas',
  coordinators: [
    { name: 'Afonso Louro', image: reAfonsoLouro, role: 'Coordenador', linkedin: 'www.linkedin.com/in/afonso-silva-louro-4a6a0632a' },
    { name: 'Carolina Nunes', image: reCarolinaNunes, role: 'Coordenadora', linkedin: 'https://www.linkedin.com/in/carolina-n-s-c-nunes?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Evanette Evaristo', image: reEvanetteEvaristo, role: 'Coordenadora', linkedin: 'https://www.linkedin.com/in/evanette-evaristo-19760023a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'João Gonçalves', image: reJoaoGoncalves, role: 'Coordenador', linkedin: 'https://www.linkedin.com/in/joão-paulo-soares-gonçalves-5236a8328?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  ],
  members: [
    { name: 'Afonso Mendes', image: reAfonsoMendes, role: 'Colaborador', linkedin: 'www.linkedin.com/in/afonso- figueira-mendes/' },
    { name: 'Camila Delgado', image: reCamilaDelgado, role: 'Colaboradora', linkedin: 'http://linkedin.com/in/ccamiladelgado' },
    { name: 'Carlota Pereira', image: reCarlotaPereira, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/carlota-pereira-90a462391?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { name: 'Dorisa Silva', image: reDorisaSilva, role: 'Colaboradora', linkedin: '' },
    { name: 'Francisco Bica', image: reFranciscoBica, role: 'Colaborador', linkedin: 'http://linkedin.com/in/francisco-bica-8b6b4238b' },
    { name: 'Francisco Franco', image: reFranciscoFranco, role: 'Colaborador', linkedin: '' },
    { name: 'Gonçalo Costa', image: reGoncaloCosta, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/gon%C3%A7alo-costa-711659338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { name: 'Gonçalo Reboleira', image: reGoncaloReboleira, role: 'Colaborador', linkedin: '' },
    { name: 'João Amaral', image: reJoaoAmaral, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/joaofgcamaral' },
    { name: 'Mariana Antunes', image: reMarianaAntunes, role: 'Colaboradora', linkedin: '' },
    { name: 'Rita Cardeira', image: reRitaCardeira, role: 'Colaboradora', linkedin: 'http://linkedin.com/in/rita-cardeira-645b07281' },
    { name: 'Sofia Varandas', image: reSofiaVarandas, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/sofia-varandas-0713a8395?trk=contact-info' },
  ],
}

// Suporte Informático
import siFilipeMiranda from '@/assets/team/2026/Suporte_Informatico/Suporte_Informatico_Filipe_Miranda.webp';
import siFilipeAlves from '@/assets/team/2026/Suporte_Informatico/Suporte_Informatico_Filipe_Alves.webp';
import siJoseAtaide from '@/assets/team/2026/Suporte_Informatico/Suporte_Informatico_Jose_Ataide.webp';
import siLourencoBorges from '@/assets/team/2026/Suporte_Informatico/Suporte_Informatico_Lourenco_Borges.webp';
import siMargaridaLopes from '@/assets/team/2026/Suporte_Informatico/Suporte_Informatico_Margarida_Lopes.webp';

const suporteInformatico26: IDepartment = {
  name: 'Suporte Informático',
  slug: 'suporte-informatico',
  coordinators: [
    { name: 'Filipe Miranda', image: siFilipeMiranda, role: 'Coordenador', linkedin: '' },

  ],
  members: [
    { name: 'Filipe Alves', image: siFilipeAlves, role: 'Colaborador', linkedin: '' },
    { name: 'José Ataíde', image: siJoseAtaide, role: 'Colaborador', linkedin: '' },
    { name: 'Lourenço Borges', image: siLourencoBorges, role: 'Colaborador', linkedin: 'https://www.linkedin.com/in/louren%C3%A7o-borges-31274a38b/' },
    { name: 'Margarida Lopes', image: siMargaridaLopes, role: 'Colaboradora', linkedin: 'https://www.linkedin.com/in/margaridalopes03?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
  ],
}

export {
  direcao26,
  marketingDesign26,
  logistica26,
  relacoesExternas26,
  suporteInformatico26,
}
