export const TRANSACTION = {
  Add: 'ADD',
  Drop: 'DROP',
  Waiver: 'WAIVER',
  Lineup: 'LINEUP',
  Roster: 'ROSTER',
  FreeAgent: 'FREEAGENT',
} as const;

export type IClientTransaction = (typeof TRANSACTION)[keyof typeof TRANSACTION];

export interface IClientLeagueTransaction {
  id: string;
  memberId: string;
  bidAmount: number;
  executionType: 'PROCESS' | 'CANCEL';
  isActingAsTeamOwner: boolean;
  isLeagueManager: boolean;
  isPending: boolean;
  items?: IClientLeagueTransactionEntity[] | null;
  proposedDate: number;
  rating: number;
  scoringPeriodId: number;
  status: 'EXECUTED' | 'CANCELED';
  type: IClientTransaction;
  relatedTransactionId?: string | null;
  processDate?: number | null;
}

export interface IClientLeagueTransactionEntity {
  plyerId: number;
  fromLineupSlotId: number;
  fromTeamId: number;
  toLineupSlotId: number;
  toTeamId: number;
  isKeeper: boolean;
  overallPickNumber: number;
  type: IClientTransaction;
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
