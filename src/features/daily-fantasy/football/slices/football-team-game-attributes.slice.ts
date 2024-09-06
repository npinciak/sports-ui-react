import { createSlice } from '@reduxjs/toolkit';
import { TeamGameAttributes } from '../../models/game-attributes.model';
import { footballGameAttributesHandler } from '../handlers/game-attributes.handler';

export const dfsFootballTeamGameAttributesSlice = createSlice({
  name: 'teamGameAttributesSlice',
  initialState: {
    entities: {} as Record<string, TeamGameAttributes>,
  },
  reducers: {
    setTeamGameAttributes: (state, action: { payload: Record<string, TeamGameAttributes> }) => {
      state.entities = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(footballGameAttributesHandler.endpoints.fetchGameAttributes.matchFulfilled, (state, action) => {
      dfsFootballTeamGameAttributesSlice.caseReducers.setTeamGameAttributes(state, { payload: action.payload.teams });
    });
  },
});
