import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { BaseballTeam } from '../models/baseball-team.model';

export const baseballTeamAdapter = createEntityAdapter({
  selectId: (team: Omit<BaseballTeam, 'roster'>) => team.id,
  sortComparer: (a: Omit<BaseballTeam, 'roster'>, b: Omit<BaseballTeam, 'roster'>) => Number(a.id) - Number(b.id),
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
