import { ISportsEntity } from './sports-entity.model';

export interface IFastcastSportEntity extends Omit<ISportsEntity, 'leagues' | 'shortName'> {}
