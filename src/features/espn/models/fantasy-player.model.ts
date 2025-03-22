import { IClientPlayerStatsYearEntity } from '@sdk/espn-client-models';
import { InjurySeverity } from '@sdk/injury';
import { PlayerCompetitionStatus } from '@sdk/injury/injury-status.model';
import { PlayerEntity } from '@shared/models';

export interface FantasyPlayerEntity extends PlayerEntity {
  sportsUiId: string;
  lastNewsDate: number | null;
  health: FantasyPlayerHealth | null;
  defaultPositionId: number | null;
  percentOwned: number | null;
  percentChange: number | null;
  percentStarted: number | null;
  stats: { [year: string]: IClientPlayerStatsYearEntity | null } | null;
  outlookByWeek: FantasyPlayerOutlookByWeek[];
}

export interface FantasyPlayerHealth {
  isActive: boolean;
  isHealthy: boolean;
  isInjured: boolean;
  injuryStatus: PlayerCompetitionStatus;
  injurySeverity: InjurySeverity;
}

interface FantasyPlayerOutlookByWeek {
  week: number;
  outlook: string;
}
