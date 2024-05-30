import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { BaseEspnEndpointBuilder } from '../../helpers';
import { ESPN_PARAM_FRAGMENTS, ESPN_VIEW_PARAM_FRAGMENTS } from '../../helpers/endpoint-builder/endpoint-builder.const';
import { clientLeagueToLeagueSettings } from '../../transformers';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballTeam } from '../models/baseball-team.model';
import { baseballTeamRosterAdapter } from '../slices/baseball-team-roster.slice';
import { clientTeamToBaseballTeam, transformClientLeagueToBaseballLeagueV2 } from '../transformers';

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
        const genericLeagueSettings = clientLeagueToLeagueSettings(league);

        return transformClientLeagueToBaseballLeagueV2(league, genericLeagueSettings);
      },
    }),
    fetchTeamById: builder.query<BaseballTeam, FetchTeamParams>({
      query: args => {
        const { year, leagueId, teamId } = args;

        const params = new URLSearchParams();
        params.append(ESPN_PARAM_FRAGMENTS.RosterForTeamId, teamId);
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Team);
        params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Roster);

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
