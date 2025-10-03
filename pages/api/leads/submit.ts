import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { sendContactFormResponse, sendContactNotificationToAdmin } from '@/lib/email'

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
      trainingTitle,
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

    // Store lead in Supabase database using service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
      // Insert lead into database
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          company,
          phone,
          message,
          training_id: interestedTrainingId,
          source
        })
        .select()
        .single()

      if (leadError) {
        console.error('Error storing lead:', leadError)
        // Continue with promo code generation even if lead storage fails
      }

      // Store promo code in database (remove training_id as it doesn't exist in current schema)
      const { data: promoData, error: promoError } = await supabase
        .from('promo_codes')
        .insert({
          code: promoCode,
          discount_percent: 10, // 10% discount
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now, date only
          current_uses: 0
        })
        .select()
        .single()

      if (promoError) {
        console.error('Error storing promo code:', promoError)
      }

      // Log to console for debugging
      console.log('📋 New Lead Submitted:')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Company:', company || 'N/A')
      console.log('Phone:', phone || 'N/A')
      console.log('Message:', message || 'N/A')
      console.log('Training ID:', interestedTrainingId || 'N/A')
      console.log('Source:', source)
      console.log('Generated Promo Code:', promoCode)
      console.log('Lead ID:', leadData?.id || 'Failed to store')
      console.log('---')

    } catch (dbError) {
      console.error('Database error:', dbError)
      // Continue with the flow even if database fails
    }

    // Send contact form response email to user
    const emailResult = await sendContactFormResponse(email, name, message || '', promoCode, trainingTitle)
    if (!emailResult.success) {
      console.log('⚠️ Failed to send contact form response:', emailResult.error)
    }

    // Send notification to admin
    const adminEmailResult = await sendContactNotificationToAdmin(email, name, company, message || 'No message provided')
    if (!adminEmailResult.success) {
      console.log('⚠️ Failed to send admin notification:', adminEmailResult.error)
    }

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