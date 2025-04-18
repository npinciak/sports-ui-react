import { createSlice } from '@reduxjs/toolkit';
import { fangraphsClient } from '../client';
import { FangraphsPlayerAdapter } from './entity-adapter';

export const fangraphsBatterSlice = createSlice({
  name: 'fangraphsBatter',
  initialState: FangraphsPlayerAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(fangraphsClient.endpoints.getFangraphBatterPlayerList.matchFulfilled, (state, action) => {
      FangraphsPlayerAdapter.setAll(state, action.payload);
    });
  },
});
