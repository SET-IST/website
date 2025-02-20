 import { StateCreator } from 'zustand'

export interface LastAwardToken {
	token: String,
	setLastToken: (token: string) => void,
}

export const createLastAwardToken: StateCreator<
	LastAwardToken
> = (set) => ({
	token: '',
	setLastToken: (new_token: string) =>
		set({
			token: new_token,
		}),
})
