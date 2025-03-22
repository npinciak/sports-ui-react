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
export function startingPlayersFilter<T extends BaseballPlayerEntity>(players: T[], lineupMap: LineupEntityMap): T[] {
  const playerList = players.filter(p => !lineupMap[p.lineupSlotId].bench && p.lineupSlotId !== 21);
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
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
export function benchPlayersFilter<T extends BaseballPlayerEntity>(players: T[], lineupMap: LineupEntityMap): T[] {
  const playerList = players.filter(p => lineupMap[p.lineupSlotId].bench && p.health?.isInjured);
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
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
