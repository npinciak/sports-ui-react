import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';

const footballLeagueState = (state: RootState) => state.footballLeague;

export const selectSeasonId = createSelector([footballLeagueState], state => state.seasonId);
