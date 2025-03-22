import { createSelector } from '@reduxjs/toolkit';
import { TRANSACTION, TRANSACTION_STATUS } from '@sdk/espn-client-models';
import { RootState } from '../../../../app.store';
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
          items: transaction.items.map(item => ({
            ...item,
            playerName: selectPlayerById(item.playerId)?.name ?? null,
            fromTeamAbbrev: getTeamById(item.fromTeamId) != null ? getTeamById(item.fromTeamId)?.abbrev : 'Free Agent',
            fromTeamLogo: getTeamById(item.fromTeamId) != null ? getTeamById(item.fromTeamId)?.logo : '',
            toTeamLogo: getTeamById(item.toTeamId) != null ? getTeamById(item.toTeamId)?.logo : '',
            toTeamAbbrev: getTeamById(item.toTeamId) != null ? getTeamById(item.toTeamId)?.abbrev : 'Free Agent',
          })),
        };
      })
);

export const getFreeAgentSignings = createSelector(getTransactionList, transactionList =>
  transactionList.filter(transaction => transaction.type === TRANSACTION.FreeAgent)
);

export const getFailedTransactionList = createSelector(getTransactionList, transactionList =>
  transactionList.filter(transaction => transaction.status !== TRANSACTION_STATUS.Executed)
);
