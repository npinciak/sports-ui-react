import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpointConfiguration } from '../../../../api.config';
import { UIFastcast } from '../models/fastcast-transform.model';
import { WebSocketConnectionInfo } from '../models/websocket.model';
import { transformFastcastCheckpointToUIFastcast } from '../transformers/espn-fastcast.transformers';

export const FastcastClient = createApi({
  reducerPath: 'fastcastClient',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.espnFastcastWebsocketConnectionUrl,
  }),
  endpoints: builder => ({
    getFastCastWebsocketConnectionInfo: builder.query<WebSocketConnectionInfo, void>({
      query: () => {
        return { url: '/public/websockethost' };
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
