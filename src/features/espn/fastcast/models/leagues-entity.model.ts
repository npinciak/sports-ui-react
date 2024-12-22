import { EntityBase } from './entity.model';
import { IEventsEntity } from './events-entity.model';

export interface ILeaguesEntity extends EntityBase {
  isTournament: boolean;
  events?: IEventsEntity[];
}
