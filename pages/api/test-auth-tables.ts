import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = createSupabaseClient()

    // Test auth-related tables
    const tables = []

    // Check profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    tables.push({
      name: 'profiles',
      exists: !profilesError,
      error: profilesError?.message
    })

    // Check bookings table
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('count')
      .limit(1)

    tables.push({
      name: 'bookings',
      exists: !bookingsError,
      error: bookingsError?.message
    })

    // Check if we can access auth users (this requires service role)
    const serviceSupabase = createSupabaseClient()

    return res.status(200).json({
      success: true,
      message: 'Auth tables check completed',
      tables,
      note: 'If tables don\'t exist, you need to run database migrations in Supabase'
    })

  } catch (error) {
    console.error('Auth tables test error:', error)
    return res.status(500).json({
      success: false,
      message: 'Auth tables test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}