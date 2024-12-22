import { IAthleteEntity } from './athlete-entity.model';

export interface IAthleteActionEntity {
  athlete: IAthleteEntity;
  displayValue: string;
}

export interface IGoalieSummaryEntity extends IAthleteActionEntity {}
export interface IScoringEntity extends IAthleteActionEntity {}
