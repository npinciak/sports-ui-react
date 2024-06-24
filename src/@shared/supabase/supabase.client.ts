import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-database.model';
import { SupaClientEspnPlayerInsert, SupaClientLeagueProgressionInsert, SupaClientProfile } from './supabase-tables.model';

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const SupabaseClientTag = {
  GetLeagueProgression: 'GetLeagueProgression',
  EspnPlayer: 'EspnPlayer',
} as const;

const SupabaseClientTagList = [SupabaseClientTag.GetLeagueProgression, SupabaseClientTag.EspnPlayer];

export const supabaseClient = createApi({
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
    createEspnPlayer: builder.mutation<null, SupaClientEspnPlayerInsert[]>({
      queryFn: async player => {
        const { data } = await supabase.from('espn_mlb_player').insert(player);

        return { data };
      },
    }),
    getProfile: builder.query<SupaClientProfile | null, void>({
      queryFn: async () => {
        const { data } = await supabase.from('profile').select().single();

        return { data };
      },
    }),
    getProfileWithTeams: builder.query({
      queryFn: async () => {
        const { data } = await supabase
          .from('profile')
          .select(
            'id,user_name,first_name,last_name,bio,teams:profile_to_fantasy_team(team(*)),leagues:profile_to_fantasy_league(league(*))'
          )
          .single();

        return { data };
      },
    }),
  }),
});

export const {
  useCreateLeagueProgressionEntityMutation,
  useGetLeagueProgressionQuery,
  useCreateEspnPlayerMutation,
  useGetProfileQuery,
  useGetProfileWithTeamsQuery,
} = supabaseClient;
