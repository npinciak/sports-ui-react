export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      espn_mlb_player: {
        Row: {
          espn_id: number;
          espn_position_id: number | null;
          fangraphs_id: number;
          id: number;
          name: string;
          sportsUid: string;
          team: string;
        };
        Insert: {
          espn_id: number;
          espn_position_id?: number | null;
          fangraphs_id: number;
          id?: number;
          name: string;
          sportsUid: string;
          team: string;
        };
        Update: {
          espn_id?: number;
          espn_position_id?: number | null;
          fangraphs_id?: number;
          id?: number;
          name?: string;
          sportsUid?: string;
          team?: string;
        };
        Relationships: [];
      };
      espn_player_to_fantasy_team: {
        Row: {
          espn_player_id: number;
          fantasy_team_id: number;
          id: number;
        };
        Insert: {
          espn_player_id: number;
          fantasy_team_id: number;
          id?: number;
        };
        Update: {
          espn_player_id?: number;
          fantasy_team_id?: number;
          id?: number;
        };
        Relationships: [];
      };
      'fangraphs-constants': {
        Row: {
          cFIP: number;
          id: number;
          'R/PA': number;
          'R/W': number;
          runCS: number;
          runSB: number;
          season: number;
          w1B: number;
          w2B: number;
          w3B: number;
          wBB: number;
          wHBP: number;
          wHR: number;
          wOBA: number;
          wOBAScale: number;
        };
        Insert: {
          cFIP: number;
          id?: number;
          'R/PA': number;
          'R/W': number;
          runCS: number;
          runSB: number;
          season: number;
          w1B: number;
          w2B: number;
          w3B: number;
          wBB: number;
          wHBP: number;
          wHR: number;
          wOBA: number;
          wOBAScale: number;
        };
        Update: {
          cFIP?: number;
          id?: number;
          'R/PA'?: number;
          'R/W'?: number;
          runCS?: number;
          runSB?: number;
          season?: number;
          w1B?: number;
          w2B?: number;
          w3B?: number;
          wBB?: number;
          wHBP?: number;
          wHR?: number;
          wOBA?: number;
          wOBAScale?: number;
        };
        Relationships: [];
      };
      league: {
        Row: {
          created_at: string;
          id: number;
          league_id: string;
          name: string | null;
          season: number;
          sport: Database['public']['Enums']['Fantasy League Sport'];
        };
        Insert: {
          created_at?: string;
          id?: number;
          league_id: string;
          name?: string | null;
          season: number;
          sport?: Database['public']['Enums']['Fantasy League Sport'];
        };
        Update: {
          created_at?: string;
          id?: number;
          league_id?: string;
          name?: string | null;
          season?: number;
          sport?: Database['public']['Enums']['Fantasy League Sport'];
        };
        Relationships: [];
      };
      league_to_team_map: {
        Row: {
          created_at: string;
          id: number;
          league_id: string;
          league_team_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          league_id: string;
          league_team_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          league_id?: string;
          league_team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_league_to_team_map_league_id_fkey';
            columns: ['league_id'];
            isOneToOne: false;
            referencedRelation: 'league';
            referencedColumns: ['league_id'];
          },
          {
            foreignKeyName: 'public_league_to_team_map_league_team_id_fkey';
            columns: ['league_team_id'];
            isOneToOne: false;
            referencedRelation: 'team';
            referencedColumns: ['league_team_id'];
          },
        ];
      };
      'league-owner': {
        Row: {
          created_at: string;
          id: number;
          league_id: string;
          owner_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          league_id: string;
          owner_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          league_id?: string;
          owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_league-owner_league_id_fkey';
            columns: ['league_id'];
            isOneToOne: false;
            referencedRelation: 'league';
            referencedColumns: ['league_id'];
          },
        ];
      };
      'league-progression': {
        Row: {
          created_at: string;
          date: string;
          espn_team_id: number;
          id: number;
          league_id: string;
          league_team_id: string;
          rank: number | null;
          total_points: number | null;
        };
        Insert: {
          created_at?: string;
          date?: string;
          espn_team_id: number;
          id?: number;
          league_id: string;
          league_team_id: string;
          rank?: number | null;
          total_points?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          espn_team_id?: number;
          id?: number;
          league_id?: string;
          league_team_id?: string;
          rank?: number | null;
          total_points?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_league-progression_league_id_fkey';
            columns: ['league_id'];
            isOneToOne: false;
            referencedRelation: 'league';
            referencedColumns: ['league_id'];
          },
          {
            foreignKeyName: 'public_league-progression_league_team_id_fkey';
            columns: ['league_team_id'];
            isOneToOne: false;
            referencedRelation: 'team';
            referencedColumns: ['league_team_id'];
          },
        ];
      };
      Leagues: {
        Row: {
          created_at: string | null;
          expired: boolean;
          id: number;
          leagueId: string | null;
          name: string | null;
          ownerId: string;
          season: string | null;
          sport: string | null;
        };
        Insert: {
          created_at?: string | null;
          expired?: boolean;
          id?: number;
          leagueId?: string | null;
          name?: string | null;
          ownerId: string;
          season?: string | null;
          sport?: string | null;
        };
        Update: {
          created_at?: string | null;
          expired?: boolean;
          id?: number;
          leagueId?: string | null;
          name?: string | null;
          ownerId?: string;
          season?: string | null;
          sport?: string | null;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          bio: string | null;
          created_at: string;
          first_name: string | null;
          id: number;
          last_name: string | null;
          user_name: string;
          uuid: string;
        };
        Insert: {
          bio?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          user_name?: string;
          uuid: string;
        };
        Update: {
          bio?: string | null;
          created_at?: string;
          first_name?: string | null;
          id?: number;
          last_name?: string | null;
          user_name?: string;
          uuid?: string;
        };
        Relationships: [];
      };
      profile_to_fantasy_league: {
        Row: {
          created_at: string;
          fantasy_league_id: number;
          id: number;
          uuid: string;
        };
        Insert: {
          created_at?: string;
          fantasy_league_id: number;
          id?: number;
          uuid?: string;
        };
        Update: {
          created_at?: string;
          fantasy_league_id?: number;
          id?: number;
          uuid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_user_to_fantasy_league_fantasy_league_id_fkey';
            columns: ['fantasy_league_id'];
            isOneToOne: false;
            referencedRelation: 'league';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_user_to_fantasy_league_uuid_fkey';
            columns: ['uuid'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['uuid'];
          },
        ];
      };
      profile_to_fantasy_team: {
        Row: {
          fantasy_team_id: number;
          id: number;
          profile_id: number;
        };
        Insert: {
          fantasy_team_id: number;
          id?: number;
          profile_id: number;
        };
        Update: {
          fantasy_team_id?: number;
          id?: number;
          profile_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'profile_to_fantasy_team_fantasy_team_id_fkey';
            columns: ['fantasy_team_id'];
            isOneToOne: false;
            referencedRelation: 'team';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profile_to_fantasy_team_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profile';
            referencedColumns: ['id'];
          },
        ];
      };
      team: {
        Row: {
          created_at: string;
          espn_team_id: number;
          id: number;
          league_team_id: string;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          espn_team_id: number;
          id?: number;
          league_team_id?: string;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          espn_team_id?: number;
          id?: number;
          league_team_id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      'team-owner': {
        Row: {
          created_at: string;
          id: number;
          league_team_id: string;
          owner_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          league_team_id: string;
          owner_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          league_team_id?: string;
          owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_team-owner_league_team_id_fkey';
            columns: ['league_team_id'];
            isOneToOne: false;
            referencedRelation: 'team';
            referencedColumns: ['league_team_id'];
          },
        ];
      };
      Teams__DEPRECATED: {
        Row: {
          created_at: string | null;
          espnId: string | null;
          id: number;
          isFavorite: boolean | null;
          leagueId: string | null;
          name: string | null;
          ownerId: string;
        };
        Insert: {
          created_at?: string | null;
          espnId?: string | null;
          id?: number;
          isFavorite?: boolean | null;
          leagueId?: string | null;
          name?: string | null;
          ownerId: string;
        };
        Update: {
          created_at?: string | null;
          espnId?: string | null;
          id?: number;
          isFavorite?: boolean | null;
          leagueId?: string | null;
          name?: string | null;
          ownerId?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      'Fantasy League Sport': 'baseball' | 'football';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
