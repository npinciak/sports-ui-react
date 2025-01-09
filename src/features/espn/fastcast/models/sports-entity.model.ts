import { IEntityBase } from './entity.model';
import { ILeaguesEntity } from './leagues-entity.model';

export interface ISportsEntity extends Omit<IEntityBase, 'abbreviation'> {
  leagues: ILeaguesEntity[];
}
