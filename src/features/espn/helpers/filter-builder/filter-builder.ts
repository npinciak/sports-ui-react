import { BATTING_LINEUP_SLOTS, ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup';
import { ClientTransaction, TRANSACTION } from '@sdk/espn-client-models/transaction.model';

export interface BaseballPlayersFilter {
  filterStatus?: { value: string[] };
  filterSlotIds?: { value: ClientBaseballLineupSlot[] };
  filterRanksForScoringPeriodIds?: { value: number[] };
  sortPercOwned?: { sortPriority: number; sortAsc: boolean };
  sortDraftRanks?: { sortPriority: number; sortAsc: boolean; value: string };
  limit?: number;
  filterStatsForTopScoringPeriodIds?: { value: number; additionalValue: string[] };
}

export interface EspnPlayerFilter {
  players?: BaseballPlayersFilter;
}

export const DEFAULT_FILTER: EspnPlayerFilter = {
  players: {
    filterStatus: { value: [TRANSACTION.FreeAgent, TRANSACTION.Waiver] },
    filterSlotIds: { value: [...BATTING_LINEUP_SLOTS, ClientBaseballLineupSlot.IF] },
    filterRanksForScoringPeriodIds: { value: [60] },
    sortPercOwned: { sortPriority: 2, sortAsc: false },
    sortDraftRanks: { sortPriority: 100, sortAsc: true, value: 'STANDARD' },
    limit: 50,
    filterStatsForTopScoringPeriodIds: {
      value: 5,
      additionalValue: ['002025', '102025', '002024', '012025', '022025', '032025', '042025', '062025', '010002025'],
    },
  },
};

export class EspnFilterBuilder {
  private filterStatus: ClientTransaction[] = [];

  private filterSlotIds: number[] = [];

  static getPlayerFilter(filter: EspnPlayerFilter): string {
    return JSON.stringify(filter);
  }
}
