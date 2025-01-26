import { IFantasyLeague } from '../../models';
import { BaseballPlayer } from './baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from './baseball-team.model';

export type BaseballLeague = IFantasyLeague & {
  teamsLive: BaseballTeamLive[];
  teams: Omit<BaseballTeam, 'roster'>[];
  freeAgents: BaseballPlayer[];
};
