import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { fastcastEventAdapter } from '../slices/fastcast-event.slice';

const fastcastEventsSlice = (state: RootState) => state.fastcastEvents;
export const fastcastEventAdapterSelector = fastcastEventAdapter.getSelectors<RootState>(fastcastEventsSlice);

export const selectEventIds = createSelector([fastcastEventsSlice], state => state.ids);
export const selectEventIdSet = createSelector([selectEventIds], ids => new Set(ids));
export const selectEventEntities = createSelector([fastcastEventsSlice], state => state.entities);
export const selectEventEntityList = createSelector([selectEventEntities], entities => Object.values(entities));
export const selecttEventEntityListBySport = createSelector(
  [selectEventEntityList],
  events => (sport: string) => events.filter(event => event.eventIds?.sportType === sport)
);
