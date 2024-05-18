import { createSelector } from '@reduxjs/toolkit';
import { BASEBALL_LINEUP_MAP } from 'sports-ui-sdk';
import { RootState } from '../../../../app.store';
import { startingPlayersFilter } from '../helpers/baseball-helpers';
import { baseballTeamAdapter } from '../slices/baseball-team.slice';

const baseballTeamState = (state: RootState) => state.baseballTeam;

export const BaseballTeamEntitySelector = baseballTeamAdapter.getSelectors<RootState>(baseballTeamState);

export const getTeamById = createSelector([baseballTeamState], state => (id: string) => state.entities[id]);

export const selectTeamBatters = createSelector(
  [getTeamById],
  teamById => (id: string) => teamById(id).roster.filter(p => !p.isPitcher || p.lineupSlotId === 12)
);

export const selectTeamStartingLineupBatters = createSelector(
  [selectTeamBatters],
  selectTeamBatters => (id: string) => startingPlayersFilter(selectTeamBatters(id), BASEBALL_LINEUP_MAP)
);

export const selectTeamPitchers = createSelector(
  [getTeamById],
  teamById => (id: string) => teamById(id).roster.filter(p => p.isPitcher && p.lineupSlotId !== 12)
);

export const selectTeamStartingLineupPitchers = createSelector(
  [selectTeamPitchers],
  selectTeamPitchers => (id: string) => startingPlayersFilter(selectTeamPitchers(id), BASEBALL_LINEUP_MAP)
);
