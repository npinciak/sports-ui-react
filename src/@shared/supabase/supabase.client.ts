import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createClient } from '@supabase/supabase-js';
import {
  FangraphsPageOfPlayerStats,
  FangraphsPlayerProjectionEntity,
  FangraphsPlayerProjectionsRequestBody,
  FangraphsPlayerStatsRequestBody,
} from '../fangraphs/models';
import { Database } from './supabase-database.model';
import { SupaClientEspnPlayerInsert, SupaClientFangraphsConstantsTable, SupaClientLeagueProgressionInsert } from './supabase-tables.model';

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const SupabaseClientTag = {
  GetLeagueProgression: 'GetLeagueProgression',
  FangraphsProjections: 'FangraphsProjections',
  FangraphsStats: 'FangraphsStats',
  FangraphsConstants: 'FangraphsConstants',
  EspnPlayer: 'EspnPlayer',
} as const;

const SupabaseClientTagList = [
  SupabaseClientTag.GetLeagueProgression,
  SupabaseClientTag.FangraphsProjections,
  SupabaseClientTag.FangraphsStats,
  SupabaseClientTag.FangraphsConstants,
  SupabaseClientTag.EspnPlayer,
];

export const supabaseClient = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: SupabaseClientTagList,
  endpoints: builder => ({
    getLeagueProgression: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from('league-progression').select().order('date', { ascending: false });
        if (error) return { error };

        return { data };
      },
      providesTags: [SupabaseClientTag.GetLeagueProgression],
    }),
    createLeagueProgressionEntity: builder.mutation<null, SupaClientLeagueProgressionInsert>({
      queryFn: async args => {
        const { data, error } = await supabase.from('league-progression').insert({ ...args });
        if (error) return { error };

        return { data };
      },
      invalidatesTags: [SupabaseClientTag.GetLeagueProgression],
    }),
    createEspnPlayer: builder.mutation<null, SupaClientEspnPlayerInsert[]>({
      queryFn: async player => {
        const { data, error } = await supabase.from('espn_mlb_player').insert(player);
        if (error) return { error };

        return { data };
      },
    }),
    getFangraphsConstantsBySeason: builder.query<SupaClientFangraphsConstantsTable[], { seasonId: string }>({
      queryFn: async args => {
        const { data, error } = await supabase.from('fangraphs-constants').select().eq('season', args.seasonId);
        if (error) return { error };

        return { data };
      },
      providesTags: [SupabaseClientTag.FangraphsConstants],
    }),
    getFangraphProjections: builder.query<FangraphsPlayerProjectionEntity[], FangraphsPlayerProjectionsRequestBody>({
      queryFn: async args => {
        const body = args;
        const { data } = await supabase.functions.invoke<FangraphsPlayerProjectionEntity[]>('fangraphs-projections', {
          body,
        });

        if (!data) return { data: [] };
        return { data };
      },
      providesTags: [SupabaseClientTag.FangraphsProjections],
    }),
    getFangraphStats: builder.query<FangraphsPageOfPlayerStats | null, FangraphsPlayerStatsRequestBody>({
      queryFn: async args => {
        const body = args;
        const { data } = await supabase.functions.invoke<FangraphsPageOfPlayerStats>('fangraphs-stats', {
          body,
        });

        return { data };
      },
      providesTags: [SupabaseClientTag.FangraphsProjections],
    }),
    getProfile: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from('profile').select().single();
        if (error) return { error };

        return { data };
      },
    }),
    getProfileWithTeams: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile')
          .select(
            'id,user_name,first_name,last_name,bio,teams:profile_to_fantasy_team(team(*)),leagues:profile_to_fantasy_league(league(*))'
          )
          .single();
        if (error) return { error };

        return { data };
      },
    }),
  }),
});

export const {
  useCreateLeagueProgressionEntityMutation,
  useGetLeagueProgressionQuery,
  useGetFangraphProjectionsQuery,
  useGetFangraphStatsQuery,
  useGetFangraphsConstantsBySeasonQuery,
  useCreateEspnPlayerMutation,
  useGetProfileQuery,
  useGetProfileWithTeamsQuery,
} = supabaseClient;
