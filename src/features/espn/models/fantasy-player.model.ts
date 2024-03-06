import { PlayerInjuryStatus, PlayerStatsYear } from 'sports-ui-sdk';
import { PlayerEntity } from '../../../@shared/models';

export type FantasyPlayer = PlayerEntity & {
  lastNewsDate: number;
  injured: boolean;
  injuryStatus: PlayerInjuryStatus;
  defaultPositionId: number;
  percentOwned: number;
  percentChange: number;
  percentStarted: number;
  stats: { [year: string]: PlayerStatsYear | null } | null;
  outlookByWeek: FantasyPlayerOutlookByWeek[];
};

type FantasyPlayerOutlookByWeek = {
  week: number;
  outlook: string;
};
