import { configureStore } from '@reduxjs/toolkit';
import { FangraphsStatsFilterFormSlice, fangraphsClient, fangraphsPlayerSlice } from './@shared/fangraphs';
import { supabaseClient } from './@shared/supabase/supabase.client';
import { AuthenticationClient } from './core/authentication';
import { AdminLeagueProgressionFormSlice } from './features/admin/slices/league-progression-form.slice';
import { baseballHandler } from './features/espn/fantasy-baseball/handler/fantasy-baseball.handler';
import { baseballTeamSlice } from './features/espn/fantasy-baseball/slices';
import { baseballEventsSlice } from './features/espn/fantasy-baseball/slices/baseball-events.slice';
import { baseballLeagueSlice } from './features/espn/fantasy-baseball/slices/baseball-league.slice';
import { baseballTeamLiveSlice } from './features/espn/fantasy-baseball/slices/baseball-team-live.slice';
import { baseballTeamRosterSlice } from './features/espn/fantasy-baseball/slices/baseball-team-roster.slice';

export const AppStore = configureStore({
  reducer: {
    [AdminLeagueProgressionFormSlice.reducerPath]: AdminLeagueProgressionFormSlice.reducer,
    [AuthenticationClient.reducerPath]: AuthenticationClient.reducer,
    [fangraphsClient.reducerPath]: fangraphsClient.reducer,
    [FangraphsStatsFilterFormSlice.reducerPath]: FangraphsStatsFilterFormSlice.reducer,
    [supabaseClient.reducerPath]: supabaseClient.reducer,
    [baseballHandler.reducerPath]: baseballHandler.reducer,
    [baseballEventsSlice.reducerPath]: baseballEventsSlice.reducer,
    [baseballTeamRosterSlice.reducerPath]: baseballTeamRosterSlice.reducer,
    [baseballTeamSlice.reducerPath]: baseballTeamSlice.reducer,
    [baseballTeamLiveSlice.reducerPath]: baseballTeamLiveSlice.reducer,
    [baseballLeagueSlice.reducerPath]: baseballLeagueSlice.reducer,
    [fangraphsPlayerSlice.reducerPath]: fangraphsPlayerSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthenticationClient.middleware)
      .concat(baseballHandler.middleware)
      .concat(supabaseClient.middleware)
      .concat(fangraphsClient.middleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

export const getAppStore = AppStore.getState();
