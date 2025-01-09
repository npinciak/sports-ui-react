import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';
import { fastcastSportsAdapter } from '../slices/fastcast-sport.slice';

const fastcastSportsSlice = (state: RootState) => state.fastcastSports;
export const fastcastSportsAdapterSelector = fastcastSportsAdapter.getSelectors<RootState>(fastcastSportsSlice);

export const selectSportIds = createSelector([fastcastSportsSlice], state => state.ids);
export const selectSportIdSet = createSelector([selectSportIds], ids => new Set(ids));
export const selectSportEntities = createSelector([fastcastSportsSlice], state => state.entities);
export const selectSportEntityList = createSelector([selectSportEntities], entities => Object.values(entities));
