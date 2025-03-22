export interface IClientPlayerStatsYearEntity {
  id: string;
  externalId: string;
  seasonId: number;
  statSplitTypeId: number;
  scoringPeriodId: number;
  stats: IClientPlayerStat;
  appliedAverage: number | null;
  appliedTotal: number | null;
  appliedTotalCeiling: number | null;
}

export type IClientPlayerStat = Record<number, number>;
export type IClientPlayerStatMap = Record<string, IClientPlayerStat>;
export type IClientPlayerStatsByYearMap = Record<string, IClientPlayerStatsYearEntity>;
