export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      espn_mlb_player: {
        Row: {
          espn_id: number
          espn_position_id: number | null
          fangraphs_id: number
          id: number
          name: string
          sportsUid: string
          team: string
        }
        Insert: {
          espn_id: number
          espn_position_id?: number | null
          fangraphs_id: number
          id?: number
          name: string
          sportsUid: string
          team: string
        }
        Update: {
          espn_id?: number
          espn_position_id?: number | null
          fangraphs_id?: number
          id?: number
          name?: string
          sportsUid?: string
          team?: string
        }
        Relationships: []
      }
      espn_player_to_fantasy_team: {
        Row: {
          espn_player_id: number
          fantasy_team_id: number
          id: number
        }
        Insert: {
          espn_player_id: number
          fantasy_team_id: number
          id?: number
        }
        Update: {
          espn_player_id?: number
          fantasy_team_id?: number
          id?: number
        }
        Relationships: []
      }
      league: {
        Row: {
          created_at: string
          id: number
          league_id: string
          name: string | null
          season: number
          sport: Database["public"]["Enums"]["Fantasy League Sport"]
        }
        Insert: {
          created_at?: string
          id?: number
          league_id: string
          name?: string | null
          season: number
          sport?: Database["public"]["Enums"]["Fantasy League Sport"]
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: string
          name?: string | null
          season?: number
          sport?: Database["public"]["Enums"]["Fantasy League Sport"]
        }
        Relationships: []
      }
      league_to_team_map: {
        Row: {
          created_at: string
          espn_league_id: string
          id: number
          team_id: number
        }
        Insert: {
          created_at?: string
          espn_league_id: string
          id?: number
          team_id: number
        }
        Update: {
          created_at?: string
          espn_league_id?: string
          id?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "league_to_team_map_espn_league_id_fkey"
            columns: ["espn_league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "league_to_team_map_espn_league_id_fkey"
            columns: ["espn_league_id"]
            isOneToOne: false
            referencedRelation: "profile_with_leagues"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "league_to_team_map_espn_league_id_fkey"
            columns: ["espn_league_id"]
            isOneToOne: false
            referencedRelation: "profile_with_teams"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "league_to_team_map_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
        ]
      }
      "league-owner": {
        Row: {
          created_at: string
          id: number
          league_id: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          league_id: string
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_league-owner_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "public_league-owner_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "profile_with_leagues"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "public_league-owner_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "profile_with_teams"
            referencedColumns: ["league_id"]
          },
        ]
      }
      "league-progression": {
        Row: {
          created_at: string
          date: string
          espn_league_id: string
          espn_team_id: number
          id: number
          rank: number | null
          total_points: number | null
        }
        Insert: {
          created_at?: string
          date?: string
          espn_league_id: string
          espn_team_id: number
          id?: number
          rank?: number | null
          total_points?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          espn_league_id?: string
          espn_team_id?: number
          id?: number
          rank?: number | null
          total_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "league-progression_espn_league_id_fkey"
            columns: ["espn_league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "league-progression_espn_league_id_fkey"
            columns: ["espn_league_id"]
            isOneToOne: false
            referencedRelation: "profile_with_leagues"
            referencedColumns: ["league_id"]
          },
          {
            foreignKeyName: "league-progression_espn_league_id_fkey"
            columns: ["espn_league_id"]
            isOneToOne: false
            referencedRelation: "profile_with_teams"
            referencedColumns: ["league_id"]
          },
        ]
      }
      Leagues: {
        Row: {
          created_at: string | null
          expired: boolean
          id: number
          leagueId: string | null
          name: string | null
          ownerId: string
          season: string | null
          sport: string | null
        }
        Insert: {
          created_at?: string | null
          expired?: boolean
          id?: number
          leagueId?: string | null
          name?: string | null
          ownerId: string
          season?: string | null
          sport?: string | null
        }
        Update: {
          created_at?: string | null
          expired?: boolean
          id?: number
          leagueId?: string | null
          name?: string | null
          ownerId?: string
          season?: string | null
          sport?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          bio: string | null
          created_at: string
          first_name: string | null
          id: number
          last_name: string | null
          user_name: string
          uuid: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          user_name?: string
          uuid: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          user_name?: string
          uuid?: string
        }
        Relationships: []
      }
      profile_to_fantasy_league: {
        Row: {
          created_at: string
          fantasy_league_id: number
          id: number
          profile_id: number
        }
        Insert: {
          created_at?: string
          fantasy_league_id: number
          id?: number
          profile_id: number
        }
        Update: {
          created_at?: string
          fantasy_league_id?: number
          id?: number
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_to_fantasy_league_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_to_fantasy_league_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_with_leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_to_fantasy_league_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_with_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_to_fantasy_league_fantasy_league_id_fkey"
            columns: ["fantasy_league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_to_fantasy_team: {
        Row: {
          fantasy_team_id: number
          id: number
          profile_id: number
        }
        Insert: {
          fantasy_team_id: number
          id?: number
          profile_id: number
        }
        Update: {
          fantasy_team_id?: number
          id?: number
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_to_fantasy_team_fantasy_team_id_fkey"
            columns: ["fantasy_team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_to_fantasy_team_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_to_fantasy_team_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_with_leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_to_fantasy_team_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile_with_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          active: boolean
          created_at: string
          espn_league_id: string
          espn_team_id: number
          id: number
          league_team_id: string
          name: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          espn_league_id: string
          espn_team_id: number
          id?: number
          league_team_id?: string
          name?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          espn_league_id?: string
          espn_team_id?: number
          id?: number
          league_team_id?: string
          name?: string | null
        }
        Relationships: []
      }
      "team-owner": {
        Row: {
          created_at: string
          id: number
          league_team_id: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          league_team_id: string
          owner_id: string
        }
        Update: {
          created_at?: string
          id?: number
          league_team_id?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_team-owner_league_team_id_fkey"
            columns: ["league_team_id"]
            isOneToOne: false
            referencedRelation: "team"
            referencedColumns: ["league_team_id"]
          },
        ]
      }
    }
    Views: {
      profile_with_leagues: {
        Row: {
          id: number | null
          league_id: string | null
          league_name: string | null
          league_season: number | null
          sport: Database["public"]["Enums"]["Fantasy League Sport"] | null
          user_name: string | null
          uuid: string | null
        }
        Relationships: []
      }
      profile_with_teams: {
        Row: {
          espn_team_id: number | null
          id: number | null
          league_id: string | null
          league_name: string | null
          league_season: number | null
          name: string | null
          sport: Database["public"]["Enums"]["Fantasy League Sport"] | null
          user_name: string | null
          uuid: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      "Fantasy League Sport": "baseball" | "football"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "Fantasy League Sport": ["baseball", "football"],
    },
  },
} as const
