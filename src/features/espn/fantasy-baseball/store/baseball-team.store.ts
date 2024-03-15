import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fantasyBaseballClient } from '../client/fantasy-baseball.client';
import { BaseballTeam } from '../models/baseball-team.model';

export const baseballTeamAdapter = createEntityAdapter({
  selectId: (team: BaseballTeam) => team.id,
  sortComparer: (a: BaseballTeam, b: BaseballTeam) => Number(a.id) - Number(b.id),
});

export const baseballTeamSlice = createSlice({
  name: 'baseballTeam',
  initialState: baseballTeamAdapter.getInitialState(),
  reducers: {
    teamAdded: baseballTeamAdapter.addOne,
    teamAddMany: baseballTeamAdapter.addMany,
    teamUpdated: baseballTeamAdapter.updateOne,
    teamRemoved: baseballTeamAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(fantasyBaseballClient.endpoints.fetchLeague.matchFulfilled, (state, action) => {
      baseballTeamAdapter.setAll(state, action.payload.teams);
    });
  },
});
