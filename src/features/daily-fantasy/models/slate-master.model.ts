import { DfsSite } from './dfs-site.model';

export type SlateMasterBySiteMap = Record<DfsSite, Record<string, SlateMasterEntity>>;

export type SlateMasterEntity = {
  date: string;
  importId: string;
  name: string;
  games: SlateMasterGameEntity[];
  start: string;
  type: string;
  salaryCap: number;
  slate_path: string;
};

export type SlateMasterGameEntity = {
  date: string;
  time: string;
  scheduleId: string;
  rgScheduleId: string;
  teamAwayId: string;
  rgTeamAwayId: string;
  teamHomeId: string;
  rgTeamHomeId: string;
  teamAwayHashtag: string;
  teamHomeHashtag: string;
};
