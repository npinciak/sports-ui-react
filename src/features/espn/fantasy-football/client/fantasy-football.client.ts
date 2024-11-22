import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { SmartDate } from '../../../../@shared/helpers';
import { generateEventParams, generateLeagueParams, generateTeamParams } from '../../espn-helpers';
import { BaseEspnEndpointBuilder } from '../../helpers';
import { FANTASY_SPORTS_ABBREVIATION } from '../../helpers/endpoint-builder/endpoint-builder.const';
import { FetchLeagueArgs, FetchTeamArgs } from '../../models';
import { clientLeagueToLeagueSettings } from '../../transformers';
import { FootballLeague } from '../models/football-league.model';
import { FootballTeam } from '../models/football-team.model';
import { clientLeagueToFootballLeague, clientTeamToFootballTeam } from '../transformers/football-league.transformers';

const endpoints = BaseEspnEndpointBuilder({
  sport: FANTASY_SPORTS_ABBREVIATION.Football,
});

export const footballClient = createApi({
  reducerPath: 'footballClient',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.fantasyBaseV3Seasons,
  }),
  endpoints: builder => ({
    fetchLeagueById: builder.query<FootballLeague, FetchLeagueArgs>({
      query: args => {
        const { year, leagueId } = args;

        const params = generateLeagueParams();

        return {
          url: endpoints.fantasyBaseV3LeagueBySeasonById(year, leagueId),
          params,
        };
      },
      transformResponse: (league: EspnClient.FootballLeague) => {
        const genericLeagueSettings = clientLeagueToLeagueSettings(league);

        return clientLeagueToFootballLeague(league, genericLeagueSettings);
      },
    }),
    fetchTeamById: builder.query<FootballTeam, FetchTeamArgs>({
      query: args => {
        const { year, leagueId, teamId } = args;

        const params = generateTeamParams(teamId);

        return {
          url: endpoints.fantasyBaseV3LeagueBySeasonById(year, leagueId),
          params,
        };
      },
      transformResponse: (league: EspnClient.FootballLeague, _, args) => {
        const { teamId } = args;

        const team = league.teams.find(t => t.id.toString() === teamId) as EspnClient.FootballTeam;

        return clientTeamToFootballTeam(team);
      },
    }),
    fetchEvents: builder.query<EspnClient.EventList, void>({
      query: () => {
        const smartDate = new SmartDate();

        const oneWeekAgoFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });
        const oneWeekFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });

        const dateRange = `${oneWeekAgoFromToday}-${oneWeekFromToday}`;

        const params = generateEventParams(dateRange);

        return {
          url: endpoints.espnEvents,
          params,
        };
      },
    }),
    fetchFreeAgents: builder.query<FootballLeague, FetchLeagueArgs>({
      query: args => {
        const { year, leagueId } = args;

        const params = generateLeagueParams();

        const headers = new Headers();
        headers.append('X-Fantasy-Filter', JSON.stringify({}));

        return {
          url: endpoints.fantasyBaseV3LeagueBySeasonById(year, leagueId),
          params,
          headers,
        };
      },
    }),
  }),
});

export const { useFetchLeagueByIdQuery, useFetchTeamByIdQuery, useFetchEventsQuery } = footballClient;
