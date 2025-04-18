import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';
import { FangraphsPlayerAdapter } from '../slices/entity-adapter';

const fangraphsBatterState = (state: RootState) => state.fangraphsBatter;

const { selectIds, selectEntities, selectAll, selectTotal } = FangraphsPlayerAdapter.getSelectors<RootState>(fangraphsBatterState);

export const selectFangraphsBatterIds = createSelector(
  state => state,
  state => selectIds(state)
);

export const selectFangraphsBatterEntities = createSelector(
  state => state,
  state => selectEntities(state)
);

export const selectFangraphsBatterEntityList = createSelector(
  state => state,
  state => selectAll(state)
);

export const selectFangraphsBatterTotal = createSelector(
  state => state,
  state => selectTotal(state)
);
