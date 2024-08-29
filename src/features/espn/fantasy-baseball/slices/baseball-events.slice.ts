import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnClient } from 'sports-ui-sdk';
import { baseballHandler } from '../handler/fantasy-baseball.handler';

export const baseballEventsAdapter = createEntityAdapter({
  selectId: (entity: EspnClient.EventEntity) => entity.id,
  sortComparer: (a: EspnClient.EventEntity, b: EspnClient.EventEntity) => Number(a.id) - Number(b.id),
});

export const baseballEventsSlice = createSlice({
  name: 'baseballEvents',
  initialState: baseballEventsAdapter.getInitialState(),
  reducers: {
    teamAdded: baseballEventsAdapter.addOne,
    teamAddMany: baseballEventsAdapter.addMany,
    teamUpdated: baseballEventsAdapter.updateOne,
    teamRemoved: baseballEventsAdapter.removeOne,
  },
  extraReducers: builder => {
    builder.addMatcher(baseballHandler.endpoints.fetchEvents.matchFulfilled, (state, action) => {
      baseballEventsAdapter.setAll(state, action.payload.events);
    });
  },
});
