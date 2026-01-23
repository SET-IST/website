import { StaticImageData } from 'next/image';
// SET teams
import { coordenacao25, marketingDesign25, logistica25, relacoesExternas25, suporteInformatico25, } from './team25';
import { coordenacao24, marketingDesign24, logistica24, people24, relacoesExternas24, suporteInformatico24, embaixadores24, } from './team24';
import { coordenacao23, design23, logistica23, marketing23, relacoesExternas23, suporteInformatico23, } from './team23';
import { coordenacao22, logistica22, marketing22, relacoesExternas22, suporteInformatico22, } from './team22';
import { coordenacao21, logistica21, marketing21, relacoesExternas21, suporteInformatico21, } from './team21';
import { coordenacao20, logistica20, marketing20, relacoesExternas20, suporteInformatico20, } from './team20';
import { coordenacao19, logistica19, marketing19, relacoesExternas19, suporteInformatico19, } from './team19';
import { coordenacao18, logistica18, marketing18, relacoesExternas18, suporteInformatico18, } from './team18';
import { coordenacao17, logistics17, marketing17, relacoesExternas17, suporteInformatico17, eventSupporter17 } from './team17';

// NEEGI teams
import { coordenacao25_neegi, marketingDesign25_neegi, logistica25_neegi, relacoesExternas25_neegi } from './team25_neegi';

// JET teams
import { direcao26, marketingDesign26, logistica26, relacoesExternas26, suporteInformatico26 } from './team26';

export type ImageFormat = 'round' | 'original' | 'round-2x';

export interface ITeamMember {
  name: string;
  image: StaticImageData;
  customImagePosition?: string;
  role: string;
  linkedin: string;
}

export interface IDepartment {
  name: string;
  slug: string;
  coordinators: ITeamMember[];
  members: ITeamMember[];
}

export interface Team {
    year: number;
    imageFormat: ImageFormat;
    team: IDepartment[];
}

// JET 2026
export const team26: Team = {
  year: 2026,
  imageFormat: 'round',
  team: [
    direcao26,
    marketingDesign26,
    logistica26,
    relacoesExternas26,
    suporteInformatico26,
  ],
}

export const team25_neegi: Team = {
  year: 2025,
  imageFormat: 'round',
  team: [
    coordenacao25_neegi,
    marketingDesign25_neegi,
    logistica25_neegi,
    relacoesExternas25_neegi
  ],
}

export const team25: Team = {
    year: 2025,
    imageFormat: 'original',
    team: [
        coordenacao25,
        marketingDesign25,
        logistica25,
        relacoesExternas25,
        suporteInformatico25,
    ],
}

export const team24: Team = {
    year: 2024,
    imageFormat: 'round-2x',
    team: [
        coordenacao24,
        marketingDesign24,
        logistica24,
        people24,
        relacoesExternas24,
        suporteInformatico24,
        embaixadores24,
    ],
}
export const team23: Team = {
    year: 2023,
    imageFormat: 'round',
    team: [
        coordenacao23,
        design23,
        logistica23,
        marketing23,
        relacoesExternas23,
        suporteInformatico23,
    ],
}
export const team22: Team = {
    year: 2022,
    imageFormat: 'round',
    team: [
        coordenacao22,
        logistica22,
        marketing22,
        relacoesExternas22,
        suporteInformatico22,
    ],
}
export const team21: Team = {
    year: 2021,
    imageFormat: 'round',
    team: [
        coordenacao21,
        logistica21,
        marketing21,
        relacoesExternas21,
        suporteInformatico21,
    ],
}
export const team20: Team = {
    year: 2020,
    imageFormat: 'round',
    team: [
        coordenacao20,
        logistica20,
        marketing20,
        relacoesExternas20,
        suporteInformatico20,
    ],
}
export const team19: Team = {
    year: 2019,
    imageFormat: 'round',
    team: [
        coordenacao19,
        logistica19,
        marketing19,
        relacoesExternas19,
        suporteInformatico19,
    ],
}
export const team18: Team = {
    year: 2018,
    imageFormat: 'round',
    team: [
        coordenacao18,
        logistica18,
        marketing18,
        relacoesExternas18,
        suporteInformatico18,
    ],
}
export const team17: Team = {
    year: 2017,
    imageFormat: 'round',
    team: [
        coordenacao17,
        logistics17,
        marketing17,
        relacoesExternas17,
        suporteInformatico17,
        eventSupporter17,
    ],
}

export const teams = [team17, team18, team19, team20, team21, team22, team23, team24, team25, team26];
export const teamsNeegi = [team25_neegi];
