 import { StateCreator } from 'zustand'
 import { teams, teamsNeegi } from '@/data/team'

export type EventType = 'SET' | 'NEEGI';

export interface TeamYearSlice {
	year: String,
	teamIndex : number,
	eventType: EventType,
	setSelectedYear: (year: string) => void,
	setEventType: (eventType: EventType) => void,
	getCurrentTeam: () => any
}

export const createTeamYearSlice: StateCreator<
	TeamYearSlice
> = (set, get) => ({
	year: String(teams[teams.length-1].year), // default to latest year (e.g., 2026)
	teamIndex: teams.length-1,
	eventType: 'SET',
	setSelectedYear: (year) => {
		const yearNum = Number(year);
		
		// Always use teams array for SET (or when year != 2025)
		set({
			year: year,
			teamIndex: teams.findIndex(team => String(team.year) === year),
		});
	},
	setEventType: (eventType) => {
		const state = get();
		const yearNum = Number(state.year);
		
		// Only change eventType if year is 2025
		if (yearNum === 2025) {
			set({
				eventType: eventType,
			});
		}
	},
	getCurrentTeam: () => {
		const state = get();
		const yearNum = Number(state.year);
		
		// Only use NEEGI data for year 2025 when NEEGI is selected
		if (yearNum === 2025 && state.eventType === 'NEEGI') {
			return teamsNeegi[teamsNeegi.findIndex(team => String(team.year) === state.year)];
		}
		return teams[state.teamIndex];
	}
})