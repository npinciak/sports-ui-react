import { createSelector } from '@reduxjs/toolkit';
import { baseballLeagueSlice } from '../slice/baseball-league.slice';

export const BaseballLeagueSelector = baseballLeagueSlice.selectors.selectStore.unwrapped;

export const testSelector = createSelector([BaseballLeagueSelector], store => {
  return { ...store };
});
