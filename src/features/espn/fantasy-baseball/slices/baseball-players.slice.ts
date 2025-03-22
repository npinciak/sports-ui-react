import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { BaseballPlayerEntity } from '../models/baseball-player.model';

export const baseballPlayersAdapter = createEntityAdapter({
  selectId: (entity: BaseballPlayerEntity) => entity.id,
});

export const baseballPlayersSlice = createSlice({
  name: 'baseballPlayers',
  initialState: baseballPlayersAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getBaseballPlayers.matchFulfilled, (state, action) => {
      baseballPlayersAdapter.setAll(state, action.payload);
    });
  },
});
