import { configureStore } from '@reduxjs/toolkit';
import { baseballClient } from './features/espn/fantasy-baseball/client/fantasy-baseball.client';
import { baseballLeagueSlice, baseballTeamLiveSlice, baseballTeamSlice } from './features/espn/fantasy-baseball/store';

export const AppStore = configureStore({
  reducer: {
    [baseballClient.reducerPath]: baseballClient.reducer,
    [baseballTeamSlice.reducerPath]: baseballTeamSlice.reducer,
    [baseballTeamLiveSlice.reducerPath]: baseballTeamLiveSlice.reducer,
    [baseballLeagueSlice.reducerPath]: baseballLeagueSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseballClient.middleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
