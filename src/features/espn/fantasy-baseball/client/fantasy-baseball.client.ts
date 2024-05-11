import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { BaseEspnEndpointBuilder } from '../../helpers';
import { ESPN_PARAM_FRAGMENTS, ESPN_VIEW_PARAM_FRAGMENTS } from '../../helpers/endpoint-builder/endpoint-builder.const';
import { clientLeagueToLeague } from '../../transformers';
import { BaseballLeague } from '../models/baseball-league.model';
import { transformClientLeagueToBaseballLeagueV2 } from '../transformers';

type FetchLeagueParams = {
  year: string;
  leagueId: string;
};

type FetchTeamParams = FetchLeagueParams & {
  teamId: string;
};

const endpoints = BaseEspnEndpointBuilder({});

export const baseballClient = createApi({
  reducerPath: 'baseballClient',
  baseQuery: fetchBaseQuery({
    // https://lm-api-reads.fantasy.espn.com/apis/v3
    baseUrl: endpoints.fantasyBaseV3Seasons,
  }),
  endpoints: builder => ({
    fetchLeagueById: builder.query<BaseballLeague, FetchLeagueParams>({
      query: args => {
        const { year, leagueId } = args;

        const params = new URLSearchParams();
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Settings);
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.LiveScoring);
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Scoreboard);
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Status);
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Team);

        return {
          url: endpoints.fantasyBaseV3LeagueBySeasonById(year, leagueId),
          params,
        };
      },
      transformResponse: (league: EspnClient.BaseballLeague) => {
        const genericLeagueSettings = clientLeagueToLeague(league);

        return transformClientLeagueToBaseballLeagueV2(league, genericLeagueSettings);
      },
    }),
    fetchTeamById: builder.query<any, FetchTeamParams>({
      query: args => ({
        url: `/games/flb/seasons/${args.year}/segments/0/leagues/${args.leagueId}?rosterForTeamId=${args.teamId}&[ESPN_PARAM_FRAGMENTS.View]=mRoster`,
      }),
    }),
  }),
});

export const { useFetchLeagueByIdQuery, useFetchTeamByIdQuery } = baseballClient;
