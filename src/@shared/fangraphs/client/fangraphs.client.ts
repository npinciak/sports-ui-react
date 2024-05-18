import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabase.client';
import {
  FangraphsPageOfPlayerStats,
  FangraphsPlayerProjectionEntity,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsPlayerStatsRequestBody,
} from '../models';
import { FangraphsClientTag, FangraphsClientTagList } from './fangraphs.client.model';

export const fangraphsClient = createApi({
  reducerPath: 'fangraphsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: FangraphsClientTagList,
  endpoints: builder => ({
    getFangraphProjections: builder.query<FangraphsPlayerProjectionEntity[], FangraphsPlayerProjectionsRequestBody>({
      queryFn: async args => {
        const { type, pos, team } = args;
        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-api', {
          body: {
            path: `/projections?type=${type}&stats=bat&pos=${pos}&team=${team}&players=0&lg=all&z=1714300977`,
          },
        });

        if (!data) return { data: [] };
        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphStats: builder.query<FangraphsPageOfPlayerStats | null, FangraphsPlayerStatsRequestBody>({
      queryFn: async args => {
        const {
          pos,
          meta: { pageitems, pagenum },
          team,
          players,
        } = args;
        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-api', {
          body: {
            path: `/leaders/major-league/data?age=&pos=${pos}&stats=bat&lg=all&qual=y&season=2024&season1=2024&startdate=2024-03-01&enddate=2024-11-01&month=0&hand=&team=${team}&pageitems=${pageitems ?? 30}&pagenum=${pagenum ?? 1}&ind=0&rost=0&players=${players}&type=8&postseason=&sortdir=default&sortstat=WAR`,
          },
        });

        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphsApi: builder.query<FangraphsPageOfPlayerStats | null, FangraphsPlayerStatsRequestBody>({
      queryFn: async args => {
        const body = args;
        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-api', {
          body: {
            path: '/leaders/major-league/options/splits?seasonstart=2024&seasonend=2024&stats=bat&postseason=false',
          },
        });

        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
  }),
});

export const { useGetFangraphProjectionsQuery, useGetFangraphStatsQuery, useGetFangraphsApiQuery } = fangraphsClient;
