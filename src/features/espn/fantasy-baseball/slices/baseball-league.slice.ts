import { createSlice } from '@reduxjs/toolkit';
import { EspnFantasyClientV3 } from '../../client/espn-fantasy-v3.client';

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
    builder.addMatcher(EspnFantasyClientV3.endpoints.getBaseballLeague.matchFulfilled, (state, action) => {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId } = action.payload;

      const store = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };

      baseballLeagueSlice.caseReducers.setLeague(state, { type: 'setLeague', payload: store });
    });
  },
  selectors: {
    selectStore: store => store,
  },
});

const { actions } = baseballLeagueSlice;
// Extract and export each action creator by name
export const { setLeague } = actions;
