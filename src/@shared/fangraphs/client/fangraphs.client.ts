import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabase.client';
import {
  FANGRAPHS_POSITION,
  FANGRAPHS_PROJECTION,
  FangraphsPageOfPlayerStats,
  FangraphsPlayerProjectionEntity,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsTeam,
  IClientFangraphsStatsRequestBodyBase,
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
          pos: FANGRAPHS_POSITION.All,
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
    getFangraphStats: builder.query<FangraphsPageOfPlayerStats, IClientFangraphsStatsRequestBodyBase>({
      queryFn: async args => {
        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-stats', {
          body: args,
        });

        if (!data) return { data: { data: [], dateRange: '', dateRangeSeason: '', sortDir: '', sortStat: '', totalCount: 0 } };
        return { data };
      },
      providesTags: [FangraphsClientTag.FangraphsStats],
    }),
    refetchStats: builder.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: [FangraphsClientTag.FangraphsStats],
    }),
    getStatPeriodSplitOptions: builder.query<{ label: string; value: number }[], void>({
      queryFn: async () => {
        const { data } = await supabase.functions.invoke<{ label: string; value: number }[]>('fangraphs-api', {
          body: {
            path: '/leaders/major-league/options/splits?seasonstart=2025&seasonend=2025&stats=bat&postseason=false',
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
