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
