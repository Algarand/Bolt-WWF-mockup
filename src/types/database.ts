export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
          category: string | null;
          profile_picture: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          created_at?: string;
          category?: string | null;
          profile_picture?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
          category?: string | null;
          profile_picture?: string | null;
        };
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          duration: number;
          calories: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          duration: number;
          calories: number;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          duration?: number;
          calories?: number;
          date?: string;
          created_at?: string;
        };
      };
      survey_responses: {
        Row: {
          id: string;
          user_id: string;
          responses: Json;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          responses: Json;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          responses?: Json;
          category?: string;
          created_at?: string;
        };
      };
    };
  };
}

type Json = Record<string, unknown>;