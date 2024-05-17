export const FangraphsProjection = {
  Steamer: 'steamerr',
  SteamerU: 'steameru',
  RestOfSeasonZips: 'rzips',
  UpdateZips: 'uzips',
  RestOfSeasonZipsDepthChart: 'rzipsdc',
  RestOfSeasonFanGraphsDepthChart: 'rfangraphsdc',
  RestOfSeasonATCDepthChart: 'ratcdc',
  RestOfSeasonTheBat: 'rthebat',
  RestOfSeasonTheBatX: 'rthebatx',
} as const;

export type FangraphsProjectionType = (typeof FangraphsProjection)[keyof typeof FangraphsProjection];
