import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV2 } from '../../client/espn-fantasy-v2.client';
import { BaseballEvent } from '../models/baseball-event.model';

export const baseballEventsAdapter = createEntityAdapter({
  selectId: (entity: BaseballEvent) => entity.id,
  sortComparer: (a: BaseballEvent, b: BaseballEvent) => a.timestamp - b.timestamp,
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
