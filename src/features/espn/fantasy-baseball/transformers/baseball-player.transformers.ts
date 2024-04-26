import { BaseballStat, exists } from 'sports-ui-sdk';
import { SupaClientFangraphsConstantsTable } from '../../../../@shared/supabase/supabase-tables.model';
import { MlbAdvancedStats } from '../helpers';
import { BaseballPlayer, BaseballPlayerStatsRow } from '../models/baseball-player.model';

export function transformToBaseballPlayerBatterStatsRow(
  player: BaseballPlayer,
  statPeriod: string,
  seasonConst: SupaClientFangraphsConstantsTable
): BaseballPlayerStatsRow | null {
  const {
    id,
    name,
    injured,
    injuryStatus,
    img,
    team,
    position,
    lineupSlotId,
    percentChange,
    percentOwned,
    percentStarted,
    eligibleLineupSlots,
  } = player;

  if (!exists(player.stats)) return null;
  if (!exists(player.stats[statPeriod])) return null;

  const statsEntity = player.stats[statPeriod]!.stats;

  const { fip, wOBA, wRAA, babip, iso, leftOnBasePercent, wRC } = MlbAdvancedStats(seasonConst, statsEntity);

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
    injured,
    injuryStatus,
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
