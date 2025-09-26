import { NextApiRequest, NextApiResponse } from 'next'

// Mock implementation for lead capture
// In production, this would integrate with your database/CRM
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      name,
      email,
      company,
      phone,
      message,
      interestedTrainingId,
      source = 'training_page'
    } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    // Generate promo code (mock implementation)
    const promoCode = generatePromoCode('LEAD')

    // Log to console for MVP (replace with database/CRM integration)
    console.log('📋 New Lead Submitted:')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Company:', company || 'N/A')
    console.log('Phone:', phone || 'N/A')
    console.log('Message:', message || 'N/A')
    console.log('Training ID:', interestedTrainingId || 'N/A')
    console.log('Source:', source)
    console.log('Generated Promo Code:', promoCode)
    console.log('---')

    // TODO: In production, integrate with:
    // 1. Database (Supabase) to store lead
    // 2. Email service (Resend) to send confirmation + promo code
    // 3. CRM integration (optional)

    // Mock response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your interest! Check your email for more information.',
      promoCode,
      lead: {
        id: `lead_${Date.now()}`,
        name,
        email,
        company,
        phone,
        message,
        interestedTrainingId,
        source,
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    return res.status(500).json({
      message: 'Failed to submit lead',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// Helper function to generate promo codes
function generatePromoCode(prefix: string = 'SAVE'): string {
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}${randomNum}`
}