import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-database.model';
import { SupaClientFangraphsConstantsTable } from './supabase-tables.model';

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const supabaseClient = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getLeagueProgression: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from('league-progression').select();
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
    }),
  }),
});

export const { useGetLeagueProgressionQuery, useGetFangraphsConstantsBySeasonQuery } = supabaseClient;
