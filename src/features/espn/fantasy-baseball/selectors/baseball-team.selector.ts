import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballTeamAdapter } from '../slices/baseball-team.slice';

const baseballTeamState = (state: RootState) => state.baseballTeam;

const { selectById, selectAll } = baseballTeamAdapter.getSelectors<RootState>(baseballTeamState);

export const getTeamById = createSelector(
  state => state,
  state => (id: string | null) => {
    if (!id) return null;

    return selectById(state, id) ?? null;
  }
);

export const getTeamList = createSelector(
  state => state,
  state => selectAll(state)
);

export const getTeamsWithTradeablePlayers = createSelector(getTeamList, teams =>
  teams.filter(team => team.hasTradeablePlayers).map(({ name, id }) => ({ name, id }))
);

export const getTeamsWithTradeablePlayersCount = createSelector(getTeamsWithTradeablePlayers, teams => teams.length);

export const getTeamDropTotals = createSelector(getTeamList, teams => teams.reduce((acc, team) => acc + team.transactionCounter.drops, 0));
export const getTeamMoveToActive = createSelector(getTeamList, teams =>
  teams.reduce((acc, team) => acc + team.transactionCounter.moveToActive, 0)
);
export const getTeamMoveToInjuredReserve = createSelector(getTeamList, teams =>
  teams.reduce((acc, team) => acc + team.transactionCounter.moveToIR, 0)
);
