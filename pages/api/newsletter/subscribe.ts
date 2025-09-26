import { NextApiRequest, NextApiResponse } from 'next'

// Mock implementation for newsletter subscription
// In production, this would integrate with your email service provider
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

    // Log to console for MVP (replace with email service integration)
    console.log('📧 New Newsletter Subscription:')
    console.log('Email:', email)
    console.log('Name:', name || 'N/A')
    console.log('Source:', source)
    console.log('Subscribed at:', new Date().toISOString())
    console.log('---')

    // TODO: In production, integrate with:
    // 1. Database (Supabase) to store subscriber
    // 2. Email service (Resend, Mailchimp, ConvertKit) to add to newsletter list
    // 3. Send welcome email with confirmation link

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