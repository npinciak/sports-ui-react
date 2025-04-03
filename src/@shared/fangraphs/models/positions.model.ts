export const FANGRAPHS_POSITION = {
  All: 'all',
  NonPitchers: 'np',
  C: 'c',
  '1B': '1b',
  '2B': '2b',
  '3B': '3b',
  SS: 'ss',
  LF: 'lf',
  CF: 'cf',
  RF: 'rf',
  OF: 'of',
  DH: 'dh',
  P: 'p',
} as const;

export type FangraphsPositionType = (typeof FANGRAPHS_POSITION)[keyof typeof FANGRAPHS_POSITION];
