const BASE_FILTERS = {
  Basic: 'basic',
  Advanced: 'advanced',
} as const;

export const PITCHER_FILTERS = {
  ...BASE_FILTERS,
  BattedBall: 'battedBall',
  StrikeoutWalkRates: 'strikeoutWalkRate',
  HomerunRates: 'homerunRates',
};

export const BATTER_FILTERS = {
  ...BASE_FILTERS,
  BattedBall: 'battedBall',
};


