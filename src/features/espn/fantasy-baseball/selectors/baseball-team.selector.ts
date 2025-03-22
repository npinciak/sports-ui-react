import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballTeamAdapter } from '../slices/baseball-team.slice';

const baseballTeamState = (state: RootState) => state.baseballTeam;

export const { selectById, selectAll } = baseballTeamAdapter.getSelectors<RootState>(baseballTeamState);

export const getTeamById = createSelector(
  state => state,
  state => (id: string) => selectById(state, id)
);

export const getTeamList = createSelector(
  state => state,
  state => selectAll(state)
);

export const getTeamsWithTradeablePlayers = createSelector(getTeamList, teams =>
  teams.filter(team => team.hasTradeablePlayers).map(({ name, id }) => ({ name, id }))
);

export const getTeamsWithTradeablePlayersCount = createSelector(getTeamsWithTradeablePlayers, teams => teams.length);
