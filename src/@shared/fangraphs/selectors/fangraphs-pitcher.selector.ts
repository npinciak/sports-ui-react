import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';
import { FangraphsPlayerAdapter } from '../slices/entity-adapter';

const fangraphsPitcherState = (state: RootState) => state.fangraphsPitcher;

const { selectIds, selectEntities, selectAll, selectTotal } = FangraphsPlayerAdapter.getSelectors<RootState>(fangraphsPitcherState);

export const selectFangraphsPitcherIds = createSelector(
  state => state,
  state => selectIds(state)
);

export const selectFangraphsPitcherEntities = createSelector(
  state => state,
  state => selectEntities(state)
);

export const selectFangraphsPitcherEntityList = createSelector(
  state => state,
  state => selectAll(state)
);

export const selectFangraphsPitcherTotal = createSelector(
  state => state,
  state => selectTotal(state)
);
