import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password, fullName, company } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const supabase = createSupabaseClient()

    // Test signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${req.headers.origin}/auth/callback`,
        data: {
          full_name: fullName || '',
          company: company || ''
        }
      }
    })

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
        details: error
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User signup initiated',
      data: {
        user: data.user,
        session: data.session,
        emailSent: !!data.user && !data.session,
        needsEmailConfirmation: !!data.user && !data.session,
        redirectUrl: `${req.headers.origin}/auth/callback`
      }
    })

  } catch (error) {
    console.error('Signup test error:', error)
    return res.status(500).json({
      success: false,
      message: 'Signup test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}