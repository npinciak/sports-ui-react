import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IClientBaseballTeam, IClientSimplePlayerEntity } from '@sdk/espn-client-models';
import { IClientBaseballLeague, IClientLeague } from '@sdk/espn-client-models/league.model';
import { ApiEndpointConfiguration } from '../../../api.config';
import { generateLeagueParams, generatePlayerParams, generateTeamParams } from '../espn-helpers';
import { BaseballLeague } from '../fantasy-baseball/models/baseball-league.model';
import { BaseballPlayerEntity } from '../fantasy-baseball/models/baseball-player.model';
import { BaseballTeamEntity } from '../fantasy-baseball/models/baseball-team.model';
import {
  clientSimplePlayerToBaseballPlayer,
  clientTeamToBaseballTeam,
  transformClientLeagueToBaseballLeagueV2,
} from '../fantasy-baseball/transformers';
import { FANTASY_SPORTS_ABBREVIATION } from '../helpers/endpoint-builder/endpoint-builder.const';
import { FantasySportsAbbreviation } from '../helpers/endpoint-builder/endpoint-builder.model';
import { IFantasyLeague } from '../models';
import { clientLeagueToLeagueSettings } from '../transformers';

interface IClientGetBaseballPlayerParams {
  year: string;
  scoringPeriodId: string;
}

interface IClientGetBaseballLeagueParams {
  year: string;
  leagueId: string;
}

interface IClientGetBaseballTeamParams {
  year: string;
  leagueId: string;
  teamId: string;
}

interface IClientValidateLeagueParams {
  year: string;
  leagueId: string;
  sport: FantasySportsAbbreviation;
}

export const EspnFantasyClientV3 = createApi({
  reducerPath: 'espnFantasyClientV3',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.espnFantasyEndpointV3,
  }),
  endpoints: builder => ({
    getBaseballPlayers: builder.query<BaseballPlayerEntity[], IClientGetBaseballPlayerParams>({
      query: args => {
        const { year, scoringPeriodId } = args;

        const params = generatePlayerParams(scoringPeriodId);

        return {
          url: `/games/${FANTASY_SPORTS_ABBREVIATION.Baseball}/seasons/${year}/players`,
          params,
          headers: {
            'X-Fantasy-Filter': JSON.stringify({
              players: {
                filterActive: {
                  value: true,
                },
              },
            }),
          },
        };
      },
      transformResponse: (players: IClientSimplePlayerEntity[]) => {
        return players.map(player => clientSimplePlayerToBaseballPlayer(player));
      },
    }),
    getPlayerNews: builder.query<
      unknown,
      {
        fantasySport: FantasySportsAbbreviation;
        lookbackPeriod: number;
        playerId: string;
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
    getBaseballLeague: builder.query<BaseballLeague, IClientGetBaseballLeagueParams>({
      query: args => {
        const { year, leagueId } = args;
        const params = generateLeagueParams();

        return {
          url: `/games/${FANTASY_SPORTS_ABBREVIATION.Baseball}/seasons/${year}/segments/0/leagues/${leagueId}`,
          params,
          headers: {
            'X-Fantasy-Filter': JSON.stringify({
              transactions: {
                filterType: {
                  value: ['WAIVER', 'FREEAGENT'],
                },
              },
              schedule: { filterCurrentMatchupPeriod: { value: true } },
            }),
          },
        };
      },
      transformResponse: (league: IClientBaseballLeague) => {
        const genericLeagueSettings = clientLeagueToLeagueSettings(league);

        return transformClientLeagueToBaseballLeagueV2(league, genericLeagueSettings);
      },
    }),
    getBaseballTeamById: builder.query<BaseballTeamEntity, IClientGetBaseballTeamParams>({
      query: args => {
        const { year, leagueId, teamId } = args;

        const params = generateTeamParams(teamId);

        return {
          url: `/games/${FANTASY_SPORTS_ABBREVIATION.Baseball}/seasons/${year}/segments/0/leagues/${leagueId}`,
          params,
        };
      },
      transformResponse: (league: IClientBaseballLeague, _, args) => {
        const { teamId } = args;

        const team = league.teams.find(t => t.id.toString() === teamId) as IClientBaseballTeam;

        return clientTeamToBaseballTeam(team);
      },
    }),
    validateLeague: builder.query<IFantasyLeague, IClientValidateLeagueParams>({
      query: args => {
        const { year, leagueId, sport } = args;
        const params = generateLeagueParams();

        return {
          url: `/games/${sport}/seasons/${year}/segments/0/leagues/${leagueId}`,
          params,
        };
      },
      transformResponse: (league: IClientLeague) => clientLeagueToLeagueSettings(league),
    }),
  }),
});
