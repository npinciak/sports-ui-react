import { EntityBase } from './entity.model';
import { ITeamAttributesEntity } from './team-attributes.model';

export type BaseAthleteEntity<T> = Pick<EntityBase, 'id'> & {
  fullName: T;
  displayName: T;
  shortName: T;
  headshot: T;
  jersey: T;
  position: T;
};

export interface IAthleteEntity extends BaseAthleteEntity<string> {
  team: ITeamAttributesEntity;
  lastName?: string | null;
  active: boolean;
}
