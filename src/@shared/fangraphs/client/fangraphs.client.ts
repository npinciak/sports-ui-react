import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabase.client';
import {
  FANGRAPHS_PROJECTION,
  FangraphsPageOfPlayerStats,
  FangraphsPlayerProjectionEntity,
  FangraphsTeam,
  IClientFangraphsProjectionsRequestBodyBase,
  IClientFangraphsStatsRequestBodyBase,
} from '../models';
import { FangraphsClientTag, FangraphsClientTagList } from './fangraphs.client.model';

export const fangraphsClient = createApi({
  reducerPath: 'fangraphsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: FangraphsClientTagList,
  endpoints: builder => ({
    getFangraphProjections: builder.query<FangraphsPlayerProjectionEntity[], IClientFangraphsProjectionsRequestBodyBase>({
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

        return handleReturnData(data);
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphPitcherPlayerList: builder.query<FangraphsPlayerProjectionEntity[], void>({
      queryFn: async () => {
        const body = {
          type: FANGRAPHS_PROJECTION.SteamerU,
          team: FangraphsTeam.AllTeams,
          stats: 'pit',
          players: ['0'],
        };

        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-projections', {
          body,
        });

        return handleReturnData(data);
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphBatterPlayerList: builder.query<FangraphsPlayerProjectionEntity[], void>({
      queryFn: async () => {
        const body = {
          type: FANGRAPHS_PROJECTION.SteamerU,
          team: FangraphsTeam.AllTeams,
          stats: 'bat',
          players: ['0'],
        };

        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-projections', {
          body,
        });

        return handleReturnData(data);
      },
      providesTags: [FangraphsClientTag.FangraphsProjections],
    }),
    getFangraphStats: builder.query<FangraphsPageOfPlayerStats, IClientFangraphsStatsRequestBodyBase>({
      queryFn: async args => {
        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-stats', {
          body: args,
        });

        return handleReturnData(data);
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

        return handleReturnData(data);
      },
    }),
  }),
});

export const { useGetFangraphStatsQuery, useGetStatPeriodSplitOptionsQuery, useRefetchStatsMutation } = fangraphsClient;

function handleReturnData<T>(data: T | null): { data: T } {
  if (!data) return { data: [] as T };
  if (data == null) return { data: [] as T };

  return { data };
}
