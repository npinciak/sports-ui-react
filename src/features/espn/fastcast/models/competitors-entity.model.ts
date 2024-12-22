import { IGoalieSummaryEntity, IScoringEntity } from './athlete-action-entity.model';
import { EntityBase } from './entity.model';
import { ILeaderEntity } from './leader.model';
import { IRecordEntity } from './record-entity.model';
import { IUniformEntity } from './uniform.model';

export interface ICompetitorsEntity extends Omit<EntityBase, 'slug' | 'shortName'> {
  type: string;
  order: number;
  homeAway: string;
  score: string;
  aggregateScore?: number;
  record?: string | IRecordEntity[];
  logo: string;
  logoDark: string;
  winner: boolean;
  displayName: string;
  location: string;
  color?: string;
  alternateColor?: string | null;
  group: string;
  competitionIdPrevious: string;
  competitionIdNext?: string | null;
  rank?: number | null;
  leaders?: ILeaderEntity[] | null;
  goalieSummary?: IGoalieSummaryEntity[] | null;
  shortenedRecord?: string | null;
  scoringSummary?: IScoringEntity[] | null;
  advance?: boolean | null;
  form?: string | null;
  isNational?: boolean | null;
  uniform?: IUniformEntity | null;
  seriesRecord?: string | null;
}
