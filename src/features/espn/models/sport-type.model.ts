export const SPORT_TYPE_ID = {
  Baseball: '1',
  Football: '20',
  Soccer: '600',
  Basketball: '40',
  Hockey: '70',
} as const;

export const SPORT_TYPE_NAME = {
  BASEBALL: 'baseball',
  FOOTBALL: 'football',
  SOCCER: 'soccer',
  BASKETBALL: 'basketball',
  HOCKEY: 'hockey',
} as const;

export const SPORT_TYPE_NAME_MAP = {
  [SPORT_TYPE_ID.Baseball]: SPORT_TYPE_NAME.BASEBALL,
  [SPORT_TYPE_ID.Football]: SPORT_TYPE_NAME.FOOTBALL,
  [SPORT_TYPE_ID.Soccer]: SPORT_TYPE_NAME.SOCCER,
  [SPORT_TYPE_ID.Basketball]: SPORT_TYPE_NAME.BASKETBALL,
  [SPORT_TYPE_ID.Hockey]: SPORT_TYPE_NAME.HOCKEY,
} as const;

export type SportTypeId = (typeof SPORT_TYPE_ID)[keyof typeof SPORT_TYPE_ID];
