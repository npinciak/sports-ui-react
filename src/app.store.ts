import { configureStore } from '@reduxjs/toolkit';
import { fangraphsPitcherSlice } from '@shared/fangraphs/slices/fangraphs-pitcher.slice';
import { fangraphsBatterSlice, fangraphsClient, FangraphsStatsFilterFormSlice } from './@shared/fangraphs';
import { SupabaseClient } from './@shared/supabase/supabase.client';
import { AuthenticationClient } from './core/authentication';
import { footballGameAttributesHandler } from './features/daily-fantasy/football/handlers/game-attributes.handler';
import { dfsFootballPlayerGameAttributesSlice } from './features/daily-fantasy/football/slices/football-player-game-attributes.slice';
import { dfsFootballTeamGameAttributesSlice } from './features/daily-fantasy/football/slices/football-team-game-attributes.slice';
import { lineupHeadquartersHandler } from './features/daily-fantasy/handlers/lineup-hq.handler';
import { masterSlateHandler } from './features/daily-fantasy/handlers/master-slate.handler';
import { slatePlayerHandler } from './features/daily-fantasy/handlers/slate-player.handler';
import { slatePlayersSlice } from './features/daily-fantasy/slices/slate-player.slice';
import { EspnFantasyClientV2 } from './features/espn/client/espn-fantasy-v2.client';
import { EspnFantasyClientV3 } from './features/espn/client/espn-fantasy-v3.client';
import { EspnClientV2 } from './features/espn/client/espn-v2.client';
import { baseballTeamSlice } from './features/espn/fantasy-baseball/slices';
import { baseballEventsSlice } from './features/espn/fantasy-baseball/slices/baseball-events.slice';
import { baseballLeagueSlice } from './features/espn/fantasy-baseball/slices/baseball-league.slice';
import { baseballPlayersSlice } from './features/espn/fantasy-baseball/slices/baseball-players.slice';
import { baseballTeamLiveSlice } from './features/espn/fantasy-baseball/slices/baseball-team-live.slice';
import { baseballTeamRosterSlice } from './features/espn/fantasy-baseball/slices/baseball-team-roster.slice';
import { baseballTransactionSlice } from './features/espn/fantasy-baseball/slices/baseball-transactions.slice';
import { FastcastClient } from './features/espn/fastcast/client/fastcast.client';
import { fastcastWebSocketMiddleware } from './features/espn/fastcast/helpers/websocket-handler';
import { FastcastEventsSlice } from './features/espn/fastcast/slices/fastcast-event.slice';
import { FastcastLeaguesSlice } from './features/espn/fastcast/slices/fastcast-league.slice';
import { FastcastSportsSlice } from './features/espn/fastcast/slices/fastcast-sport.slice';
import { EspnPlayerNewsSlice } from './features/espn/slices/espn-player-news.slice';
import { TomorrowIoClient } from '@shared/weather/tomorrow-io.client';

export const AppStore = configureStore({
  reducer: {
    [AuthenticationClient.reducerPath]: AuthenticationClient.reducer,
    [EspnClientV2.reducerPath]: EspnClientV2.reducer,
    [EspnFantasyClientV2.reducerPath]: EspnFantasyClientV2.reducer,
    [EspnFantasyClientV3.reducerPath]: EspnFantasyClientV3.reducer,
    [EspnPlayerNewsSlice.reducerPath]: EspnPlayerNewsSlice.reducer,
    [fangraphsClient.reducerPath]: fangraphsClient.reducer,
    [FangraphsStatsFilterFormSlice.reducerPath]: FangraphsStatsFilterFormSlice.reducer,
    [SupabaseClient.reducerPath]: SupabaseClient.reducer,
    [baseballPlayersSlice.reducerPath]: baseballPlayersSlice.reducer,
    [baseballEventsSlice.reducerPath]: baseballEventsSlice.reducer,
    [baseballTeamRosterSlice.reducerPath]: baseballTeamRosterSlice.reducer,
    [baseballTeamSlice.reducerPath]: baseballTeamSlice.reducer,
    [baseballTeamLiveSlice.reducerPath]: baseballTeamLiveSlice.reducer,
    [baseballTransactionSlice.reducerPath]: baseballTransactionSlice.reducer,
    [baseballLeagueSlice.reducerPath]: baseballLeagueSlice.reducer,
    [FastcastClient.reducerPath]: FastcastClient.reducer,
    [FastcastEventsSlice.reducerPath]: FastcastEventsSlice.reducer,
    [FastcastSportsSlice.reducerPath]: FastcastSportsSlice.reducer,
    [FastcastLeaguesSlice.reducerPath]: FastcastLeaguesSlice.reducer,
    [fangraphsBatterSlice.reducerPath]: fangraphsBatterSlice.reducer,
    [fangraphsPitcherSlice.reducerPath]: fangraphsPitcherSlice.reducer,
    [lineupHeadquartersHandler.reducerPath]: lineupHeadquartersHandler.reducer,
    [masterSlateHandler.reducerPath]: masterSlateHandler.reducer,
    [slatePlayerHandler.reducerPath]: slatePlayerHandler.reducer,
    [footballGameAttributesHandler.reducerPath]: footballGameAttributesHandler.reducer,
    [dfsFootballPlayerGameAttributesSlice.reducerPath]: dfsFootballPlayerGameAttributesSlice.reducer,
    [dfsFootballTeamGameAttributesSlice.reducerPath]: dfsFootballTeamGameAttributesSlice.reducer,
    [slatePlayersSlice.reducerPath]: slatePlayersSlice.reducer,
    [TomorrowIoClient.reducerPath]: TomorrowIoClient.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthenticationClient.middleware)
      .concat(EspnClientV2.middleware)
      .concat(EspnFantasyClientV2.middleware)
      .concat(EspnFantasyClientV3.middleware)
      .concat(SupabaseClient.middleware)
      .concat(fangraphsClient.middleware)
      .concat(FastcastClient.middleware)
      .concat(lineupHeadquartersHandler.middleware)
      .concat(masterSlateHandler.middleware)
      .concat(footballGameAttributesHandler.middleware)
      .concat(slatePlayerHandler.middleware)
      .concat(TomorrowIoClient.middleware)
      .concat(fastcastWebSocketMiddleware),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

export const getAppStore = AppStore.getState();
