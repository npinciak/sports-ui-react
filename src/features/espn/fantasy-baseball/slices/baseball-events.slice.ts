import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnClient } from 'sports-ui-sdk';
import { EspnFantasyClientV2 } from '../../client/espn-fantasy-v2.client';

export const baseballEventsAdapter = createEntityAdapter({
  selectId: (entity: EspnClient.EventEntity) => entity.id,
  sortComparer: (a: EspnClient.EventEntity, b: EspnClient.EventEntity) => Number(a.id) - Number(b.id),
});

export const baseballEventsSlice = createSlice({
  name: 'baseballEvents',
  initialState: baseballEventsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV2.endpoints.getEvents.matchFulfilled, (state, action) => {
      baseballEventsAdapter.setAll(state, action.payload.events);
    });
  },
});
