import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app.store';

const espnPlayerNewsSlice = (state: RootState) => state.espnPlayerNews;

export const getPlayerNewsById = createSelector([espnPlayerNewsSlice], slice => (id: string | null) => {
  if (id == null) return null;
  return slice.map[id];
});
