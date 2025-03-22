import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@shared//supabase';
import { Session, User, WeakPassword } from '@supabase/supabase-js';

const AuthenticationClientTag = {
  User: 'User',
} as const;

export const AuthenticationClient = createApi({
  reducerPath: 'authenticationClient',
  baseQuery: fakeBaseQuery(),
  tagTypes: [AuthenticationClientTag.User],
  endpoints: builder => ({
    loginWithPassword: builder.query<
      | {
          user: User;
          session: Session;
          weakPassword?: WeakPassword | undefined;
        }
      | {
          user: null;
          session: null;
          weakPassword?: null | undefined;
        },
      { email: string | null; password: string | null }
    >({
      queryFn: async args => {
        const { email, password } = args;

        if (!email || !password) throw Error('Email and password are required');

        const { data } = await supabase.auth.signInWithPassword({ email, password });

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
        if (!email) throw Error('Email is required');

        const { data } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.hostname}/reset-password`,
        });

        return { data };
      },
    }),
    getUser: builder.query<{ user: User } | { user: null }, void>({
      queryFn: async () => {
        const { data } = await supabase.auth.getUser();

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
        if (!email || !password) throw Error('Email and password are required');

        const { data } = await supabase.auth.signUp({ email, password });

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
