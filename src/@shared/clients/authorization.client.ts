import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../supabase/supabase.client';

const AuthenticationClientTag = {
  User: 'User',
} as const;

export const AuthenticationClient = createApi({
  reducerPath: 'authenticationClient',
  baseQuery: fakeBaseQuery(),
  tagTypes: [AuthenticationClientTag.User],
  endpoints: builder => ({
    loginWithPassword: builder.query({
      queryFn: async ({ email, password }: { email: string | null; password: string | null }) => {
        if (!email || !password) return { error: 'Email and password are required' };

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        supabase.auth.resetPasswordForEmail;
        if (error) return { error };

        return { data };
      },
    }),
    logout: builder.query<null, void>({
      queryFn: async () => {
        await supabase.auth.signOut();
        return { data: null };
      },
    }),
    resetPassword: builder.query({
      queryFn: async ({ email }: { email: string | null }) => {
        if (!email) return { error: 'Email is required' };

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:5173/reset-password',
        });
        if (error) return { error };

        return { data };
      },
    }),
    getUser: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) return { error };

        return { data };
      },
      providesTags: [AuthenticationClientTag.User],
    }),
    updateUser: builder.mutation({
      queryFn: async ({ email, password }: Partial<{ email: string; password: string }>) => {
        const { data, error } = await supabase.auth.updateUser({
          email,
          password,
        });

        if (error) return { error };

        return { data };
      },
    }),
    createAccount: builder.mutation({
      queryFn: async ({ email, password }: { email: string | null; password: string | null }) => {
        if (!email || !password) return { error: 'Email and password are required' };

        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error };

        return { data };
      },
    }),
  }),
});

export const {
  useLogoutQuery,
  useLazyLogoutQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useCreateAccountMutation,
  useUpdateUserMutation,
  useLazyLoginWithPasswordQuery,
  useLoginWithPasswordQuery,
  useLazyResetPasswordQuery,
} = AuthenticationClient;
