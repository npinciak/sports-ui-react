import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup';
import {
  ClientTransaction,
  ClientTransactionExecutionType,
  ClientTransactionStatus,
  TRANSACTION,
} from '@sdk/espn-client-models/transaction.model';

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
  toTeamAbbrev: string | null;
  fromTeamAbbrev: string | null;
  toTeamId: string;
  playerId: string;
  playerName: string | null;
  playerHeadshot: string | null;
  playerPosition: string | null;
  type: ClientTransaction;
}

export const TRANSACTION_ICON_BY_TYPE = {
  [TRANSACTION.Add]: <AddCircleIcon className="text-green-600" />,
  [TRANSACTION.Drop]: <RemoveCircleIcon className="text-red-600" />,
  [TRANSACTION.Waiver]: null,
  [TRANSACTION.Lineup]: null,
  [TRANSACTION.Roster]: null,
  [TRANSACTION.FreeAgent]: null,
} as const;
