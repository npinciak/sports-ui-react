import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { BaseballTeamNoRosterEntity } from '../models/baseball-team.model';

export const baseballTeamAdapter = createEntityAdapter({
  selectId: (team: BaseballTeamNoRosterEntity) => team.id,
  sortComparer: (a: BaseballTeamNoRosterEntity, b: BaseballTeamNoRosterEntity) => Number(a.id) - Number(b.id),
});

export const baseballTeamSlice = createSlice({
  name: 'baseballTeam',
  initialState: baseballTeamAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getBaseballLeague.matchFulfilled, (state, action) => {
      const { teams } = action.payload;
      baseballTeamAdapter.setAll(state, teams);
    });
  },
});
