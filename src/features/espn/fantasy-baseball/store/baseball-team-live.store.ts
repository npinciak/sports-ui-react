import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fantasyBaseballClient } from '../client/fantasy-baseball.client';
import { BaseballTeamLive } from '../models/baseball-team.model';

export const baseballTeamLiveAdapter = createEntityAdapter({
  selectId: (team: BaseballTeamLive) => team.id,
  sortComparer: (a: BaseballTeamLive, b: BaseballTeamLive) => Number(a.liveScore) - Number(b.liveScore),
});

export const baseballTeamLiveSlice = createSlice({
  name: 'baseballTeamLive',
  initialState: baseballTeamLiveAdapter.getInitialState(),
  reducers: {
    teamAdded: baseballTeamLiveAdapter.addOne,
    teamAddMany: baseballTeamLiveAdapter.addMany,
    teamUpdated: baseballTeamLiveAdapter.updateOne,
    teamRemoved: baseballTeamLiveAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(fantasyBaseballClient.endpoints.fetchLeague.matchFulfilled, (state, action) => {
      baseballTeamLiveAdapter.setAll(state, action.payload.teamsLive);
    });
  },
});
