import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if we have real credentials
export const supabase = !supabaseUrl || supabaseUrl.includes('your_supabase') || !supabaseAnonKey
  ? null
  : createClient(supabaseUrl, supabaseAnonKey)

// Helper function to create a new client instance
export function createSupabaseClient() {
  if (!supabaseUrl || supabaseUrl.includes('your_supabase') || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials')
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

export type Database = {
  public: {
    Tables: {
      trainings: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string
          price: number
          currency: string
          duration: string
          start_date: string
          end_date: string
          max_participants: number
          current_participants: number
          instructor: string
          level: 'Beginner' | 'Intermediate' | 'Advanced'
          category: string
          tags: string[]
          featured: boolean
          image_url?: string
          prerequisites?: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          long_description: string
          price: number
          currency?: string
          duration: string
          start_date: string
          end_date: string
          max_participants: number
          current_participants?: number
          instructor: string
          level: 'Beginner' | 'Intermediate' | 'Advanced'
          category: string
          tags: string[]
          featured?: boolean
          image_url?: string
          prerequisites?: string[]
        }
        Update: {
          id?: string
          title?: string
          description?: string
          long_description?: string
          price?: number
          currency?: string
          duration?: string
          start_date?: string
          end_date?: string
          max_participants?: number
          current_participants?: number
          instructor?: string
          level?: 'Beginner' | 'Intermediate' | 'Advanced'
          category?: string
          tags?: string[]
          featured?: boolean
          image_url?: string
          prerequisites?: string[]
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          training_id: string
          status: 'pending' | 'confirmed' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'failed'
          stripe_payment_intent_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          training_id: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'failed'
          stripe_payment_intent_id?: string
        }
        Update: {
          id?: string
          user_id?: string
          training_id?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'failed'
          stripe_payment_intent_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name?: string
          company?: string
          phone?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string
          company?: string
          phone?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          company?: string
          phone?: string
        }
      }
    }
  }
}