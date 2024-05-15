import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createClient } from '@supabase/supabase-js';
import { FangraphsProjPlayer } from '../fangraphs/models';
import { FangraphTeam } from '../fangraphs/models/teams.model';
import { Database } from './supabase-database.model';
import { SupaClientEspnPlayerInsert, SupaClientFangraphsConstantsTable, SupaClientLeagueProgressionInsert } from './supabase-tables.model';

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const SupabaseClientTag = {
  GetLeagueProgression: 'GetLeagueProgression',
  FangraphsProjections: 'FangraphsProjections',
  FangraphsConstants: 'FangraphsConstants',
  EspnPlayer: 'EspnPlayer',
};

const SupabaseClientTagList = [
  SupabaseClientTag.GetLeagueProgression,
  SupabaseClientTag.FangraphsProjections,
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
    getFangraphProjections: builder.query<FangraphsProjPlayer[], object>({
      queryFn: async () => {
        const { data } = await supabase.functions.invoke<FangraphsProjPlayer[]>('fangraphs-projections', {
          body: { type: 'thebatx', team: FangraphTeam.AllTeams, pos: 'all' },
        });

        if (!data) return { data: [] };
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
    getProfileWithTeams: builder.query<
      | {
          id: number;
          user_name: string | null;
          first_name: string | null;
          last_name: string | null;
          bio: string | null;
          teams: {
            team: {
              created_at: string;
              espn_team_id: number;
              id: number;
              league_team_id: string;
              name: string | null;
            } | null;
          }[];
          leagues: {
            league: {
              id: number;
              name: string | null;
              season: string;
              sport: string;
              league_id: string;
            } | null;
          }[];
        }
      | undefined,
      object
    >({
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
  useGetFangraphsConstantsBySeasonQuery,
  useCreateEspnPlayerMutation,
  useGetProfileQuery,
  useGetProfileWithTeamsQuery,
} = supabaseClient;
