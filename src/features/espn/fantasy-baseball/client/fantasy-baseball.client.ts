import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { generateLeagueParams, generateTeamParams } from '../../espn-helpers';
import { BaseEspnEndpointBuilder } from '../../helpers';
import { FetchLeagueArgs, FetchTeamArgs } from '../../models';
import { clientLeagueToLeagueSettings } from '../../transformers';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballTeam } from '../models/baseball-team.model';
import { clientTeamToBaseballTeam, transformClientLeagueToBaseballLeagueV2 } from '../transformers';

const endpoints = BaseEspnEndpointBuilder({});

export const baseballClient = createApi({
  reducerPath: 'baseballClient',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.fantasyBaseV3Seasons,
  }),
  endpoints: builder => ({
    fetchLeagueById: builder.query<BaseballLeague, FetchLeagueArgs>({
      query: args => {
        const { year, leagueId } = args;

        const params = generateLeagueParams();

        return {
          url: endpoints.fantasyBaseV3LeagueBySeasonById(year, leagueId),
          params,
        };
      },
      transformResponse: (league: EspnClient.BaseballLeague) => {
        const genericLeagueSettings = clientLeagueToLeagueSettings(league);

        return transformClientLeagueToBaseballLeagueV2(league, genericLeagueSettings);
      },
    }),
    fetchTeamById: builder.query<BaseballTeam, FetchTeamArgs>({
      query: args => {
        const { year, leagueId, teamId } = args;

        const params = generateTeamParams(teamId);

        return {
          url: endpoints.fantasyBaseV3LeagueBySeasonById(year, leagueId),
          params,
        };
      },
      transformResponse: (league: EspnClient.BaseballLeague, _, args) => {
        const { teamId } = args;

        const team = league.teams.find(t => t.id.toString() === teamId) as EspnClient.Team;

        return clientTeamToBaseballTeam(team);
      },
    }),
  }),
});

export const { useFetchLeagueByIdQuery, useFetchTeamByIdQuery } = baseballClient;
