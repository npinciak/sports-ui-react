import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';
import { FangraphsPlayerAdapter } from '../slices';

const fangraphsStatsState = (state: RootState) => state.fangraphsPlayer;

const { selectIds, selectEntities, selectAll, selectTotal } = FangraphsPlayerAdapter.getSelectors<RootState>(fangraphsStatsState);

export const selectFangraphsPlayerIds = createSelector(
  state => state,
  state => selectIds(state)
);

export const selectFangraphsPlayerEntities = createSelector(
  state => state,
  state => selectEntities(state)
);

export const selectFangraphsPlayerEntityList = createSelector(
  state => state,
  state => selectAll(state)
);

export const selectFangraphsPlayerTotal = createSelector(
  state => state,
  state => selectTotal(state)
);
