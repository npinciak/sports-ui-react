import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { baseballHandler } from '../handler/fantasy-baseball.handler';
import { BaseballPlayer } from '../models/baseball-player.model';

export const baseballTeamRosterAdapter = createEntityAdapter({
  selectId: (player: BaseballPlayer) => player.sportsUiId,
  sortComparer: (a: BaseballPlayer, b: BaseballPlayer) => Number(a.id) - Number(b.id),
});

export const baseballTeamRosterSlice = createSlice({
  name: 'baseballTeamRoster',
  initialState: baseballTeamRosterAdapter.getInitialState(),
  reducers: {
    teamAdded: baseballTeamRosterAdapter.addOne,
    teamAddMany: baseballTeamRosterAdapter.addMany,
    teamUpdated: baseballTeamRosterAdapter.updateOne,
    teamRemoved: baseballTeamRosterAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(baseballHandler.endpoints.fetchTeamById.matchFulfilled, (state, action) => {
      baseballTeamRosterAdapter.setAll(state, action.payload.roster);
    });
  },
});
