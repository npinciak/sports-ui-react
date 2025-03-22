import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { BaseballTransactionEntity } from '../models/baseball-transaction.model';

export const baseballTransactionAdapter = createEntityAdapter({
  selectId: (team: BaseballTransactionEntity) => team.id,
  sortComparer: (a: BaseballTransactionEntity, b: BaseballTransactionEntity) =>
    b.transactionProposedDateTimestamp! - a.transactionProposedDateTimestamp!,
});

export const baseballTransactionSlice = createSlice({
  name: 'baseballTransaction',
  initialState: baseballTransactionAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getBaseballLeague.matchFulfilled, (state, action) => {
      const { transactions } = action.payload;
      baseballTransactionAdapter.setAll(state, transactions);
    });
  },
});
