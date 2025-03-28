export const SEASON_TYPE = {
  Preseason: '1',
  Regular: '2',
  Postseason: '3',
  AllStar: '4',
  OffSeason: '5',
  Unknown: '6',
} as const;

export const SEASON_TYPE_LIST = Object.values(SEASON_TYPE);

export type ClientSeasonType = (typeof SEASON_TYPE)[keyof typeof SEASON_TYPE];
