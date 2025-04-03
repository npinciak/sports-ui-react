import { createSelector } from '@reduxjs/toolkit';
import { BASEBALL_LINEUP_MAP } from '@sdk/espn-client-models/baseball/lineup/lineup.const';
import { FangraphsPlayerProjectionEntity } from '@shared/fangraphs';
import { selectFangraphsPlayerEntities, selectFangraphsPlayerTotal } from '@shared/fangraphs/selectors';
import { existsFilter } from '@shared/helpers';
import { RootState } from '../../../../app.store';
import { startingPlayersFilter } from '../helpers';
import { BaseballPlayerWithFangraphsEntity } from '../models/baseball-player.model';
import { baseballTeamRosterAdapter } from '../slices/baseball-team-roster.slice';
import { addEventsToBatterEntity, addEventsToPitcherEntity } from '../transformers/baseball-player.transformers';
import { selectEventIdSet } from './baseball-events.selector';

const baseballTeamRosterState = (state: RootState) => state.baseballTeamRoster;

const { selectById, selectIds, selectAll } = baseballTeamRosterAdapter.getSelectors<RootState>(baseballTeamRosterState);

export const selectPlayerIds = createSelector(
  state => state,
  state => selectIds(state)
);

export const selectPlayerIdBySportsUiIdMap = createSelector(baseballTeamRosterState, state => state.map);

export const selectPlayerEntityList = createSelector(
  state => state,
  state => selectAll(state)
);

export const selectPlayerBySportsUiId = createSelector(
  state => state,
  state => (sportsUiId: string) => selectById(state, sportsUiId)
);

export const selectPlayerById = createSelector(
  [selectPlayerIdBySportsUiIdMap, selectPlayerBySportsUiId],
  (map, playerBySportsUiId) => (playerId: string | null) => {
    if (!playerId) return null;

    const sportsUiId = map[playerId];

    return playerBySportsUiId(sportsUiId);
  }
);

export const selectInjuryPlayerList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => {
    if (!p.health) return false;
    return p.health?.isInjured;
  })
);

export const selectTeamBatterList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => !p.isPitcher || p.lineupSlotId === 12)
);

export const selectTeamStartingBatterList = createSelector([selectTeamBatterList], players =>
  startingPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamStartingBatterListWithEvents = createSelector([selectTeamStartingBatterList], players => {
  return players.map(player => addEventsToBatterEntity(player));
});

export const selectTeamPitcherList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => p.isPitcher && p.lineupSlotId !== 12)
);

export const selectTeamStartingPitcherList = createSelector([selectTeamPitcherList], players =>
  startingPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamStartingPitcherListWithEvents = createSelector(
  [selectTeamStartingPitcherList, selectEventIdSet],
  (players, eventIdSet) => players.map(player => addEventsToPitcherEntity(player, eventIdSet))
);

export const selectFangraphsToBatters = createSelector(
  [selectTeamBatterList, selectFangraphsPlayerEntities, selectFangraphsPlayerTotal],
  (players, fangraphsEntities, totalFangraphsPlayers) => {
    const hasFangraphsPlayers = totalFangraphsPlayers > 0;

    return players.map(player => ({
      ...player,
      fangraphsProjection: hasFangraphsPlayers ? (fangraphsEntities[player.sportsUiId] as FangraphsPlayerProjectionEntity) : null,
    }));
  }
);

export const selectStartingBatterFangraphIds = createSelector([selectFangraphsToBatters], players => {
  const playerIds = players.map(p => transformFangraphIds(p));

  return existsFilter(playerIds);
});

export const selectFangraphsToPitchers = createSelector(
  [selectTeamPitcherList, selectFangraphsPlayerEntities, selectFangraphsPlayerTotal],
  (players, fangraphsEntities, totalFangraphsPlayers) => {
    const hasFangraphsPlayers = totalFangraphsPlayers > 0;

    return players.map(player => {
      return {
        ...player,
        fangraphsProjection: hasFangraphsPlayers ? (fangraphsEntities[player.sportsUiId] as FangraphsPlayerProjectionEntity) : null,
      };
    });
  }
);

export const selectStartingPitcherFangraphIds = createSelector([selectFangraphsToPitchers], players => {
  const playerIds = players.map(p => transformFangraphIds(p));
  return existsFilter(playerIds);
});

function transformFangraphIds(player: BaseballPlayerWithFangraphsEntity): number | null {
  if (!player.fangraphsProjection) return null;
  return Number(player.fangraphsProjection.playerid);
}
