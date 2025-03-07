export interface IClientProTeamSchedule {
  display: boolean;
  settings: IClientProTeamScheduleSettings;
}

export interface IClientProTeamScheduleSettings {
  proTeams: IClientProTeamEntity[];
}

export interface IClientProTeamEntity {
  abbrev: string;
  byeWeek: number;
  id: number;
  location: string;
  name: string;
  proGamesByScoringPeriod: { [scoringPeriodId: string]: IClientProGamesByScoringPeriodEntity[] };
  universeId: number;
}

export interface IClientProGamesByScoringPeriodEntity {
  awayProTeamId: number;
  date: number;
  homeProTeamId: number;
  id: number;
  scoringPeriodId: number;
}
