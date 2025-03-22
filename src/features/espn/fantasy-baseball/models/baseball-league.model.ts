import { IFantasyLeague } from '../../models';
import { BaseballPlayerEntity } from './baseball-player.model';
import { BaseballTeamLiveEntity, BaseballTeamNoRosterEntity } from './baseball-team.model';
import { BaseballTransactionEntity } from './baseball-transaction.model';

export interface BaseballLeague extends IFantasyLeague {
  teamsLive: BaseballTeamLiveEntity[];
  teams: BaseballTeamNoRosterEntity[];
  freeAgents: BaseballPlayerEntity[];
  transactions: BaseballTransactionEntity[];
}
