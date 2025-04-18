import { createSlice } from '@reduxjs/toolkit';
import { fangraphsClient } from '../client';
import { FangraphsPlayerAdapter } from './entity-adapter';

export const fangraphsPitcherSlice = createSlice({
  name: 'fangraphsPitcher',
  initialState: FangraphsPlayerAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(fangraphsClient.endpoints.getFangraphPitcherPlayerList.matchFulfilled, (state, action) => {
      FangraphsPlayerAdapter.setAll(state, action.payload);
    });
  },
});
