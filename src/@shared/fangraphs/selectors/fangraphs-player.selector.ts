import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

const fangraphsStatsSlice = (state: RootState) => state.fangraphsPlayer;

export const selectFangraphsPlayerIds = createSelector([fangraphsStatsSlice], state => state.ids);
export const selectFangraphsPlayerEntities = createSelector([fangraphsStatsSlice], state => state.entities);
export const selectFangraphsPlayerEntityList = createSelector([selectFangraphsPlayerEntities], entities => Object.values(entities));
