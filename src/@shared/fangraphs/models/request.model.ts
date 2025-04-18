import { DEFAULT_META_DATA } from '../client/fangraphs.client.model';
import { FangraphsPlayerStatEntity } from './player-stats.model';
import { FANGRAPHS_POSITION, FangraphsPositionType } from './positions.model';
import { FangraphsProjection } from './projection-type.model';
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

export const FANGRAPHS_BOOLEAN_VALUES = {
  FALSE: '0',
  TRUE: '1',
} as const;
export type FangraphsBooleanValue = (typeof FANGRAPHS_BOOLEAN_VALUES)[keyof typeof FANGRAPHS_BOOLEAN_VALUES];

export interface IClientFangraphsStatsRequestBodyBase {
  team: FangraphsTeam;
  pos: FangraphsPositionType;
  stats: 'bat' | 'pit' | 'fld';
  lg: 'all' | 'nl' | 'al';
  players: number[];
  pageitems: string;
  pagenum: string;
  month: string;
  age: string;
  hand: 'r' | 'l' | 's' | '';
  ind: string;
  rost: FangraphsBooleanValue;
  type: string;
  postseason: string;
  sortdir?: string;
  sortstat?: string;
  season: number;
  season1: number;
  startdate: string;
  enddate: string;
  qual: 'y' | 'n';
}

export interface IClientFangraphsProjectionsRequestBodyBase {
  stats: 'bat' | 'pit' | 'fld';
  type: FangraphsProjection;
  team: FangraphsTeam;
  pos: FangraphsPositionType;
  players: number[];
  lg: 'all' | 'nl' | 'al';
}

function FangraphsBaseRequestBody() {
  return class FangraphsBaseRequestBodyClass {
    static playerIds: number[] = [];

    private static readonly DEFAULT: {};

    private static readonly currentSeason = new Date().getFullYear();

    static get requestBody(): IClientFangraphsStatsRequestBodyBase {
      return {
        team: FangraphsTeam.AllTeams,
        pos: FANGRAPHS_POSITION.All,
        stats: 'bat',
        lg: 'all',
        players: FangraphsBaseRequestBodyClass.playerIds,
        pageitems: '30',
        pagenum: '1',
        month: '0',
        age: '',
        hand: '',
        ind: FANGRAPHS_BOOLEAN_VALUES.FALSE,
        rost: FANGRAPHS_BOOLEAN_VALUES.FALSE,
        type: '8',
        postseason: '',
        season: FangraphsBaseRequestBodyClass.currentSeason,
        season1: FangraphsBaseRequestBodyClass.currentSeason,
        startdate: `${FangraphsBaseRequestBodyClass.currentSeason}-03-01`,
        enddate: `${FangraphsBaseRequestBodyClass.currentSeason}-11-01`,
        qual: 'n',
      };
    }
  };
}

export class FangraphsPlayerStatsRequest extends FangraphsBaseRequestBody() {}

export class FangraphsPlayerProjectionsRequest extends FangraphsBaseRequestBody() {}

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

export type FangraphsPlayerProjectionsRequestBody = {
  type: FangraphsProjection;
  team: FangraphsTeam;
  pos: FangraphsPositionType;
  players: number[];
};

export const INITIAL_STATS_REQUEST_BODY: FangraphsPlayerStatsRequestBody = {
  team: FangraphsTeam.AllTeams,
  pos: FANGRAPHS_POSITION.All,
  players: [],
  statSplitPeriod: 0,
  meta: DEFAULT_META_DATA,
};
