import { createSlice } from '@reduxjs/toolkit';
import { PlayerGameAttributes } from '../../models/game-attributes.model';
import { footballGameAttributesHandler } from '../handlers/game-attributes.handler';

export const dfsFootballPlayerGameAttributesSlice = createSlice({
  name: 'playerGameAttributesSlice',
  initialState: {
    entities: {} as Record<string, PlayerGameAttributes>,
  },
  reducers: {
    setPlayerGameAttributes: (state, action: { payload: Record<string, PlayerGameAttributes> }) => {
      state.entities = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(footballGameAttributesHandler.endpoints.fetchGameAttributes.matchFulfilled, (state, action) => {
      dfsFootballPlayerGameAttributesSlice.caseReducers.setPlayerGameAttributes(state, { payload: action.payload.players });
    });
  },
});
