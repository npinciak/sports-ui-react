import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseEspnEndpointBuilder } from '../../helpers/endpoint-builder/endpoint-builder';
import { UIFastcast } from '../models/fastcast-transform.model';
import { transformFastcastCheckpointToUIFastcast } from '../transformers/espn-fastcast.transformers';

const endpoints = BaseEspnEndpointBuilder({});

export const FastcastStaticClient = createApi({
  reducerPath: 'fastcastStaticClient',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.staticScoreboard,
  }),
  endpoints: builder => ({
    getStaticScoreboard: builder.query<UIFastcast, void>({
      query: () => {
        return { url: '' };
      },
      transformResponse: (response: any) => {
        return transformFastcastCheckpointToUIFastcast(response);
      },
    }),
  }),
});
