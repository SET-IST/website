import { create } from 'zustand'
import { NavbarSlice, createNavbarSlice } from './navbar'
import { ProfileSlice, createProfileSlice } from './profile'
import { ActivitiesSlice, createActivitiesSlice } from './activities'
import { TeamYearSlice, createTeamYearSlice } from './team'
import { LastAwardToken, createLastAwardToken } from './award'

export const useBoundStore = create<
  NavbarSlice & ProfileSlice & ActivitiesSlice & TeamYearSlice & LastAwardToken
>()((...a) => ({
  ...createNavbarSlice(...a),
  ...createProfileSlice(...a),
  ...createActivitiesSlice(...a),
  ...createTeamYearSlice(...a),
  ...createLastAwardToken(...a)
}))
