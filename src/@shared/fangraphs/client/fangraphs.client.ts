import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabase.client';
import {
  FANGRAPHS_PROJECTION,
  FangraphsPageOfPlayerStats,
  FangraphsPlayerProjectionEntity,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsPlayerStatsRequestBody,
  FangraphsPosition,
  FangraphsTeam,
} from '../models';
import { FangraphsClientTag, FangraphsClientTagList } from './fangraphs.client.model';

export const fangraphsClient = createApi({
  reducerPath: 'fangraphsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: FangraphsClientTagList,
  endpoints: builder => ({
    getFangraphProjections: builder.query<FangraphsPlayerProjectionEntity[], FangraphsPlayerProjectionsRequestBody>({
      queryFn: async args => {
        const { type, pos, team, players } = args;

        const body = {
          type,
          pos,
          team,
          players,
        };

        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-projections', {
          body,
        });

        if (!data) return { data: [] };
        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphPlayerList: builder.query<FangraphsPlayerProjectionEntity[], void>({
      queryFn: async () => {
        const body = {
          type: FANGRAPHS_PROJECTION.Steamer600,
          pos: FangraphsPosition.All,
          team: FangraphsTeam.AllTeams,
          players: ['0'],
        };

        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-projections', {
          body,
        });

        if (!data) return { data: [] };
        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphStats: builder.query<FangraphsPageOfPlayerStats, FangraphsPlayerStatsRequestBody>({
      queryFn: async args => {
        const {
          pos,
          meta: { pageitems, pagenum },
          team,
          players,
          statSplitPeriod,
        } = args;

        const body = {
          pos,
          meta: { pageitems, pagenum },
          team,
          players,
          statSplitPeriod,
        };

        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-stats', {
          body,
        });

        if (!data) return { data: { data: [], dateRange: '', dateRangeSeason: '', sortDir: '', sortStat: '', totalCount: 0 } };
        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsStats],
    }),
    refetchStats: builder.mutation<null, void>({
      // The query is not relevant here, so a `null` returning `queryFn` is used
      queryFn: () => ({ data: null }),
      // This mutation takes advantage of tag invalidation behaviour to trigger
      // any queries that provide the 'Post' or 'User' tags to re-fetch if the queries
      // are currently subscribed to the cached data
      invalidatesTags: [FangraphsClientTag.FangraphsStats],
    }),
    getStatPeriodSplitOptions: builder.query<{ label: string; value: number }[], void>({
      queryFn: async () => {
        const { data } = await supabase.functions.invoke<{ label: string; value: number }[]>('fangraphs-api', {
          body: {
            path: '/leaders/major-league/options/splits?seasonstart=2024&seasonend=2024&stats=bat&postseason=false',
          },
        });

        if (!data) return { data: [] };

        return { data };
      },
    }),
  }),
});

export const {
  useGetFangraphProjectionsQuery,
  useGetFangraphStatsQuery,
  useLazyGetFangraphStatsQuery,
  useGetStatPeriodSplitOptionsQuery,
  useRefetchStatsMutation,
} = fangraphsClient;
