import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

const fangraphsStatsFilterForm = (state: RootState) => state.fangraphsStatsFilterForm;

export const selectStatSplitPeriod = createSelector([fangraphsStatsFilterForm], state => state.statSplitPeriod);
