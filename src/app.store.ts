import { configureStore } from '@reduxjs/toolkit';
import { fantasyBaseballClient } from './features/espn/fantasy-baseball/client/fantasy-baseball.client';
import { fantasyBaseballTeamSlice } from './features/espn/fantasy-baseball/store/fantasy-baseball-team.store';

export const AppStore = configureStore({
  reducer: {
    [fantasyBaseballClient.reducerPath]: fantasyBaseballClient.reducer,
    fantasyBaseballTeam: fantasyBaseballTeamSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fantasyBaseballClient.middleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
