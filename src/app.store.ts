import { configureStore } from '@reduxjs/toolkit';
import { FangraphsStatsFilterFormSlice, fangraphsClient, fangraphsPlayerSlice } from './@shared/fangraphs';
import { supabaseClient } from './@shared/supabase/supabase.client';
import { AuthenticationClient } from './core/authentication';
import { AdminLeagueProgressionFormSlice } from './features/admin/slices/league-progression-form.slice';
import { footballGameAttributesHandler } from './features/daily-fantasy/football/handlers/game-attributes.handler';
import { dfsFootballPlayerGameAttributesSlice } from './features/daily-fantasy/football/slices/football-player-game-attributes.slice';
import { dfsFootballTeamGameAttributesSlice } from './features/daily-fantasy/football/slices/football-team-game-attributes.slice';
import { lineupHeadquartersHandler } from './features/daily-fantasy/handlers/lineup-hq.handler';
import { masterSlateHandler } from './features/daily-fantasy/handlers/master-slate.handler';
import { slatePlayerHandler } from './features/daily-fantasy/handlers/slate-player.handler';
import { slatePlayersSlice } from './features/daily-fantasy/slices/slate-player.slice';
import { baseballHandler } from './features/espn/fantasy-baseball/handler/fantasy-baseball.handler';
import { baseballTeamSlice } from './features/espn/fantasy-baseball/slices';
import { baseballEventsSlice } from './features/espn/fantasy-baseball/slices/baseball-events.slice';
import { baseballLeagueSlice } from './features/espn/fantasy-baseball/slices/baseball-league.slice';
import { baseballTeamLiveSlice } from './features/espn/fantasy-baseball/slices/baseball-team-live.slice';
import { baseballTeamRosterSlice } from './features/espn/fantasy-baseball/slices/baseball-team-roster.slice';
import { footballClient } from './features/espn/fantasy-football/client';

export const AppStore = configureStore({
  reducer: {
    [AdminLeagueProgressionFormSlice.reducerPath]: AdminLeagueProgressionFormSlice.reducer,
    [AuthenticationClient.reducerPath]: AuthenticationClient.reducer,
    [fangraphsClient.reducerPath]: fangraphsClient.reducer,
    [FangraphsStatsFilterFormSlice.reducerPath]: FangraphsStatsFilterFormSlice.reducer,
    [footballClient.reducerPath]: footballClient.reducer,
    [supabaseClient.reducerPath]: supabaseClient.reducer,
    [baseballHandler.reducerPath]: baseballHandler.reducer,
    [baseballEventsSlice.reducerPath]: baseballEventsSlice.reducer,
    [baseballTeamRosterSlice.reducerPath]: baseballTeamRosterSlice.reducer,
    [baseballTeamSlice.reducerPath]: baseballTeamSlice.reducer,
    [baseballTeamLiveSlice.reducerPath]: baseballTeamLiveSlice.reducer,
    [baseballLeagueSlice.reducerPath]: baseballLeagueSlice.reducer,
    [fangraphsPlayerSlice.reducerPath]: fangraphsPlayerSlice.reducer,
    [lineupHeadquartersHandler.reducerPath]: lineupHeadquartersHandler.reducer,
    [masterSlateHandler.reducerPath]: masterSlateHandler.reducer,
    [slatePlayerHandler.reducerPath]: slatePlayerHandler.reducer,
    [footballGameAttributesHandler.reducerPath]: footballGameAttributesHandler.reducer,
    [dfsFootballPlayerGameAttributesSlice.reducerPath]: dfsFootballPlayerGameAttributesSlice.reducer,
    [dfsFootballTeamGameAttributesSlice.reducerPath]: dfsFootballTeamGameAttributesSlice.reducer,
    [slatePlayersSlice.reducerPath]: slatePlayersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthenticationClient.middleware)
      .concat(baseballHandler.middleware)
      .concat(supabaseClient.middleware)
      .concat(footballClient.middleware)
      .concat(fangraphsClient.middleware)
      .concat(lineupHeadquartersHandler.middleware)
      .concat(masterSlateHandler.middleware)
      .concat(footballGameAttributesHandler.middleware)
      .concat(slatePlayerHandler.middleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

export const getAppStore = AppStore.getState();
