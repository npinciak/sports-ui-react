import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseEspnEndpointBuilder } from '../../helpers/endpoint-builder/endpoint-builder';
import { UIFastcast } from '../models/fastcast-transform.model';
import { WebSocketConnectionInfo } from '../models/websocket.model';
import { transformFastcastCheckpointToUIFastcast } from '../transformers/espn-fastcast.transformers';

const endpoints = BaseEspnEndpointBuilder({});

export const FastcastClient = createApi({
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
    getFastcast: builder.query<UIFastcast, { url: string }>({
      query: args => {
        const { url } = args;
        return { url };
      },
      transformResponse: (response: any) => {
        return transformFastcastCheckpointToUIFastcast(response);
      },
    }),
  }),
});
