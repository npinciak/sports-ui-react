export enum ScoringPeriodId {
  Season,
  Last7,
  Last15,
  Last30,
  Average,
  Live,
  RestOfSeason,
  Projected = 10,
  ProjectedWeek,
  BatterVsPitcher = 1000,
}

export const StatTypePeriodIdMap: { [key in ScoringPeriodId]: string } = {
  [ScoringPeriodId.Season]: 'Season',
  [ScoringPeriodId.Last7]: 'Last 7',
  [ScoringPeriodId.Last15]: 'Last 15',
  [ScoringPeriodId.Last30]: 'Last 30',
  [ScoringPeriodId.Average]: 'Average',
  [ScoringPeriodId.Live]: 'Live',
  [ScoringPeriodId.RestOfSeason]: 'Rest Of Season',
  [ScoringPeriodId.Projected]: 'Projected',
  [ScoringPeriodId.ProjectedWeek]: 'Projected Week',
  [ScoringPeriodId.BatterVsPitcher]: 'BVP',
} as const;
