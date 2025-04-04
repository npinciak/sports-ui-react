export const SPORT_TYPE = {
  Baseball: '1',
  Football: '20',
  Soccer: '600',
  Basketball: '40',
  Hockey: '70',
} as const;

export type IClientSportType = (typeof SPORT_TYPE)[keyof typeof SPORT_TYPE];
