import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { footballClient } from '../client';
import { FootballTeam } from '../models';

export const footballTeamAdapter = createEntityAdapter({
  selectId: (team: FootballTeam) => team.id,
  sortComparer: (a: FootballTeam, b: FootballTeam) => a.wins - b.wins,
});

export const footballTeamSlice = createSlice({
  name: 'footballTeam',
  initialState: footballTeamAdapter.getInitialState(),
  reducers: {
    teamAdded: footballTeamAdapter.addOne,
    teamAddMany: footballTeamAdapter.addMany,
    teamUpdated: footballTeamAdapter.updateOne,
    teamRemoved: footballTeamAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(footballClient.endpoints.fetchLeagueById.matchFulfilled, (state, action) => {
      footballTeamAdapter.setAll(state, action.payload.teams);
    });
  },
});
