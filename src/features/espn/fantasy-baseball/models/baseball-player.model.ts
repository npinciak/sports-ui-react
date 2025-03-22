import { IClientPlayerRatingsMapByTimePeriod, IClientTeamRosterEntity } from '@sdk/espn-client-models';
import { PlayerCompetitionStatus } from '@sdk/injury/injury-status.model';
import { FangraphsPlayerProjectionEntity } from '@shared/fangraphs/models/player-projections.model';
import { PlayerEntity } from '@shared/models';
import { FantasyPlayerEntity } from '../../models';

export interface BaseballPlayerEntity extends FantasyPlayerEntity {
  lineupSlotId: number;
  isStarting: boolean;
  startingStatus: string | null;
  playerRatings: IClientPlayerRatingsMapByTimePeriod | null;
  isPitcher: boolean;
  lineupSlot: string | null;
  starterStatusByProGame: Record<number, PlayerCompetitionStatus> | null;
  eligibleLineupSlots: string;
  sportsUiId: string;
}

export interface BaseballPlayerStatsRowEntity
  extends Omit<PlayerEntity, 'teamId' | 'teamUid'>,
    Pick<BaseballPlayerEntity, 'eligibleLineupSlots' | 'percentChange' | 'percentOwned' | 'percentStarted'>,
    Pick<IClientTeamRosterEntity, 'lineupSlotId'> {
  highlightedPlayer: boolean;
  stats: Record<number, number>;
}

export interface BaseballPlayerWithFangraphsEntity extends BaseballPlayerEntity {
  fangraphsProjection: FangraphsPlayerProjectionEntity | null;
}
