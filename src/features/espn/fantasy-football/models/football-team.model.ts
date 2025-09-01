import { IClientTeamEntity } from '@sdk/espn-client-models';
import { IClientTransactionCounter } from '@sdk/espn-client-models/transaction.model';
import { TeamEntity } from '@shared/models';

export interface FootballTeamEntity extends TeamEntity, Pick<IClientTeamEntity, 'valuesByStat' | 'pointsByStat'> {
  abbrev: string;
  roster: unknown[];
  totalPoints: number;
  currentRank: number;
  liveScore: number | null;
  hasTradeablePlayers: boolean;
  transactionCounter: IClientTransactionCounter;
}

export interface FootballTeamNoRosterEntity extends Omit<FootballTeamEntity, 'roster'> {}
