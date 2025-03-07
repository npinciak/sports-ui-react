import { IClientTeamRoster } from './team-roster.model';
import { IClientTransactionCounter } from './transaction.model';

export interface IClientTeamEntity {
  id: number;
  teamId: number;
  totalPoints: number;
  totalPointsLive: number;
  totalProjectedPointsLive: number;
  rosterForCurrentScoringPeriod: IClientTeamRoster;
  abbrev: string;
  name: string;
  roster: IClientTeamRoster;
  points: number;
  logo: string;
  playoffSeed: number;
  draftDayProjectedRank: number;
  currentProjectedRank: number;
  rankCalculatedFinal: number;
  pointsByStat: Record<number, number>;
  valuesByStat: Record<number, number>;
  tradeBlock: IClientTradeBlockEntity;
  transactionCounter: IClientTransactionCounter;
}

export const TRADE_BLOCK_STATUS = {
  UNTOUCHABLE: 'UNTOUCHABLE',
  ON_THE_BLOCK: 'ON_THE_BLOCK',
} as const;

export type IClientTradeBlockStatus = (typeof TRADE_BLOCK_STATUS)[keyof typeof TRADE_BLOCK_STATUS];

interface IClientTradeBlockEntity {
  players: Record<string, IClientTradeBlockStatus> | undefined;
}

export interface IClientBaseballTeam extends IClientTeamEntity {
  record: string;
}
