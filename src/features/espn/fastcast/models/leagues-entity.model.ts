import { IEntityBase } from './entity.model';
import { IEventsEntity } from './events-entity.model';

export interface ILeaguesEntity extends IEntityBase {
  isTournament: boolean;
  events?: IEventsEntity[];
}
