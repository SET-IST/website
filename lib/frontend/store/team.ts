 import { StateCreator } from 'zustand'
 import { teams } from '@/data/team'

export interface TeamYearSlice {
	year: String,
	teamIndex : number,
	setSelectedYear: (year: string) => void
}

export const createTeamYearSlice: StateCreator<
	TeamYearSlice
> = (set) => ({
	year: String(teams[teams.length-1].year), // default value, the lasat one with people photos
	teamIndex: teams.length-1,
	setSelectedYear: (year) =>
		set({
		year: year,
		teamIndex: teams.findIndex(team => String(team.year) === year),
		}),
})