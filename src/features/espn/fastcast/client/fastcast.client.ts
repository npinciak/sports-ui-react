import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseEspnEndpointBuilder } from '../../helpers/endpoint-builder/endpoint-builder';
import { WebSocketConnectionInfo } from '../models/websocket.model';
import { clientFastcastToFastcast } from '../transformers/espn-fastcast.transformers';
import { FastcastEvent } from '../models/fastcast-event.model';
import { FastcastLeague } from '../models/fastcast-league.model';
import { IFastcastSportEntity } from '../models/fastcast-sport.model';

const endpoints = BaseEspnEndpointBuilder({});

export const fastcastClient = createApi({
  reducerPath: 'fastcastClient',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.espnFastcastWebSocketHost,
  }),
  endpoints: builder => ({
    getFastCastWebsocketConnectionInfo: builder.query<WebSocketConnectionInfo, void>({
      query: () => {
        return { url: '' };
      },
    }),
    getFastcast: builder.query<
      {
        fastcastSports: IFastcastSportEntity[];
        fastcastLeagues: FastcastLeague[];
        fastcastEvents: FastcastEvent[];
      },
      { url: string }
    >({
      query: args => {
        const { url } = args;
        return { url };
      },
      transformResponse: (response: any) => {
        return clientFastcastToFastcast(response);
      },
    }),
  }),
});

const SPORT = {
  BASEBALL: '1',
  FOOTBALL: '20',
  BASKETBALL: '40',
  HOCKEY: '70',
  SOCCER: '600',
};

/**
 * Sports to include in Fastcast
 *
 * @param id
 * @returns
 */
export function includeSports(id: string): boolean {
  return new Set([SPORT.BASEBALL, SPORT.FOOTBALL, SPORT.BASKETBALL, SPORT.HOCKEY, SPORT.SOCCER]).has(id);
}

/**
 * Leagues to include in Fastcast
 *
 * @param id
 * @returns boolean
 */
export function includeLeagues(id: string): boolean {
  return new Set(['10', '28', '46', '90', '775', '776', '20296']).has(id);
}

/**
 * Leagues to exclude in Fastcast
 *
 * @param id
 * @returns boolean
 */
export function excludeLeagues(id: string): boolean {
  const leagueIds = ['14', '62', '760', '102', '3923', '8097', '8301', '20226', '54', '59', '19834', '8301', '19483', '19868', '19728'];
  return new Set(leagueIds).has(id);
}
