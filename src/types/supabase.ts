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
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          updated_at?: string
        }
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          subject: string
          level: string
          score: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          level: string
          score: number
          completed: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          score?: number
          completed?: boolean
          updated_at?: string
        }
      }
      stored_poems: {
        Row: {
          id: string
          subject: string
          level: string
          content: string
          explanations: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subject: string
          level: string
          content: string
          explanations: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          content?: string
          explanations?: string[]
          updated_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          poem_id: string
          score: number
          answers: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          poem_id: string
          score: number
          answers: Json
          created_at?: string
        }
        Update: {
          score?: number
          answers?: Json
        }
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
  }
}