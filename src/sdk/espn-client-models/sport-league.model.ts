import { IClientProLeagueType } from './professional-league-type.model';

export const SPORT_LEAGUE = {
  MLB: 'mlb',
  NFL: 'nfl',
  NHL: 'nhl',
  NBA: 'nba',
} as const;

export type SportLeague = (typeof SPORT_LEAGUE)[keyof typeof SPORT_LEAGUE];

export const SPORT_LEAGUE_BY_PRO_LEAGUE_TYPE: { [key in IClientProLeagueType]: SportLeague } = {
  [IClientProLeagueType.MLB]: SPORT_LEAGUE.MLB,
  [IClientProLeagueType.NCAAF]: SPORT_LEAGUE.NFL,
  [IClientProLeagueType.NFL]: SPORT_LEAGUE.NFL,
  [IClientProLeagueType.NBA]: SPORT_LEAGUE.NBA,
  [IClientProLeagueType.NHL]: SPORT_LEAGUE.NHL,
};
