import { EspnClient } from 'sports-ui-sdk';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';

/**
 * Filters starting players
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function startingPlayersFilter<T extends BaseballPlayer>(players: T[], lineupMap: EspnClient.LineupEntityMap): T[] {
  const playerList = players.filter(p => !lineupMap[p.lineupSlotId].bench && p.lineupSlotId !== 21 && !p.injured);
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
}

/**
 * Sort players by lineupSlotId
 *
 * @param players
 * @param lineupMap
 * @returns
 */
export function sortPlayersByLineupSlotDisplayOrder<T extends BaseballPlayer | BaseballPlayerStatsRow>(
  players: T[],
  lineupMap: EspnClient.LineupEntityMap
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
export function benchPlayersFilter<T extends BaseballPlayer>(players: T[], lineupMap: EspnClient.LineupEntityMap): T[] {
  const playerList = players.filter(p => lineupMap[p.lineupSlotId].bench && !p.injured);
  return sortPlayersByLineupSlotDisplayOrder(playerList, lineupMap);
}
