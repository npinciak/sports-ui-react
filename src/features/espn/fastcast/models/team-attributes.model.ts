import { EntityBase } from './entity.model';

export interface ITeamAttributesEntity extends Pick<EntityBase, 'id' | 'abbreviation'> {}
