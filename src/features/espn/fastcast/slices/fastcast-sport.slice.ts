import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FastcastStaticClient } from '../client/fastcast-static.client';
import { FastcastClient } from '../client/fastcast.client';
import { IFastcastSportEntity } from '../models/fastcast-sport.model';

export const fastcastSportsAdapter = createEntityAdapter({
  selectId: (team: IFastcastSportEntity) => team.id,
  sortComparer: (a: IFastcastSportEntity, b: IFastcastSportEntity) => Number(a.id) - Number(b.id),
});

export const FastcastSportsSlice = createSlice({
  name: 'fastcastSports',
  initialState: fastcastSportsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(FastcastClient.endpoints.getFastcast.matchFulfilled, (state, action) => {
      fastcastSportsAdapter.removeAll(state);
      fastcastSportsAdapter.setAll(state, action.payload.fastcastSports);
    });
    builder.addMatcher(FastcastStaticClient.endpoints.getStaticScoreboard.matchFulfilled, (state, action) => {
      fastcastSportsAdapter.removeAll(state);
      fastcastSportsAdapter.setAll(state, action.payload.fastcastSports);
    });
  },
});
