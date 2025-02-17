import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnClientV2 } from '../../client/espn-v2.client';
import { FastcastClient } from '../client/fastcast.client';
import { UIFastcastLeague } from '../models/fastcast-league.model';

export const fastcastLeagueAdapter = createEntityAdapter({
  selectId: (league: UIFastcastLeague) => league.uid,
});

export const FastcastLeaguesSlice = createSlice({
  name: 'fastcastLeagues',
  initialState: fastcastLeagueAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(FastcastClient.endpoints.getFastcast.matchFulfilled, (state, action) => {
      fastcastLeagueAdapter.removeAll(state);
      fastcastLeagueAdapter.setAll(state, action.payload.fastcastLeagues);
    });
    builder.addMatcher(EspnClientV2.endpoints.getStaticScoreboard.matchFulfilled, (state, action) => {
      fastcastLeagueAdapter.removeAll(state);
      fastcastLeagueAdapter.setAll(state, action.payload.fastcastLeagues);
    });
  },
});
