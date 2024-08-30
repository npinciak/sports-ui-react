import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DfsEndpointBuilder } from '../helpers/endpoint-builder/endpoint.builder';
import { DfsSite } from '../models/dfs-site.model';
import { SlateMasterBySiteMap, SlateMasterEntity } from '../models/slate-master.model';

const endpoints = DfsEndpointBuilder();

export const masterSlateHandler = createApi({
  reducerPath: 'masterSlateHandler',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.masterSlates,
  }),
  endpoints: builder => ({
    fetchMasterSlatesBySport: builder.query<SlateMasterEntity[], { site: DfsSite; sport: 'nfl' | 'mlb' | 'nhl' }>({
      query: args => {
        const { sport } = args;

        return {
          url: `/${sport}-master.json`,
        };
      },
      transformResponse: (response: SlateMasterBySiteMap, _, arg) => {
        const { site } = arg;

        return Object.values(response[site]).sort((a, b) => a.date.localeCompare(b.date));
      },
    }),
  }),
});

export const { useFetchMasterSlatesBySportQuery } = masterSlateHandler;
