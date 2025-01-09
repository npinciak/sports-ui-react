import { IEntityBase } from './entity.model';

export interface ITeamAttributesEntity extends Pick<IEntityBase, 'id' | 'abbreviation'> {}
