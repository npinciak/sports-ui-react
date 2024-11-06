import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DfsEndpointBuilder } from '../helpers/endpoint-builder/endpoint.builder';
import { SlatePlayerEntity } from '../models';

const endpoints = DfsEndpointBuilder();

export const slatePlayerHandler = createApi({
  reducerPath: 'slatePlayerHandler',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.slates,
  }),
  endpoints: builder => ({
    fetchSlateByDfsSiteBySlateId: builder.query<SlatePlayerEntity[], { site: string; slateId: string }>({
      query: args => {
        const { site, slateId } = args;

        const subDirectory = Number(slateId) % 100;

        return {
          url: `/${site}/${subDirectory}/${slateId}.json`,
        };
      },
    }),
  }),
});

export const { useFetchSlateByDfsSiteBySlateIdQuery, useLazyFetchSlateByDfsSiteBySlateIdQuery } = slatePlayerHandler;
