import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

const fangraphsStatsFilterForm = (state: RootState) => state.fangraphsStatsFilterForm;

export const selectStatsFilterForm = createSelector([fangraphsStatsFilterForm], state => state);
export const selectStatSplitPeriod = createSelector([selectStatsFilterForm], state => state.statSplitPeriod);
