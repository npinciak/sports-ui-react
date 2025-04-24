import { createSelector } from '@reduxjs/toolkit';
import { TRANSACTION, TRANSACTION_STATUS } from '@sdk/espn-client-models';
import { RootState } from '../../../../app.store';
import { BaseballTransactionEntity } from '../models/baseball-transaction.model';
import { baseballTransactionAdapter } from '../slices/baseball-transactions.slice';
import { selectPlayerById } from './baseball-player.selector';
import { getTeamById } from './baseball-team.selector';

const baseballTransactionState = (state: RootState) => state.baseballTransaction;

const { selectById, selectAll } = baseballTransactionAdapter.getSelectors<RootState>(baseballTransactionState);

export const getTransactionById = createSelector(
  state => state,
  state => (id: string) => selectById(state, id)
);

export const getTransactionList = createSelector(
  state => state,
  state => selectAll(state)
);

export const getSuccessfulTransactionList = createSelector(
  [getTransactionList, getTeamById, selectPlayerById],
  (transactionList, getTeamById, selectPlayerById) =>
    transactionList
      .filter(transaction => transaction.status === TRANSACTION_STATUS.Executed)
      .map(transaction => {
        return {
          ...transaction,
          items: transaction.items.map(item => {
            const { playerId, fromTeamId, toTeamId } = item;

            const player = selectPlayerById(playerId);

            const fromTeam = getTeamById(fromTeamId);
            const toTeam = getTeamById(toTeamId);

            return {
              ...item,
              playerName: player?.name ?? null,
              playerHeadshot: player?.img ?? null,
              playerPosition: player?.position ?? null,
              fromTeamAbbrev: fromTeam != null ? fromTeam?.abbrev : 'Free Agent',
              fromTeamLogo: fromTeam != null ? fromTeam?.logo : '',
              toTeamLogo: toTeam != null ? toTeam?.logo : '',
              toTeamAbbrev: toTeam != null ? toTeam?.abbrev : 'Free Agent',
            };
          }),
        };
      })
);

export const getGroupedTransactions = createSelector([getSuccessfulTransactionList], transactionList => {
  const grouped: Record<string, BaseballTransactionEntity[]> = {};

  transactionList.forEach(transaction => {
    const date = transaction.transactionProcessDate || transaction.transactionProposedDate || 'Pending';

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  });

  return grouped;
});

export const getFreeAgentSignings = createSelector(getTransactionList, transactionList =>
  transactionList.filter(transaction => transaction.type === TRANSACTION.FreeAgent)
);

export const getFailedTransactionList = createSelector(getTransactionList, transactionList =>
  transactionList.filter(transaction => transaction.status !== TRANSACTION_STATUS.Executed)
);
