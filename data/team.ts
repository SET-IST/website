import { StaticImageData } from 'next/image';
import { coordenacao24, marketingDesign24, logistica24, people24, relacoesExternas24, suporteInformatico24, embaixadores24, } from './team24';
import { coordenacao23, design23, logistica23, marketing23, relacoesExternas23, suporteInformatico23, } from './team23';
import { coordenacao22, logistica22, marketing22, relacoesExternas22, suporteInformatico22, } from './team22';
import { coordenacao21, logistica21, marketing21, relacoesExternas21, suporteInformatico21, } from './team21';
import { coordenacao20, logistica20, marketing20, relacoesExternas20, suporteInformatico20, } from './team20';
import { coordenacao19, logistica19, marketing19, relacoesExternas19, suporteInformatico19, } from './team19';

  

export interface TeamMember {
  name: string;
  image: StaticImageData;
  customImagePosition?: string;
  role: string;
  linkedin: string;
}

export interface IDepartment {
  name: string;
  slug: string;
  coordinators: TeamMember[];
  members: TeamMember[];
}

export type Team = IDepartment[];
  
export const team24: Team = [
	coordenacao24,
	marketingDesign24,
	logistica24,
	people24,
	relacoesExternas24,
	suporteInformatico24,
	embaixadores24,
];

export const team23: Team = [
	coordenacao23,
	design23,
	logistica23,
	marketing23,
	relacoesExternas23,
	suporteInformatico23,
];

export const team22: Team = [
	coordenacao22,
	logistica22,
	marketing22,
	relacoesExternas22,
	suporteInformatico22,
]

export const team21: Team = [
    coordenacao21,
    logistica21,
    marketing21,
	relacoesExternas21,
    suporteInformatico21,
]

export const team20: Team = [
    coordenacao20,
    logistica20,
    marketing20,
	relacoesExternas20,
    suporteInformatico20,
]

export const team19: Team = [
    coordenacao19,
    logistica19,
    marketing19,
	relacoesExternas19,
    suporteInformatico19,
]