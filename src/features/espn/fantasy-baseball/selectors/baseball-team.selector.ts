import { createSelector } from '@reduxjs/toolkit';
import { BASEBALL_LINEUP_MAP } from 'sports-ui-sdk';
import { RootState } from '../../../../app.store';
import { startingPlayersFilter } from '../helpers/baseball-helpers';
import { baseballTeamAdapter } from '../slices/baseball-team.slice';

export const BaseballTeamSelector = baseballTeamAdapter.getSelectors<RootState>(store => store.baseballTeam);

export function selectTeamById(state: RootState) {
  return (id: string) => BaseballTeamSelector.selectById(state, id);
}

export function selectTeamList(state: RootState) {
  return BaseballTeamSelector.selectAll(state);
}

export const selectTeamBatters = createSelector([selectTeamById], teamById => {
  return (id: string) => teamById(id).roster.filter(p => !p.isPitcher || p.lineupSlotId === 12);
});

export const selectTeamStartingLineupBatters = createSelector([selectTeamBatters], selectTeamBatters => {
  return (id: string) => startingPlayersFilter(selectTeamBatters(id), BASEBALL_LINEUP_MAP);
});

export const selectTeamPitchers = createSelector([selectTeamById], teamById => {
  return (id: string) => teamById(id).roster.filter(p => p.isPitcher && p.lineupSlotId !== 12);
});

export const selectTeamStartingLineupPitchers = createSelector([selectTeamPitchers], selectTeamPitchers => {
  return (id: string) => startingPlayersFilter(selectTeamPitchers(id), BASEBALL_LINEUP_MAP);
});
