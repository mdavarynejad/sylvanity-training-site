import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { sendNewsletterConfirmation } from '@/lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      email,
      name,
      source = 'website'
    } = req.body

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    // Store newsletter subscription in Supabase database using service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
      // Check if email already exists
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('id, unsubscribed_at')
        .eq('email', email)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing subscriber:', checkError)
      }

      let subscriberData

      if (existingSubscriber) {
        // If subscriber exists but is unsubscribed, reactivate them
        if (existingSubscriber.unsubscribed_at) {
          const { data: updatedData, error: updateError } = await supabase
            .from('newsletter_subscribers')
            .update({
              unsubscribed_at: null,
              name: name || null,
              source,
              subscribed_at: new Date().toISOString()
            })
            .eq('id', existingSubscriber.id)
            .select()
            .single()

          if (updateError) {
            console.error('Error reactivating subscriber:', updateError)
            throw new Error('Failed to reactivate subscription')
          }
          subscriberData = updatedData
        } else {
          // Already active subscriber
          return res.status(200).json({
            success: true,
            message: 'You are already subscribed to our newsletter!',
            subscriber: {
              id: existingSubscriber.id,
              email,
              name,
              source,
              subscribedAt: new Date().toISOString(),
              confirmed: true
            }
          })
        }
      } else {
        // Create new subscriber
        const { data: newData, error: insertError } = await supabase
          .from('newsletter_subscribers')
          .insert({
            email,
            name: name || null,
            source,
            subscribed_at: new Date().toISOString()
          })
          .select()
          .single()

        if (insertError) {
          console.error('Error creating subscriber:', insertError)
          throw new Error('Failed to subscribe to newsletter')
        }
        subscriberData = newData
      }

      // Log to console for debugging
      console.log('📧 New Newsletter Subscription:')
      console.log('Email:', email)
      console.log('Name:', name || 'N/A')
      console.log('Source:', source)
      console.log('Subscriber ID:', subscriberData?.id || 'Failed to store')
      console.log('Subscribed at:', new Date().toISOString())
      console.log('---')

      // Send welcome email
      console.log('🔄 Attempting to send newsletter confirmation email to:', email)
      const emailResult = await sendNewsletterConfirmation(email, name)
      console.log('📧 Email send result:', emailResult)
      if (!emailResult.success) {
        console.log('⚠️ Failed to send welcome email:', emailResult.error)
      } else {
        console.log('✅ Newsletter confirmation email sent successfully to:', email)
      }

    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(500).json({
        success: false,
        message: 'Failed to subscribe to newsletter. Please try again.',
        error: process.env.NODE_ENV === 'development' ? dbError.message : 'Database error'
      })
    }

    // Mock response
    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter! Please check your email to confirm.',
      subscriber: {
        id: `sub_${Date.now()}`,
        email,
        name,
        source,
        subscribedAt: new Date().toISOString(),
        confirmed: false // Would be true after email confirmation
      }
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({
      message: 'Failed to subscribe to newsletter',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}