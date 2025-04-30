import { ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup/lineup.model';
import { LineupEntityMap } from '@sdk/espn-client-models/lineup.model';
import { FangraphsPlayerProjectionEntity, FangraphsTeamToEspnTeam } from '@shared/fangraphs';
import { normalizeName } from '../../espn-helpers';
import { BaseballPlayerEntity, BaseballPlayerStatsRowEntity } from '../models/baseball-player.model';

/**
 * Filters starting players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function startingPlayersFilter(players: BaseballPlayerEntity[], lineupMap: LineupEntityMap): BaseballPlayerEntity[] {
  const playerList = players.filter(p => isInStartingLineup(p, lineupMap));
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
}

function isInStartingLineup(player: BaseballPlayerEntity, lineupMap: LineupEntityMap): boolean {
  const { lineupSlotId } = player;

  const isBench = lineupMap[lineupSlotId].bench;
  const isInjuryList = lineupSlotId === ClientBaseballLineupSlot.IL;
  const isPitcherTwo = lineupSlotId === ClientBaseballLineupSlot.P2;

  return !isBench && !isInjuryList && !isPitcherTwo;
}

/**
 * Sort players by lineupSlotId
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function sortPlayersByLineupSlotDisplayOrder<T extends BaseballPlayerEntity | BaseballPlayerStatsRowEntity>(
  players: T[],
  lineupMap: LineupEntityMap
): T[] {
  return players.sort((a, b) => lineupMap[a.lineupSlotId].displayOrder - lineupMap[b.lineupSlotId].displayOrder);
}

/**
 * Filters bench players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function benchPlayersFilter(players: BaseballPlayerEntity[], lineupMap: LineupEntityMap): BaseballPlayerEntity[] {
  const playerList = players.filter(p => isOnBench(p, lineupMap));

  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
}

function isOnBench(player: BaseballPlayerEntity, lineupMap: LineupEntityMap): boolean {
  const { lineupSlotId } = player;

  const isBench = lineupMap[lineupSlotId].bench;
  const isInjured = player.health?.isInjured;

  return isBench && !isInjured;
}

export function generateSportsUiPlayerId({
  espnPlayer,
  fangraphsPlayer,
}: {
  espnPlayer: BaseballPlayerEntity;
  fangraphsPlayer: FangraphsPlayerProjectionEntity;
}): {
  normalizedEspnId: string;
  normalizedFangraphsId: string;
} {
  const espnTeam = espnPlayer.team ? espnPlayer.team.toLowerCase() : '';
  const fangraphsTeam = fangraphsPlayer.Team ? FangraphsTeamToEspnTeam[fangraphsPlayer.Team].toLowerCase() : '';

  const normalizedEspnId = `name=${normalizeName(espnPlayer.name)}~team=${espnTeam}`;
  const normalizedFangraphsId = `name=${normalizeName(fangraphsPlayer.PlayerName)}~team=${fangraphsTeam}`;

  return {
    normalizedEspnId,
    normalizedFangraphsId,
  };
}
