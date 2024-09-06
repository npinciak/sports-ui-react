import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { slatePlayerHandler } from '../handlers/slate-player.handler';
import { SlatePlayerEntity } from '../models';

export const slatePlayersAdapter = createEntityAdapter({
  selectId: (entity: SlatePlayerEntity) => entity.player.id,
  sortComparer: (a: SlatePlayerEntity, b: SlatePlayerEntity) => Number(a.player.id) - Number(b.player.id),
});

export const slatePlayersSlice = createSlice({
  name: 'slatePlayers',
  initialState: slatePlayersAdapter.getInitialState(),
  reducers: {
    teamAdded: slatePlayersAdapter.addOne,
    teamAddMany: slatePlayersAdapter.addMany,
    teamUpdated: slatePlayersAdapter.updateOne,
    teamRemoved: slatePlayersAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(slatePlayerHandler.endpoints.fetchSlateByDfsSiteBySlateId.matchFulfilled, (state, action) => {
      slatePlayersAdapter.setAll(state, action.payload);
    });
  },
});
