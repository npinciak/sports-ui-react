import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

const adminLeagueProgressionForm = (state: RootState) => state.adminLeagueProgressionForm;

export const selectLeagueId = createSelector([adminLeagueProgressionForm], state => state.leagueId);
export const selectEspnTeamId = createSelector([adminLeagueProgressionForm], state => state.espnTeamId);
export const selectRank = createSelector([adminLeagueProgressionForm], state => state.rank);
export const selectTotalPoints = createSelector([adminLeagueProgressionForm], state => state.totalPoints);
export const selectLeagueTeamId = createSelector([adminLeagueProgressionForm], state => state.leagueTeamId);
