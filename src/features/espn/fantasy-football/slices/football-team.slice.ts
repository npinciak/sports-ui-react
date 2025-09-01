import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { FootballTeamNoRosterEntity } from '../models/football-team.model';

export const footballTeamAdapter = createEntityAdapter({
  selectId: (team: FootballTeamNoRosterEntity) => team.id,
  sortComparer: (a: FootballTeamNoRosterEntity, b: FootballTeamNoRosterEntity) => Number(a.id) - Number(b.id),
});

export const footballTeamSlice = createSlice({
  name: 'footballTeam',
  initialState: footballTeamAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getFootballLeague.matchFulfilled, (state, action) => {
      const { teams } = action.payload;
      footballTeamAdapter.setAll(state, teams);
    });
  },
});
