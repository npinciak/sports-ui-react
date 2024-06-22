import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballEventsAdapter } from '../slices/baseball-events.slice';

const baseballEventState = (state: RootState) => state.baseballEvents;
export const baseballEventAdapterSelector = baseballEventsAdapter.getSelectors<RootState>(baseballEventState);

export const selectEventIds = createSelector([baseballEventState], state => state.ids);
export const selectEventIdSet = createSelector([selectEventIds], ids => new Set(ids));
export const selectEventEntities = createSelector([baseballEventState], state => state.entities);
export const selectEventEntityList = createSelector([selectEventEntities], entities => Object.values(entities));
