import { IFantasyLeague } from '../../models';
import { FootballTeamNoRosterEntity } from './football-team.model';

export interface FootballLeague extends IFantasyLeague {
  teamsLive: unknown[];
  teams: FootballTeamNoRosterEntity[];
  freeAgents: unknown[];
  transactions: unknown[];
}
