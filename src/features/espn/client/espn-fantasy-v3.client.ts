import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { ApiEndpointConfiguration } from '../../../api.config';
import { generateLeagueParams, generateTeamParams } from '../espn-helpers';
import { BaseballLeague } from '../fantasy-baseball/models/baseball-league.model';
import { BaseballTeam } from '../fantasy-baseball/models/baseball-team.model';
import { clientTeamToBaseballTeam, transformClientLeagueToBaseballLeagueV2 } from '../fantasy-baseball/transformers';
import { FANTASY_SPORTS_ABBREVIATION } from '../helpers/endpoint-builder/endpoint-builder.const';
import { FantasySportsAbbreviation } from '../helpers/endpoint-builder/endpoint-builder.model';
import { FetchTeamArgs } from '../models';
import { clientLeagueToLeagueSettings } from '../transformers';

export const EspnFantasyClientV3 = createApi({
  reducerPath: 'espnFantasyClientV3',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.espnFantasyEndpointV3,
  }),
  endpoints: builder => ({
    getPlayerNews: builder.query<
      unknown,
      {
        fantasySport: FantasySportsAbbreviation;
        lookbackPeriod: number;
        playerId: string | null;
      }
    >({
      query: args => {
        const { fantasySport, lookbackPeriod, playerId } = args;

        const params = {
          days: lookbackPeriod,
          playerId,
        };

        return {
          url: `/games/${fantasySport}/news/players`,
          params,
        };
      },
    }),
    getBaseballLeague: builder.query<
      BaseballLeague,
      {
        year: string | null;
        leagueId: string | null;
      }
    >({
      query: args => {
        const { year, leagueId } = args;
        const params = generateLeagueParams();

        return {
          url: `/games/${FANTASY_SPORTS_ABBREVIATION.Baseball}/seasons/${year}/segments/0/leagues/${leagueId}`,
          params,
        };
      },
      transformResponse: (league: EspnClient.BaseballLeague) => {
        const genericLeagueSettings = clientLeagueToLeagueSettings(league);

        return transformClientLeagueToBaseballLeagueV2(league, genericLeagueSettings);
      },
    }),
    getBaseballTeamById: builder.query<BaseballTeam, FetchTeamArgs>({
      query: args => {
        const { year, leagueId, teamId } = args;

        const params = generateTeamParams(teamId);

        return {
          url: `/games/${FANTASY_SPORTS_ABBREVIATION.Baseball}/seasons/${year}/segments/0/leagues/${leagueId}`,
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
