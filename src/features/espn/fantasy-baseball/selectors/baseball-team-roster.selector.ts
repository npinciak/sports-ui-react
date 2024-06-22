import { createSelector } from '@reduxjs/toolkit';
import { BASEBALL_LINEUP_MAP } from 'sports-ui-sdk';
import { FangraphsPlayerProjectionEntity } from '../../../../@shared/fangraphs';
import { selectFangraphsPlayerEntities } from '../../../../@shared/fangraphs/selectors';
import { RootState } from '../../../../app.store';
import { startingPlayersFilter } from '../helpers';
import { baseballTeamRosterAdapter } from '../slices/baseball-team-roster.slice';
import { selectEventIdSet } from './baseball-events.selector';

const baseballTeamRosterState = (state: RootState) => state.baseballTeamRoster;
export const baseballTeamRosterAdapterSelector = baseballTeamRosterAdapter.getSelectors<RootState>(baseballTeamRosterState);

export const selectPlayerIds = createSelector([baseballTeamRosterState], state => state.ids);
export const selectPlayerEntityList = createSelector([baseballTeamRosterState], state => Object.values(state.entities));
export const selectTeamBatterList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => !p.isPitcher || p.lineupSlotId === 12)
);
export const selectTeamStartingBatterList = createSelector([selectTeamBatterList], players =>
  startingPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamStartingBatterListWithEvents = createSelector(
  [selectTeamStartingBatterList, selectEventIdSet],
  (players, eventIds) => {
    players.map(player => {
      if (player.starterStatusByProGame) {
        const test = Object.keys(player.starterStatusByProGame);
        test.map(t => {
          if (eventIds.has(t)) {
            console.log(player.name, player.starterStatusByProGame![t]);
          }
        });
      }
    });
  }
);

export const selectTeamPitcherList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => p.isPitcher && p.lineupSlotId !== 12)
);
export const selectTeamStartingPitcherList = createSelector([selectTeamPitcherList], players =>
  startingPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamStartingPitcherListWithEvents = createSelector(
  [selectTeamStartingPitcherList, selectEventIdSet],
  (players, eventIds) => {
    players.map(player => {
      if (player.starterStatusByProGame) {
        const test = Object.keys(player.starterStatusByProGame);
        console.log(test);
      }
    });
  }
);

export const selectFangraphsToBatters = createSelector(
  [selectTeamBatterList, selectFangraphsPlayerEntities],
  (players, fangraphsEntities) =>
    players.map(player => ({
      ...player,
      fangraphs: fangraphsEntities[player.sportsUiId] as FangraphsPlayerProjectionEntity,
    }))
);

export const selectStartingBatterFangraphIds = createSelector([selectFangraphsToBatters], players =>
  players.map(p => Number(p.fangraphs?.playerid))
);

export const selectFangraphsToPitchers = createSelector(
  [selectTeamPitcherList, selectFangraphsPlayerEntities],
  (players, fangraphsEntities) =>
    players.map(player => ({
      ...player,
      fangraphs: fangraphsEntities[player.sportsUiId] as FangraphsPlayerProjectionEntity,
    }))
);
