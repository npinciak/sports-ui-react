import { createSlice } from '@reduxjs/toolkit';
import { PlayerNewsFeedEntity } from 'sports-ui-sdk/src/lib/espn/models/espn-client.model';
import { EspnFantasyClientV2 } from '../client/espn-fantasy-v2.client';

interface EspnPlayerNewsSliceModel {
  map: Record<string, PlayerNewsFeedEntity>;
}

const INITIAL_STATE: EspnPlayerNewsSliceModel = {
  map: {},
};

export const EspnPlayerNewsSlice = createSlice({
  name: 'espnPlayerNews',
  initialState: INITIAL_STATE,
  reducers: {
    setPlayerNews: (state, action) => {
      state.map[action.payload.playerId] = action.payload.data;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(EspnFantasyClientV2.endpoints.getPlayerNews.matchFulfilled, (state, action) => {
      const playerId = action.meta.arg.originalArgs.playerId;

      const { feed } = action.payload;

      EspnPlayerNewsSlice.caseReducers.setPlayerNews(state, { payload: { data: feed, playerId }, type: 'setPlayerNews' });
    });
  },
});
