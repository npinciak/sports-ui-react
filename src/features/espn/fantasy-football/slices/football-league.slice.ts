import { createSlice } from '@reduxjs/toolkit';
import { footballClient } from '../client';

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

export const footballLeagueSlice = createSlice({
  name: 'footballLeague',
  initialState: INITIAL_STATE,
  reducers: {
    setState: (state, action) => {
      for (let key in action.payload) {
        (state as Record<string, any>)[key] = (action.payload as Record<string, any>)[key];
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(footballClient.endpoints.fetchLeagueById.matchFulfilled, (state, action) => {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId } = action.payload;

      const store = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };

      footballLeagueSlice.caseReducers.setState(state, { type: 'setLeague', payload: store });
    });
  },
});

export const FootballLeagueActions = footballLeagueSlice.actions;
