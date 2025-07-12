import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IClientBaseballTeam, IClientSimplePlayerEntity, TRANSACTION } from '@sdk/espn-client-models';
import { BATTING_LINEUP_SLOTS, ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup';
import { IClientBaseballLeague, IClientLeague } from '@sdk/espn-client-models/league.model';
import { ApiEndpointConfiguration } from '../../../api.config';
import { BaseballLeague } from '../fantasy-baseball/models/baseball-league.model';
import { BaseballPlayerEntity } from '../fantasy-baseball/models/baseball-player.model';
import { BaseballTeamEntity } from '../fantasy-baseball/models/baseball-team.model';
import {
  clientSimplePlayerToBaseballPlayer,
  clientTeamToBaseballTeam,
  transformClientLeagueToBaseballLeagueV2,
} from '../fantasy-baseball/transformers';
import { FantasyBaseballEndpointBuilder } from '../helpers/endpoint-builder/endpoint-builder';
import { FANTASY_SPORTS_ABBREVIATION } from '../helpers/endpoint-builder/endpoint-builder.const';
import { FantasySportsAbbreviation } from '../helpers/endpoint-builder/endpoint-builder.model';
import { EspnParamsBuilder } from '../helpers/params-handler/params-handler';
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

        const params = EspnParamsBuilder.forPlayer(scoringPeriodId).build();

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
        const params = EspnParamsBuilder.forLeague().build();

        const url = FantasyBaseballEndpointBuilder.getLeague(year, leagueId);

        return {
          url,
          params,
          headers: {
            'X-Fantasy-Filter': JSON.stringify({
              transactions: {
                filterType: {
                  value: [TRANSACTION.FreeAgent, TRANSACTION.Waiver],
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

        const params = EspnParamsBuilder.forTeam(teamId).build();

        const url = FantasyBaseballEndpointBuilder.getLeague(year, leagueId);

        return {
          url,
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
        const params = EspnParamsBuilder.forLeague().build();

        return {
          url: `/games/${sport}/seasons/${year}/segments/0/leagues/${leagueId}`,
          params,
        };
      },
      transformResponse: (league: IClientLeague) => clientLeagueToLeagueSettings(league),
    }),
  }),
});
