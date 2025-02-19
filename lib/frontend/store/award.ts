 import { StateCreator } from 'zustand'

export interface LastAwardToken {
	token: String,
	setAwardToken: (token: string) => void,
}

export const createLastAwardToken: StateCreator<
	LastAwardToken
> = (set) => ({
	token: '',
	setAwardToken: (new_token: string) =>
		set({
			token: new_token,
		}),
})
