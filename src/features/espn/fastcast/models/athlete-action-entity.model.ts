import { IAthleteEntity } from './athlete-entity.model';

export interface IAthleteActionEntity {
  athlete: IAthleteEntity;
  displayValue: string;
}
