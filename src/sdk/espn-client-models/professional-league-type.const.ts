import { IClientProLeagueType } from './professional-league-type.model';

export const PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE: { [key in IClientProLeagueType]: string } = {
  [IClientProLeagueType.MLB]: 'MLB',
  [IClientProLeagueType.NCAAF]: 'NCAAF',
  [IClientProLeagueType.NFL]: 'NFL',
  [IClientProLeagueType.NBA]: 'NBA',
  [IClientProLeagueType.NHL]: 'NHL',
} as const;

export const PRO_LEAGUE_TYPE_BY_PRO_LEAGUE_ABBREV: Record<string, IClientProLeagueType> = {
  MLB: IClientProLeagueType.MLB,
  NCAAF: IClientProLeagueType.NCAAF,
  NFL: IClientProLeagueType.NFL,
  NBA: IClientProLeagueType.NBA,
  NHL: IClientProLeagueType.NHL,
} as const;

