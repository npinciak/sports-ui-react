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

        const params = new URLSearchParams();
        params.append('type', type);
        params.append('pos', pos);
        params.append('team', team as unknown as string);
        params.append('players', '0');
        params.append('lg', 'all');
        params.append('z', '1714300977');

        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-api', {
          body: {
            path: `/projections?${params.toString()}`,
          },
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

        const params = new URLSearchParams();
        params.append('pos', pos);
        params.append('players', players.map(id => Number(id)).join(','));
        params.append('pageitems', pageitems.toString() ?? '30');
        params.append('pagenum', pagenum.toString() ?? '1');
        params.append('team', team as unknown as string);
        params.append('month', statSplitPeriod.toString());
        params.append('age', '');
        params.append('stats', 'bat');
        params.append('lg', 'all');
        params.append('qual', 'y');
        params.append('season', '2024');
        params.append('season1', '2024');
        params.append('startdate', '2024-03-01');
        params.append('enddate', '2024-11-01');
        params.append('hand', '');
        params.append('ind', '0');
        params.append('rost', '0');
        params.append('type', '8');
        params.append('postseason', '');
        params.append('sortdir', 'default');
        params.append('sortstat', 'WAR');

        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-api', {
          body: {
            path: `/leaders/major-league/data?${params.toString()}`,
          },
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
