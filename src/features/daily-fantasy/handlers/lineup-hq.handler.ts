import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DfsEndpointBuilder } from '../helpers/endpoint-builder/endpoint.builder';

const endpoints = DfsEndpointBuilder();

export const lineupHeadquartersHandler = createApi({
  reducerPath: 'lineupHeadquartersHandler',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.lineupHeadquartersPlayers,
  }),
  endpoints: builder => ({
    fetchLineupHeadquarterPlayersBySport: builder.query<{
      
    }, { sport: 'nfl' | 'mlb' | 'nhl' }>({
      query: args => {
        const { sport } = args;

        return {
          url: `/${sport}/players.json`,
        };
      },
    }),
  }),
});

export const { useFetchLineupHeadquarterPlayersBySportQuery } = lineupHeadquartersHandler;
