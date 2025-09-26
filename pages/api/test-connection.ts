import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = createSupabaseClient()

    // Simple connection test - try to access auth users
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Supabase connection failed',
        error: error.message
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase connection successful! ✅',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      nextStep: 'Now run the database migration in Supabase SQL Editor'
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}