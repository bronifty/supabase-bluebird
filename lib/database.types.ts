export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          raw_user_meta_data: Json | null
        }
        Insert: {
          id: string
          raw_user_meta_data?: Json | null
        }
        Update: {
          id?: string
          raw_user_meta_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tweets: {
        Row: {
          created_at: string
          id: number
          tweet: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          tweet?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          tweet?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tweets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
