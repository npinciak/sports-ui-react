import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../client';
import { FangraphsPlayerStatEntity } from './player-stats.model';
import { FangraphsPosition, FangraphsPositionType } from './positions.model';
import { FangraphsProjectionType } from './projection-type.model';
import { FangraphsTeam } from './teams.model';

export type FangraphsPageOfResponse<T> = {
  data: T[];
  dateRange: string;
  dateRangeSeason: string;
  sortDir: string;
  sortStat: string;
  totalCount: number;
};

export type FangraphsPageOfPlayerStats = FangraphsPageOfResponse<FangraphsPlayerStatEntity>;

export type FangraphsPlayerStatsRequestBody = {
  team: FangraphsTeam;
  pos: FangraphsPositionType;
  players: number[];
  statSplitPeriod: number;
  meta: {
    pageitems: number;
    pagenum: number;
  };
};

export const DEFAULT_META_DATA = {
  pageitems: DEFAULT_PAGE_SIZE,
  pagenum: DEFAULT_PAGE_NUMBER,
};

export const INITIAL_STATS_REQUEST_BODY: FangraphsPlayerStatsRequestBody = {
  team: FangraphsTeam.AllTeams,
  pos: FangraphsPosition.All,
  players: [],
  statSplitPeriod: 0,
  meta: DEFAULT_META_DATA,
};

export type FangraphsPlayerProjectionsRequestBody = {
  type: FangraphsProjectionType;
  team: FangraphsTeam;
  pos: FangraphsPositionType;
};
