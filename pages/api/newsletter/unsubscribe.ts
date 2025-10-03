import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { sendUnsubscribeConfirmation } from '@/lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    // Unsubscribe from newsletter in Supabase database using service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
      // Check if email exists
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('id, unsubscribed_at, name')
        .eq('email', email)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing subscriber:', checkError)
        throw new Error('Failed to check subscription status')
      }

      if (!existingSubscriber) {
        return res.status(404).json({
          success: false,
          message: 'Email address not found in our subscriber list.'
        })
      }

      if (existingSubscriber.unsubscribed_at) {
        return res.status(200).json({
          success: true,
          message: 'You are already unsubscribed from our newsletter.'
        })
      }

      // Unsubscribe the user
      const { error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({
          unsubscribed_at: new Date().toISOString()
        })
        .eq('id', existingSubscriber.id)

      if (updateError) {
        console.error('Error unsubscribing:', updateError)
        throw new Error('Failed to unsubscribe')
      }

      console.log('📧 User unsubscribed:', email)

      // Send unsubscribe confirmation email
      const emailResult = await sendUnsubscribeConfirmation(email, existingSubscriber.name || undefined)
      console.log('📧 Unsubscribe confirmation email result:', emailResult)

      return res.status(200).json({
        success: true,
        message: 'You have been successfully unsubscribed from our newsletter.'
      })

    } catch (dbError: any) {
      console.error('Database error:', dbError)
      return res.status(500).json({
        success: false,
        message: 'Failed to unsubscribe. Please try again.',
        error: process.env.NODE_ENV === 'development' ? dbError.message : 'Database error'
      })
    }

  } catch (error: any) {
    console.error('Unsubscribe error:', error)
    return res.status(500).json({
      message: 'Failed to unsubscribe',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}
