import { ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup';
import { ClientTransaction, ClientTransactionExecutionType, ClientTransactionStatus } from '@sdk/espn-client-models/transaction.model';

export interface BaseballTransactionEntity {
  id: string;
  processedBy: string;
  bidAmount: number;
  executionType: ClientTransactionExecutionType;
  isPending: boolean;
  status: ClientTransactionStatus;
  type: ClientTransaction;
  transactionProcessDateTimestamp: number | null;
  transactionProposedDateTimestamp: number | null;
  transactionProcessDate: string | null;
  transactionProposedDate: string | null;
  items: BaseballTransactionItem[];
}

export interface BaseballTransactionItem {
  fromLineupSlot: string | null;
  fromLineupSlotId: ClientBaseballLineupSlot;
  toLineupSlot: string | null;
  toLineupSlotId: ClientBaseballLineupSlot;
  fromTeamId: string;
  toTeamId: string;
  playerId: string;
  playerName: string | null;
  type: ClientTransaction;
}
