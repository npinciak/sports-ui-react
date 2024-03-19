import { createSlice } from '@reduxjs/toolkit';
import { baseballClient } from '../client/fantasy-baseball.client';

export interface FantasyLeagueBaseStateModel {
  id: string | null;
  seasonId: string | null;
  scoringPeriodId: string | null;
  firstScoringPeriod: string | null;
  finalScoringPeriod: string | null;
  matchupPeriodCount: string | null;
}

export const INITIAL_STATE = {
  id: null,
  seasonId: null,
  scoringPeriodId: null,
  firstScoringPeriod: null,
  finalScoringPeriod: null,
  matchupPeriodCount: null,
};

export const baseballLeagueSlice = createSlice({
  name: 'baseballLeague',
  initialState: INITIAL_STATE,
  reducers: {
    setLeague: (state, action) => {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId } = action.payload;

      // TODO: issues/1 Update setLeague reducer to be more efficient when setting state
      state.id = id;
      state.scoringPeriodId = scoringPeriodId;
      state.matchupPeriodCount = matchupPeriodCount;
      state.firstScoringPeriod = firstScoringPeriod;
      state.finalScoringPeriod = finalScoringPeriod;
      state.seasonId = seasonId;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(baseballClient.endpoints.fetchLeague.matchFulfilled, (state, action) => {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId } = action.payload;

      const store = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };

      baseballLeagueSlice.caseReducers.setLeague(state, { type: 'setLeague', payload: store });
    });
  },
});

const { actions } = baseballLeagueSlice;
// Extract and export each action creator by name
export const { setLeague } = actions;
