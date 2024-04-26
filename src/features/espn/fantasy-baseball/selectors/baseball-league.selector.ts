import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';

const baseballLeagueState = (state: RootState) => state.baseballLeague;

export const selectSeasonId = createSelector([baseballLeagueState], state => state.seasonId);
