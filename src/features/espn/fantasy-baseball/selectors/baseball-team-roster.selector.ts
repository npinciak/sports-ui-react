import { createSelector } from '@reduxjs/toolkit';
import { BASEBALL_LINEUP_MAP, PLAYER_INJURY_STATUS } from 'sports-ui-sdk';
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
    return players.map(player => {
      const playerGames = player.starterStatusByProGame;

      let playerStartingStatus = '';
      if (playerGames) {
        const hasGames = Object.entries(playerGames).length > 0;

        if (!hasGames) {
          playerStartingStatus = PLAYER_INJURY_STATUS.NotStarting;
        } else if (hasGames) {
          const [_, startingStatus] = Object.entries(playerGames)[0];
          playerStartingStatus = startingStatus ?? PLAYER_INJURY_STATUS.UNKNOWN;
        }
      }

      const isStarting = playerStartingStatus === PLAYER_INJURY_STATUS.Starting ? true : false;

      return {
        ...player,
        isStarting,
      };
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
    return players.map(player => {
      let playerStartingStatus = '';

      if (player.starterStatusByProGame) {
        const playerGames = player.starterStatusByProGame;

        Object.entries(playerGames).map(([gameId, startingStatus]) => {
          if (eventIds.has(gameId)) {
            playerStartingStatus = startingStatus === PLAYER_INJURY_STATUS.Probable ? PLAYER_INJURY_STATUS.Starting : startingStatus;
          }
        });
      }

      const isStarting = playerStartingStatus === PLAYER_INJURY_STATUS.Starting ? true : false;

      return {
        ...player,
        isStarting,
      };
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
