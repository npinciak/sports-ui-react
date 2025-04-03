import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { BaseballTeamLiveEntity } from '../models/baseball-team.model';

export const baseballTeamLiveAdapter = createEntityAdapter({
  selectId: (team: BaseballTeamLiveEntity) => team.id,
  sortComparer: (a: BaseballTeamLiveEntity, b: BaseballTeamLiveEntity) => Number(a.liveScore) - Number(b.liveScore),
});

export const baseballTeamLiveSlice = createSlice({
  name: 'baseballTeamLive',
  initialState: baseballTeamLiveAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getBaseballLeague.matchFulfilled, (state, action) => {
      baseballTeamLiveAdapter.setAll(state, action.payload.teamsLive);
    });
  },
});
