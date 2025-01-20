export const SPORT_TYPE_ID = {
  BASEBALL: '1',
  FOOTBALL: '20',
  BASKETBALL: '40',
  HOCKEY: '70',
  SOCCER: '600',
  TENNIS: '850',
  GOLF: '1100',
} as const;

export const SPORT_TYPE_NAME = {
  BASEBALL: 'baseball',
  FOOTBALL: 'football',
  SOCCER: 'soccer',
  BASKETBALL: 'basketball',
  HOCKEY: 'hockey',
} as const;

export type SportTypeId = (typeof SPORT_TYPE_ID)[keyof typeof SPORT_TYPE_ID];

export const SPORT_TYPE_ID_INCLUDE_LIST = [
  SPORT_TYPE_ID.BASEBALL,
  SPORT_TYPE_ID.FOOTBALL,
  SPORT_TYPE_ID.SOCCER,
  SPORT_TYPE_ID.BASKETBALL,
  SPORT_TYPE_ID.HOCKEY,
];
