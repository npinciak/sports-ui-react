import { IClientTeamRosterEntity } from '@sdk/espn-client-models';
import { PlayerEntity } from '@shared/models';
import { FantasyPlayerEntity } from '../../models';

export interface FootballPlayerEntity extends FantasyPlayerEntity {
  lineupSlotId: number;
  // isInStartingLineup: boolean;
  // isNotInStartingLineup: boolean;
  // playerRatings: IClientPlayerRatingsMapByTimePeriod | null;
  // isPitcher: boolean;
  lineupSlot: string | null;
  // starterStatusByProGame: Record<number, PlayerCompetitionStatus> | null;
  // eligibleLineupSlots: string;
  // sportsUiId: string;
}

export interface BaseballPlayerStatsRowEntity
  extends Omit<PlayerEntity, 'teamId' | 'teamUid'>,
    // Pick<FootballPlayerEntity, 'eligibleLineupSlots' | 'percentChange' | 'percentOwned' | 'percentStarted'>,
    Pick<IClientTeamRosterEntity, 'lineupSlotId'> {
  highlightedPlayer: boolean;
  stats: Record<number, number>;
}
