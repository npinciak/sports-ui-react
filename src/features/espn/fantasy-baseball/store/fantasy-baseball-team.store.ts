import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fantasyBaseballClient } from '../client/fantasy-baseball.client';
import { BaseballTeam } from '../models/baseball-team.model';

export const espnFantasyBaseballTeamAdapter = createEntityAdapter({
  selectId: (team: BaseballTeam) => team.id,
  sortComparer: (a: BaseballTeam, b: BaseballTeam) => Number(a.id) - Number(b.id),
});

export const fantasyBaseballTeamSlice = createSlice({
  name: 'fantasyBaseballTeam',
  initialState: espnFantasyBaseballTeamAdapter.getInitialState(),
  reducers: {
    teamAdded: espnFantasyBaseballTeamAdapter.addOne,
    teamAddMany: espnFantasyBaseballTeamAdapter.addMany,
    teamUpdated: espnFantasyBaseballTeamAdapter.updateOne,
    teamRemoved: espnFantasyBaseballTeamAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(fantasyBaseballClient.endpoints.fetchLeague.matchFulfilled, (state, action) => {
      espnFantasyBaseballTeamAdapter.setAll(state, action.payload.teams);
    });
  },
});
