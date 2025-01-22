import { create } from 'zustand'
import { NavbarSlice, createNavbarSlice } from './navbar'
import { ProfileSlice, createProfileSlice } from './profile'
import { ActivitiesSlice, createActivitiesSlice } from './activities'
import { TeamYearSlice, createTeamYearSlice } from './team'

export const useBoundStore = create<
  NavbarSlice & ProfileSlice & ActivitiesSlice & TeamYearSlice
>()((...a) => ({
  ...createNavbarSlice(...a),
  ...createProfileSlice(...a),
  ...createActivitiesSlice(...a),
  ...createTeamYearSlice(...a),
}))
