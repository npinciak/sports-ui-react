import { User } from '@supabase/supabase-js';

function AuthenticationServiceBase() {
  return class AuthenticationServiceBaseClass {
    static readonly LOCAL_STORAGE_KEY_AUTH_TOKEN = `sb-${import.meta.env.VITE_SUPABASE_PROJECT_ID}-auth-token`;

    static get hasValidAuthToken(): boolean {
      return !!AuthenticationServiceBaseClass.authTokenParsed;
    }

    static get authTokenParsed(): {
      access_token: string;
      token_type: string;
      expires_in: number;
      expires_at: number;
      refresh_token: string;
      user: User;
    } | null {
      return AuthenticationServiceBaseClass.authToken ? JSON.parse(AuthenticationServiceBaseClass.authToken) : null;
    }

    private static get authToken(): string | null {
      return localStorage.getItem(AuthenticationServiceBaseClass.LOCAL_STORAGE_KEY_AUTH_TOKEN);
    }
  };
}

export class AuthenticationService extends AuthenticationServiceBase() {}
