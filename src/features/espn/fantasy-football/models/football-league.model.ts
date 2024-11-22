import { EspnClient } from 'sports-ui-sdk';
import { FantasyLeague } from '../../models/fantasy-league.model';
import { FootballTeam } from './football-team.model';

export interface FootballLeague extends FantasyLeague {
  teams: FootballTeam[];
  schedule: EspnClient.ScheduleEntity[];
}
