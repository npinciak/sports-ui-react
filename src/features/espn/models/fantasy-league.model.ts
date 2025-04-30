export interface IFantasyLeague {
  id: string;
  name: string;
  size: number;
  scoringType: 'ROTO';
  seasonId: string;
  scoringPeriodId: string;
  firstScoringPeriod: string;
  finalScoringPeriod: string;
  matchupPeriodCount: string;
}
