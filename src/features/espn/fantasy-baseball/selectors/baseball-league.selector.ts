import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../app.store';

const baseballLeagueState = (state: RootState) => state.baseballLeague;

export const getSeasonId = createSelector([baseballLeagueState], state => state.seasonId);

export const getCurrentScoringPeriodId = createSelector([baseballLeagueState], state => state.scoringPeriodId);

export const selectSeasonCompletedPct = createSelector([baseballLeagueState], state => {
  const current = Number(state.scoringPeriodId);
  const total = Number(state.finalScoringPeriod);
  const firstScoringPeriod = Number(state.firstScoringPeriod);

  if (!current || !total) return 0;

  if (current === firstScoringPeriod) return 0;

  if (current === total) return 100;

  return Math.round((current / total) * 100);
});
