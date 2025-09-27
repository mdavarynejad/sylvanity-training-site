import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify the user's token
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const userId = user.id

    // Delete related data first (bookings)
    const { error: bookingsError } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('user_id', userId)

    if (bookingsError) {
      console.error('Error deleting bookings:', bookingsError)
      return res.status(500).json({ error: 'Failed to delete user data' })
    }

    // Delete profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', userId)

    if (profileError) {
      console.error('Error deleting profile:', profileError)
      return res.status(500).json({ error: 'Failed to delete profile' })
    }

    // Delete the auth user (this should be done last)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (deleteError) {
      console.error('Error deleting user:', deleteError)
      return res.status(500).json({ error: 'Failed to delete account' })
    }

    return res.status(200).json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Account deletion error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}