import { FantasyLeague } from '../../models';
import { BaseballPlayer } from './baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from './baseball-team.model';

export type BaseballLeague = FantasyLeague & {
  teamsLive: BaseballTeamLive[];
  teams: BaseballTeam[];
  freeAgents: BaseballPlayer[];
};
