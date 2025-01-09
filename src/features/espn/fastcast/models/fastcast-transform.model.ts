import { FastcastEvent } from './fastcast-event.model';
import { UIFastcastLeague } from './fastcast-league.model';
import { IFastcastSportEntity } from './fastcast-sport.model';

export interface UIFastcast {
  fastcastSports: IFastcastSportEntity[];
  fastcastLeagues: UIFastcastLeague[];
  fastcastEvents: FastcastEvent[];
}
