import { configureStore } from '@reduxjs/toolkit';
import { AuthenticationClient } from './@shared';
import { supabaseClient } from './@shared/supabase/supabase.client';
import { AdminLeagueProgressionFormSlice } from './features/admin/slices/league-progression-form.slice';
import { baseballClient } from './features/espn/fantasy-baseball/client/fantasy-baseball.client';
import { baseballTeamSlice } from './features/espn/fantasy-baseball/slices';
import { baseballLeagueSlice } from './features/espn/fantasy-baseball/slices/baseball-league.slice';
import { baseballTeamLiveSlice } from './features/espn/fantasy-baseball/slices/baseball-team-live.slice';

export const AppStore = configureStore({
  reducer: {
    [AdminLeagueProgressionFormSlice.reducerPath]: AdminLeagueProgressionFormSlice.reducer,
    [AuthenticationClient.reducerPath]: AuthenticationClient.reducer,
    [supabaseClient.reducerPath]: supabaseClient.reducer,
    [baseballClient.reducerPath]: baseballClient.reducer,
    [baseballTeamSlice.reducerPath]: baseballTeamSlice.reducer,
    [baseballTeamLiveSlice.reducerPath]: baseballTeamLiveSlice.reducer,
    [baseballLeagueSlice.reducerPath]: baseballLeagueSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(AuthenticationClient.middleware).concat(baseballClient.middleware).concat(supabaseClient.middleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

export const getAppStore = AppStore.getState();
