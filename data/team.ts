import { StaticImageData } from 'next/image';
import { coordenacao24, marketingDesign24, logistica24, people24, relacoesExternas24, suporteInformatico24, embaixadores24, } from './team24';
import { coordenacao23, design23, logistica23, marketing23, relacoesExternas23, suporteInformatico23, } from './team23';
import { coordenacao22, logistica22, marketing22, relacoesExternas22, suporteInformatico22, } from './team22';
  

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
  