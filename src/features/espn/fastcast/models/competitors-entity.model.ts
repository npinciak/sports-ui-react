import { IAthleteActionEntity } from './athlete-action-entity.model';
import { IEntityBase } from './entity.model';
import { ILeaderEntity } from './leader.model';
import { IRecordEntity } from './record-entity.model';
import { IUniformEntity } from './uniform.model';

export interface ICompetitorsEntity extends Omit<IEntityBase, 'slug' | 'shortName'> {
  type: string;
  order: number;
  homeAway: 'home' | 'away';
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
  goalieSummary?: IAthleteActionEntity[] | null;
  shortenedRecord?: string | null;
  scoringSummary?: IAthleteActionEntity[] | null;
  advance?: boolean | null;
  form?: string | null;
  isNational?: boolean | null;
  uniform?: IUniformEntity | null;
  seriesRecord?: string | null;
}
