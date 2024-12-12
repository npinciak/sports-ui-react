import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { footballTeamAdapter } from '../slices/football-team.slice';

const footballTeamSlice = (state: RootState) => state.footballTeam;

export const { selectById, selectEntities } = footballTeamAdapter.getSelectors<RootState>(footballTeamSlice);

export const getEntityById = createSelector(
  (state: RootState) => state,
  state => (id: string) => selectById(state, id)
);

export const getEntityList = createSelector(
  (state: RootState) => state,
  state => Object.values(selectEntities(state)) ?? []
);

export const getTeamList = createSelector([getEntityList], entityList => entityList);

export const getTeamStandingsList = createSelector([getEntityList], entityList => entityList.sort((a, b) => b.wins - a.wins));

export const getTopThreeScoringTeamsList = createSelector([getEntityList], entityList => {
  return entityList.sort((a, b) => b.pointsFor - a.pointsFor).slice(0, 3);
});
