import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { FantasyLeague } from '../../models';
import { clientLeagueToLeague } from '../../transformers';
import { BaseballLeague } from '../models/baseball-league.model';
import { clientLeagueToBaseballLeague } from '../transformers/baseball-league.transformers';

type FetchLeagueParams = {
  year: string;
  leagueId: string;
};

export const baseballClient = createApi({
  reducerPath: 'baseballClient',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ESPN_FANTASY_BASE_V3,
  }),
  endpoints: builder => ({
    fetchLeague: builder.query<BaseballLeague, FetchLeagueParams>({
      query: args => ({
        url: `/games/flb/seasons/${args.year}/segments/0/leagues/${args.leagueId}?view=mSettings&view=kona_player_info&view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam&view=mTransactions2&view=mPendingTransactions&view=kona_league_communication`,
      }),
      transformResponse: (res: EspnClient.BaseballLeague) => {
        const genericLeagueSettings: FantasyLeague = clientLeagueToLeague(res);
        return clientLeagueToBaseballLeague(res, genericLeagueSettings);
      },
    }),
  }),
});
