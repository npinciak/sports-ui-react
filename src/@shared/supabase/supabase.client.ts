import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-database.model';
import { SupaClientLeagueProgressionInsert, SupaClientProfile } from './supabase-tables.model';

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const SupabaseClientTag = {
  GetLeagueProgression: 'GetLeagueProgression',
  EspnPlayer: 'EspnPlayer',
} as const;

const SupabaseClientTagList = [SupabaseClientTag.GetLeagueProgression, SupabaseClientTag.EspnPlayer];

export const SupabaseClient = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: SupabaseClientTagList,
  endpoints: builder => ({
    getLeagueProgression: builder.query({
      queryFn: async () => {
        const { data } = await supabase.from('league-progression').select().order('date', { ascending: false });

        return { data };
      },
      providesTags: [SupabaseClientTag.GetLeagueProgression],
    }),
    createLeagueProgressionEntity: builder.mutation<null, SupaClientLeagueProgressionInsert>({
      queryFn: async args => {
        const { data } = await supabase.from('league-progression').insert({ ...args });

        return { data };
      },
      invalidatesTags: [SupabaseClientTag.GetLeagueProgression],
    }),
    getProfile: builder.query<SupaClientProfile | null, void>({
      queryFn: async () => {
        const { data } = await supabase.from('profile').select().single();

        return { data };
      },
    }),
    getProfileTeams: builder.query<
      | {
          espn_team_id: number | null;
          id: number | null;
          league_id: string | null;
          league_name: string | null;
          league_season: number | null;
          name: string | null;
          sport: Database['public']['Enums']['Fantasy League Sport'] | null;
          user_name: string | null;
          uuid: string | null;
        }[]
      | null,
      void
    >({
      queryFn: async () => {
        const { data } = await supabase.from('profile_with_teams').select();

        return { data };
      },
    }),
    getProfileLeagues: builder.query<
      | {
          id: number | null;
          league_id: string | null;
          league_name: string | null;
          league_season: number | null;
          sport: Database['public']['Enums']['Fantasy League Sport'] | null;
          user_name: string | null;
          uuid: string | null;
        }[]
      | null,
      void
    >({
      queryFn: async () => {
        const { data } = await supabase.from('profile_with_leagues').select();

        return { data };
      },
    }),
  }),
});
