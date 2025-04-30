import { BaseballStat } from '@sdk/espn-client-models/baseball/stats/mlb-stats.model';
import { PLAYER_INJURY_STATUS } from '@sdk/injury/injury-status.model';
import { exists } from '@shared/helpers/exists';
import { SupaClientFangraphsConstantsTable } from '@shared/supabase/supabase-tables.model';
import { MlbAdvancedStats } from '../helpers';
import { BaseballPlayerEntity, BaseballPlayerStatsRowEntity } from '../models/baseball-player.model';

interface BaseballPlayerStatsRowProps {
  player: BaseballPlayerEntity;
  statPeriod: string;
  seasonConstants: SupaClientFangraphsConstantsTable;
}

export function transformToBaseballPlayerBatterStatsRow({
  player,
  statPeriod,
  seasonConstants,
}: BaseballPlayerStatsRowProps): BaseballPlayerStatsRowEntity | null {
  const { id, name, img, team, position, lineupSlotId, percentChange, percentOwned, percentStarted, eligibleLineupSlots } = player;

  if (!exists(player.stats)) return null;

  if (!exists(player.stats[statPeriod])) return null;

  const statsEntity = player.stats[statPeriod]!.stats;

  const { fip, wOBA, wRAA, babip, iso, leftOnBasePercent, wRC } = MlbAdvancedStats(seasonConstants, statsEntity);

  const adv = {} as Record<BaseballStat, number>;

  adv[BaseballStat.fip] = fip;
  adv[BaseballStat.wOBA] = wOBA;
  adv[BaseballStat.wRAA] = wRAA;
  adv[BaseballStat.BABIP] = babip;
  adv[BaseballStat.ISO] = iso;
  adv[BaseballStat.LOB_PCT] = leftOnBasePercent;
  adv[BaseballStat.wRC] = wRC;

  const stats = {
    ...adv,
    ...statsEntity,
    [BaseballStat.IP]: exists(statsEntity[BaseballStat.IP]) ? statsEntity[BaseballStat.IP] * 0.333 : 0,
  };

  return {
    id,
    name,
    img,
    team,
    position,
    lineupSlotId,
    percentChange,
    percentOwned,
    percentStarted,
    highlightedPlayer: false,
    eligibleLineupSlots,
    stats,
  };
}

export function addEventsToPitcherEntity(player: BaseballPlayerEntity, eventIdSet: Set<string>) {
  let playerStartingStatus = '';

  const { starterStatusByProGame } = player;

  if (starterStatusByProGame) {
    for (const [gameId, startingStatus] of Object.entries(starterStatusByProGame)) {
      const isProbable = startingStatus === PLAYER_INJURY_STATUS.Probable;

      if (eventIdSet.has(gameId)) {
        playerStartingStatus = isProbable ? PLAYER_INJURY_STATUS.Starting : startingStatus;
      }
    }
  }

  const isStarting = playerStartingStatus === PLAYER_INJURY_STATUS.Starting;

  return {
    ...player,
    isStarting,
  };
}

export function addEventsToBatterEntity(player: BaseballPlayerEntity) {
  let playerStartingStatus = '';

  const { starterStatusByProGame } = player;

  if (starterStatusByProGame) {
    const hasGames = Object.entries(starterStatusByProGame).length > 0;

    if (!hasGames) {
      playerStartingStatus = PLAYER_INJURY_STATUS.NotStarting;
    } else if (hasGames) {
      const [_, startingStatus] = Object.entries(starterStatusByProGame)[0];
      playerStartingStatus = startingStatus ?? PLAYER_INJURY_STATUS.UNKNOWN;
    }
  }

  const isStarting = playerStartingStatus === PLAYER_INJURY_STATUS.Starting;

  return {
    ...player,
    isStarting,
  };
}
