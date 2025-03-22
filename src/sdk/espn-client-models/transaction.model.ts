import { ClientBaseballLineupSlot } from './baseball/lineup';

export const TRANSACTION = {
  Add: 'ADD',
  Drop: 'DROP',
  Waiver: 'WAIVER',
  Lineup: 'LINEUP',
  Roster: 'ROSTER',
  FreeAgent: 'FREEAGENT',
} as const;

export type ClientTransaction = (typeof TRANSACTION)[keyof typeof TRANSACTION];

export const TRANSACTION_LABEL_BY_TYPE = {
  [TRANSACTION.Add]: 'Add',
  [TRANSACTION.Drop]: 'Drop',
  [TRANSACTION.Waiver]: 'Waiver',
  [TRANSACTION.Lineup]: 'Lineup',
  [TRANSACTION.Roster]: 'Roster',
  [TRANSACTION.FreeAgent]: 'Free Agent',
} as const;

export const TRANSACTION_STATUS = {
  Executed: 'EXECUTED',
  Canceled: 'CANCELED',
  FailedRosterLimit: 'FAILED_ROSTERLIMIT',
} as const;

export type ClientTransactionStatus = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export const TRANSACTION_EXECUTION_TYPE = {
  Process: 'PROCESS',
  Cancel: 'CANCEL',
} as const;

export type ClientTransactionExecutionType = (typeof TRANSACTION_EXECUTION_TYPE)[keyof typeof TRANSACTION_EXECUTION_TYPE];

export interface IClientLeagueTransactionEntity {
  id: string;
  memberId: string;
  bidAmount: number;
  executionType: ClientTransactionExecutionType;
  isActingAsTeamOwner: boolean;
  isLeagueManager: boolean;
  isPending: boolean;
  items?: IClientLeagueTransactionItemEntity[] | null;
  proposedDate: number;
  rating: number;
  scoringPeriodId: number;
  status: ClientTransactionStatus;
  type: ClientTransaction;
  relatedTransactionId?: string | null;
  processDate?: number | null;
}

export interface IClientLeagueTransactionItemEntity {
  playerId: number;
  fromLineupSlotId: ClientBaseballLineupSlot;
  fromTeamId: number;
  toLineupSlotId: ClientBaseballLineupSlot;
  toTeamId: number;
  isKeeper: boolean;
  overallPickNumber: number;
  type: ClientTransaction;
}

export interface IClientTransactionCounter {
  acquisitionBudgetSpent: number;
  acquisitions: number;
  drops: number;
  matchupAcquisitionTotals: unknown;
  misc: number;
  moveToActive: number;
  moveToIR: number;
  paid: number;
  teamCharges: number;
  trades: number;
}
