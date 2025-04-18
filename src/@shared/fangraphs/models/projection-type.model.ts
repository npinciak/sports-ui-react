export const FANGRAPHS_PROJECTION = {
  Steamer: 'steamerr',
  Steamer600: 'steamer600',
  SteamerU: 'steameru',
  RestOfSeasonZips: 'rzips',
  UpdateZips: 'uzips',
  RestOfSeasonZipsDepthChart: 'rzipsdc',
  RestOfSeasonFanGraphsDepthChart: 'rfangraphsdc',
  RestOfSeasonATCDepthChart: 'ratcdc',
  RestOfSeasonTheBat: 'rthebat',
  RestOfSeasonTheBatX: 'rthebatx',
  OopsyDc: 'roopsydc',
} as const;

export type FangraphsProjection = (typeof FANGRAPHS_PROJECTION)[keyof typeof FANGRAPHS_PROJECTION];
