import { PlayerCardEntity, PlayerInjuryStatus, PlayerRatings, TeamRosterEntry } from 'sports-ui-sdk';
import { PlayerEntity } from '../../../../@shared/models';
import { FantasyPlayer } from '../../models';

export interface BaseballPlayerProps {
  isStarting: boolean;
  playerRatings: PlayerRatings | undefined;
  percentChange: number | null;
  percentOwned: number | null;
  isPitcher: boolean;
  lineupSlot: string | null;
  starterStatusByProGame: Record<number, PlayerInjuryStatus> | null;
  eligibleLineupSlots: string;
}

export type BaseballPlayer = FantasyPlayer & BaseballPlayerProps & Pick<TeamRosterEntry, 'lineupSlotId'>;

export type BaseballPlayerCard = Omit<BaseballPlayer, 'lineupSlotId' | 'lineupSlot'> &
  Pick<PlayerCardEntity['player'], 'stance' | 'laterality'> & { playerCardImage: string };

export type BaseballPlayerMap = Record<string, BaseballPlayer>;

export type BaseballPlayerStatsRow = Omit<PlayerEntity, 'teamId' | 'teamUid'> &
  Pick<BaseballPlayer, 'eligibleLineupSlots' | 'injured' | 'injuryStatus' | 'percentChange' | 'percentOwned' | 'percentStarted'> &
  Pick<TeamRosterEntry, 'lineupSlotId'> & {
    highlightedPlayer: boolean;
    stats: Record<number, number>;
  };

export type BaseballPlayerLiveStatsRow = Omit<PlayerEntity, 'teamId' | 'teamUid'> &
  Pick<BaseballPlayer, 'eligibleLineupSlots' | 'injured' | 'injuryStatus' | 'isPitcher'> &
  Pick<TeamRosterEntry, 'lineupSlotId'> & { stats: Record<number, number> | null };
