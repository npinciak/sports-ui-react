import { configureStore } from '@reduxjs/toolkit';
import { fantasyBaseballClient } from './features/espn/fantasy-baseball/client/fantasy-baseball.client';
import { baseballTeamLiveSlice, baseballTeamSlice } from './features/espn/fantasy-baseball/store';

export const AppStore = configureStore({
  reducer: {
    [fantasyBaseballClient.reducerPath]: fantasyBaseballClient.reducer,
    fantasyBaseballTeam: baseballTeamSlice.reducer,
    fantasyBaseballTeamLive: baseballTeamLiveSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fantasyBaseballClient.middleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
