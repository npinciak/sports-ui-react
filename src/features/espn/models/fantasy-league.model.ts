import { LeagueTransaction } from 'sports-ui-sdk';

export type FantasyLeague = {
  id: string;
  seasonId: string;
  scoringPeriodId: string;
  firstScoringPeriod: string;
  finalScoringPeriod: string;
  matchupPeriodCount: string;
  transactions: LeagueTransaction[];
};
