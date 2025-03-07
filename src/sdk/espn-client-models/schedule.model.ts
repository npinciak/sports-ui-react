import { IClientTeamEntity } from './team.model';

export const SCHEDULE_WINNER = {
  HOME: 'HOME',
  AWAY: 'AWAY',
  UNDECIDED: 'UNDECIDED',
} as const;

export interface IClientScheduleEntity {
  id: number;
  matchupPeriodId: number;
  home: IClientScheduleTeamEntity;
  away: IClientScheduleTeamEntity;
  winner: ScheduleWinnerType;
  teams?: IClientScheduleTeamEntity[];
}

export type ScheduleWinnerType = (typeof SCHEDULE_WINNER)[keyof typeof SCHEDULE_WINNER];

export interface IClientScheduleTeamEntity extends Pick<IClientTeamEntity, 'teamId' | 'totalPoints' | 'rosterForCurrentScoringPeriod'> {
  totalProjectedPointsLive?: number;
  totalPointsLive?: number;
  cumulativeScore: IClientTeamCumulativeScore;
}

type CumulativeScoreAttributes = 'wins' | 'lossses' | 'ties';
export type IClientTeamCumulativeScore = { [key in CumulativeScoreAttributes]: number };
