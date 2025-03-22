import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IClientEventEntity } from '@sdk/espn-client-models/event.model';
import { EspnFantasyClientV2 } from '../../client/espn-fantasy-v2.client';

export const baseballEventsAdapter = createEntityAdapter({
  selectId: (entity: IClientEventEntity) => entity.id,
  sortComparer: (a: IClientEventEntity, b: IClientEventEntity) => Number(a.id) - Number(b.id),
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
