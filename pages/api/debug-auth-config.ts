import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = createSupabaseClient()

    // Test auth settings by checking user creation
    const testResults = {
      supabaseConnection: false,
      authEnabled: false,
      emailConfirmationRequired: false,
      siteUrl: '',
      redirectUrls: [],
      emailProvider: 'unknown',
      lastSignupAttempt: null
    }

    // Test connection
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    testResults.supabaseConnection = !sessionError

    // Get current auth settings (this will only work with certain API calls)
    const { data: settings, error: settingsError } = await supabase.auth.admin.getSettings()

    if (!settingsError && settings) {
      testResults.authEnabled = true
      testResults.emailConfirmationRequired = settings.external_email_enabled || false
      testResults.siteUrl = settings.site_url || ''
    }

    // Try to get recent user to see if confirmation is working
    try {
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 5
      })

      if (users && users.users.length > 0) {
        const recentUser = users.users.find(u => u.email === 'debug.test@gmail.com')
        if (recentUser) {
          testResults.lastSignupAttempt = {
            email: recentUser.email,
            confirmed: recentUser.email_confirmed_at !== null,
            confirmedAt: recentUser.email_confirmed_at,
            createdAt: recentUser.created_at
          }
        }
      }
    } catch (error) {
      // Admin calls might fail with anon key, that's ok
    }

    return res.status(200).json({
      success: true,
      message: 'Auth configuration debug results',
      config: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
      },
      testResults,
      diagnostics: {
        signupWorking: true, // We know this works from previous test
        emailSendingInitiated: true, // confirmation_sent_at was present
        likelyIssues: [
          'Email not configured in Supabase dashboard',
          'Email going to spam folder',
          'Rate limiting on free tier (3 emails/hour)',
          'Site URL misconfigured',
          'Email confirmation disabled'
        ]
      },
      nextSteps: [
        '1. Check Supabase Dashboard > Authentication > Settings',
        '2. Verify Site URL is set to http://localhost:3000',
        '3. Check spam/junk folder for emails',
        '4. Enable email confirmation if disabled',
        '5. Check Authentication > Logs for errors'
      ]
    })

  } catch (error) {
    console.error('Auth config debug error:', error)
    return res.status(500).json({
      success: false,
      message: 'Debug failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}