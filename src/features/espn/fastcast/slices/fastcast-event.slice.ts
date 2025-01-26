import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { FastcastStaticClient } from '../client/fastcast-static.client';
import { FastcastClient } from '../client/fastcast.client';
import { FastcastEvent } from '../models/fastcast-event.model';

export const fastcastEventAdapter = createEntityAdapter({
  selectId: (team: FastcastEvent) => team.uid,
});

export const FastcastEventsSlice = createSlice({
  name: 'fastcastEvents',
  initialState: fastcastEventAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(FastcastClient.endpoints.getFastcast.matchFulfilled, (state, action) => {
      fastcastEventAdapter.removeAll(state);
      fastcastEventAdapter.setAll(state, action.payload.fastcastEvents);
    });
    builder.addMatcher(FastcastStaticClient.endpoints.getStaticScoreboard.matchFulfilled, (state, action) => {
      fastcastEventAdapter.removeAll(state);
      fastcastEventAdapter.setAll(state, action.payload.fastcastEvents);
    });
  },
});
