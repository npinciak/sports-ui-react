import { PlayerCardEntity, PlayerStatsYear, TeamRosterEntry } from 'sports-ui-sdk';
import { FantasyPlayer } from '../../models/fantasy-player.model';

export type FootballPlayerAttributes = {
  lineupSlot: string | null;
  outlookByWeek: PlayerOutlookByWeek[];
  eligibleLineupSlots?: string;
};

export type FootballPlayer = FantasyPlayer & FootballPlayerAttributes & Pick<TeamRosterEntry, 'lineupSlotId'>;
export type FootballPlayerFreeAgent = FootballPlayer & Omit<FootballPlayer, 'lineupSlotId'>;

export type FootballPlayerStatsRow = Pick<
  FootballPlayer,
  | 'id'
  | 'name'
  | 'position'
  | 'team'
  | 'lineupSlotId'
  | 'injured'
  | 'injuryStatus'
  | 'img'
  | 'percentChange'
  | 'percentOwned'
  | 'defaultPositionId'
> &
  Pick<PlayerStatsYear, 'stats' | 'appliedTotal' | 'appliedAverage' | 'appliedTotalCeiling'> & { highlightedPlayer: boolean };

export type FootballPlayerCard = Omit<FootballPlayer, 'lineupSlotId' | 'lineupSlot'> &
  Pick<PlayerCardEntity['player'], 'stance' | 'laterality'> & { playerCardImage: string };

export type PlayerOutlookByWeek = {
  week: number;
  outlook: string | null;
};
