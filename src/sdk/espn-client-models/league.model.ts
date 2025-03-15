import { IClientFreeAgentEntity } from './free-agent.model';
import { IClientLeagueCommunication } from './league-communication.model';
import { IClientScheduleEntity } from './schedule.model';
import { IClientBaseballTeam, IClientTeamEntity } from './team.model';
import { IClientLeagueTransactionEntity } from './transaction.model';

export interface IClientLeague {
  id: number;
  scoringPeriodId: number;
  seasonId: number;
  schedule: IClientScheduleEntity[];
  status: {
    firstScoringPeriod: number;
    finalScoringPeriod: number;
  };
  settings: IClientLeagueSettings;
  teams: IClientTeamEntity[];
  players: IClientFreeAgentEntity[];
  communication: IClientLeagueCommunication;
  transactions: IClientLeagueTransactionEntity[];
}

export interface IClientBaseballLeague extends Omit<IClientLeague, 'teams'> {
  teams: IClientBaseballTeam[];
}

export type IClientLeagueStatus = { firstScoringPeriod: number; finalScoringPeriod: number };
export type IClientLeagueScheduleSettings = { matchupPeriodCount: number; playoffMatchupPeriodLength: number };
export type IClientLeagueRosterSettings = { positionLimits: Record<string, number>; lineupSlotCounts: Record<string, number> };

export interface IClientLeagueSettings {
  name: string;
  rosterSettings: IClientLeagueRosterSettings;
  scheduleSettings: IClientLeagueScheduleSettings;
}
