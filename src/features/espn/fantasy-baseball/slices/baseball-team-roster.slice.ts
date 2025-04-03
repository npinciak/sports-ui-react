import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { BaseballPlayerEntity } from '../models/baseball-player.model';

export const baseballTeamRosterAdapter = createEntityAdapter({
  selectId: (player: BaseballPlayerEntity) => player.sportsUiId,
  sortComparer: (a: BaseballPlayerEntity, b: BaseballPlayerEntity) => Number(a.id) - Number(b.id),
});

export const baseballTeamRosterSlice = createSlice({
  name: 'baseballTeamRoster',
  initialState: { ...baseballTeamRosterAdapter.getInitialState(), map: {} as Record<string, string> },
  reducers: {
    setPlayerIdSportsUiIdMap: (state, action) => {
      state.map = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getBaseballTeamById.matchFulfilled, (state, action) => {
      const roster = action.payload.roster;
      baseballTeamRosterAdapter.setAll(state, roster);

      const map = roster.reduce(
        (acc, player) => {
          acc[player.id] = player.sportsUiId;
          return acc;
        },
        {} as Record<string, string>
      );

      baseballTeamRosterSlice.caseReducers.setPlayerIdSportsUiIdMap(state, { payload: map, type: 'setPlayerIdSportsUiIdMap' });
    });
  },
});
