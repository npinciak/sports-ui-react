import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { normalizeName } from '../../../features/espn/espn-helpers';
import { fangraphsClient } from '../client';
import { FangraphsPlayerProjectionEntity, FangraphsTeamToEspnTeam } from '../models';

export const FangraphsPlayerAdapter = createEntityAdapter({
  selectId: (player: FangraphsPlayerProjectionEntity) =>
    `name=${normalizeName(player?.PlayerName)}~team=${player.Team ? FangraphsTeamToEspnTeam[player.Team]?.toLowerCase() : ''}` as string,
  sortComparer: (a: FangraphsPlayerProjectionEntity, b: FangraphsPlayerProjectionEntity) => Number(a.playerid) - Number(b.playerid),
});

export const fangraphsPlayerSlice = createSlice({
  name: 'fangraphsPlayer',
  initialState: FangraphsPlayerAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(fangraphsClient.endpoints.getFangraphPlayerList.matchFulfilled, (state, action) => {
      FangraphsPlayerAdapter.setAll(state, action.payload);
    });
  },
});
