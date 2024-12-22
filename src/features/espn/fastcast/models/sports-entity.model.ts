import { EntityBase } from './entity.model';
import { ILeaguesEntity } from './leagues-entity.model';

export interface ISportsEntity extends Omit<EntityBase, 'abbreviation'> {
  leagues: ILeaguesEntity[];
}
