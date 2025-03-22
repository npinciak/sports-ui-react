import { IClientTeamEntity } from '@sdk/espn-client-models';
import { IClientTransactionCounter } from '@sdk/espn-client-models/transaction.model';
import { TeamEntity } from '@shared/models';
import { BaseballPlayerEntity } from './baseball-player.model';

export interface BaseballTeamEntity extends TeamEntity, Pick<IClientTeamEntity, 'valuesByStat' | 'pointsByStat'> {
  abbrev: string;
  roster: BaseballPlayerEntity[];
  totalPoints: number;
  currentRank: number;
  liveScore: number | null;
  hasTradeablePlayers: boolean;
  transactionCounter: IClientTransactionCounter;
}

export interface BaseballTeamNoRosterEntity extends Omit<BaseballTeamEntity, 'roster'> {}

export interface BaseballTeamLiveEntity extends Pick<BaseballTeamEntity, 'id' | 'totalPoints' | 'liveScore' | 'roster'> {}
