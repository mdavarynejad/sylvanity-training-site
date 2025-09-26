import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = createSupabaseClient()

    // Test 1: Check if we can connect
    const { data: connection, error: connectionError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (connectionError) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed',
        error: connectionError.message
      })
    }

    // Test 2: Check if tables exist
    const tables = []

    // Check trainings table
    const { data: trainings, error: trainingsError } = await supabase
      .from('trainings')
      .select('count')
      .limit(1)

    tables.push({
      name: 'trainings',
      exists: !trainingsError,
      error: trainingsError?.message
    })

    // Check newsletter_subscribers table
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('count')
      .limit(1)

    tables.push({
      name: 'newsletter_subscribers',
      exists: !subscribersError,
      error: subscribersError?.message
    })

    // Check leads table
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('count')
      .limit(1)

    tables.push({
      name: 'leads',
      exists: !leadsError,
      error: leadsError?.message
    })

    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      tables
    })

  } catch (error) {
    console.error('Database test error:', error)
    return res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}