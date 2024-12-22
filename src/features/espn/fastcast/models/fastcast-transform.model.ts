import { FastcastEvent } from './fastcast-event.model';
import { FastcastLeague } from './fastcast-league.model';
import { IFastcastSportEntity } from './fastcast-sport.model';
import { FastcastEventTeam } from './fastcast-team.model';

export interface FastcastTransform {
  sportsList: IFastcastSportEntity[];
  leagueList: FastcastLeague[];
  eventList: FastcastEvent[];
  teamList?: FastcastEventTeam[];
}
