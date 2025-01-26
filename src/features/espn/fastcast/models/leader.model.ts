import { IAthleteEntity } from './athlete-entity.model';
import { ITeamAttributesEntity } from './team-attributes.model';

export interface ILeaderEntity {
  displayValue: string;
  value: number;
  athlete: IAthleteEntity;
  team: ITeamAttributesEntity;
}
