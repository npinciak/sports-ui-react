import { FangraphsPlayerStatEntity } from './player-stats.model';
import { FangraphsPositionType } from './positions.model';
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
  meta: {
    pageitems: number;
    pagenum: number;
  };
};

export type FangraphsPlayerProjectionsRequestBody = {
  type: FangraphsProjectionType;
  team: FangraphsTeam;
  pos: FangraphsPositionType;
};
