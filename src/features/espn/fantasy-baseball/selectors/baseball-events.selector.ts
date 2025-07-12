import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { baseballEventsAdapter } from '../slices/baseball-events.slice';

const baseballEventState = (state: RootState) => state.baseballEvents;
const { selectIds, selectAll } = baseballEventsAdapter.getSelectors<RootState>(baseballEventState);

export const selectEventIds = createSelector(
  state => state,
  state => selectIds(state)
);

export const selectEventIdSet = createSelector([selectEventIds], ids => new Set(ids));

export const selectEventEntityList = createSelector(
  state => state,
  state => selectAll(state)
);

export const selectFirstGameOfDay = createSelector(selectEventEntityList, teams => teams[0]);
