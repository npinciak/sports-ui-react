import { createSelector } from '@reduxjs/toolkit';
import { BASEBALL_LINEUP_MAP } from '@sdk/espn-client-models/baseball/lineup/lineup.const';
import { ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup/lineup.model';
import { FangraphsPlayerProjectionEntity } from '@shared/fangraphs';
import {
  selectFangraphsBatterEntities,
  selectFangraphsBatterTotal,
  selectFangraphsPitcherEntities,
  selectFangraphsPitcherTotal,
} from '@shared/fangraphs/selectors';
import { existsFilter } from '@shared/helpers';
import { RootState } from '../../../../app.store';
import { benchPlayersFilter, startingPlayersFilter } from '../helpers';
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

    const isOnInjuryList = p.lineupSlotId === ClientBaseballLineupSlot.IL;
    if (isOnInjuryList) return true;

    return p.health?.isInjured;
  })
);

export const selectTeamBatterList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => !p.isPitcher || p.lineupSlotId === ClientBaseballLineupSlot.DH)
);

export const selectTeamStartingBatterList = createSelector([selectTeamBatterList], players =>
  startingPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamBenchBatterList = createSelector([selectTeamBatterList], players =>
  benchPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamStartingBatterListWithEvents = createSelector([selectTeamStartingBatterList], players =>
  players.map(player => addEventsToBatterEntity(player))
);

export const selectTeamBenchBatterListWithEvents = createSelector([selectTeamBenchBatterList], players =>
  players.map(player => addEventsToBatterEntity(player))
);

export const selectTeamPitcherList = createSelector([selectPlayerEntityList], players =>
  players.filter(p => p.isPitcher && p.lineupSlotId !== ClientBaseballLineupSlot.UTIL)
);

export const selectTeamStartingPitcherList = createSelector([selectTeamPitcherList], players =>
  startingPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamBenchPitcherList = createSelector([selectTeamPitcherList], players =>
  benchPlayersFilter(players, BASEBALL_LINEUP_MAP)
);

export const selectTeamStartingPitcherListWithEvents = createSelector(
  [selectTeamStartingPitcherList, selectEventIdSet],
  (players, eventIdSet) => players.map(player => addEventsToPitcherEntity(player, eventIdSet))
);

export const selectTeamBenchPitcherListWithEvents = createSelector([selectTeamBenchPitcherList, selectEventIdSet], (players, eventIdSet) =>
  players.map(player => addEventsToPitcherEntity(player, eventIdSet))
);

export const selectFangraphsToBatters = createSelector(
  [selectTeamBatterList, selectFangraphsBatterEntities, selectFangraphsBatterTotal],
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
  [selectTeamPitcherList, selectFangraphsPitcherEntities, selectFangraphsPitcherTotal],
  (players, fangraphsEntities, totalFangraphsPlayers) => {
    const hasFangraphsPlayers = totalFangraphsPlayers > 0;

    return players.map(player => ({
      ...player,
      fangraphsProjection: hasFangraphsPlayers ? (fangraphsEntities[player.sportsUiId] as FangraphsPlayerProjectionEntity) : null,
    }));
  }
);

export const selectPitcherFangraphIds = createSelector([selectFangraphsToPitchers], players => {
  const playerIds = players.map(p => transformFangraphIds(p));
  return existsFilter(playerIds);
});

function transformFangraphIds(player: BaseballPlayerWithFangraphsEntity): number | null {
  if (!player.fangraphsProjection) return null;
  return Number(player.fangraphsProjection.playerid);
}
