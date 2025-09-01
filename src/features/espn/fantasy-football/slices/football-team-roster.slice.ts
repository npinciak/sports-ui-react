import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';
import { FootballPlayerEntity } from '../models/football-player.model';

export const footballTeamRosterAdapter = createEntityAdapter({
  selectId: (player: FootballPlayerEntity) => player.sportsUiId,
  sortComparer: (a: FootballPlayerEntity, b: FootballPlayerEntity) => Number(a.id) - Number(b.id),
});

export const footballTeamRosterSlice = createSlice({
  name: 'footballTeamRoster',
  initialState: { ...footballTeamRosterAdapter.getInitialState(), map: {} as Record<string, string> },
  reducers: {
    setPlayerIdSportsUiIdMap: (state, action) => {
      state.map = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV3.endpoints.getFootballTeamById.matchFulfilled, (state, action) => {
      const roster = action.payload.roster;
      footballTeamRosterAdapter.setAll(state, roster);

      const map = roster.reduce(
        (acc, player) => {
          acc[player.id] = player.sportsUiId;
          return acc;
        },
        {} as Record<string, string>
      );

      footballTeamRosterSlice.caseReducers.setPlayerIdSportsUiIdMap(state, { payload: map, type: 'setPlayerIdSportsUiIdMap' });
    });
  },
});
