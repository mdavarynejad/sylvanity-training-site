import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { code, trainingId } = req.body

    if (!code) {
      return res.status(400).json({
        valid: false,
        message: 'Promo code is required'
      })
    }

    // Connect to Supabase using service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
      // Log the validation attempt
      console.log('🎟️ Promo Code Validation Attempt:')
      console.log('Code:', code.toUpperCase())
      console.log('Training ID:', trainingId)
      console.log('---')

      // Query promo codes table
      const { data: promoCode, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single()

      console.log('Database query result:')
      console.log('Error:', error)
      console.log('PromoCode data:', promoCode)
      console.log('---')

      if (error || !promoCode) {
        console.log('❌ Promo code not found or error occurred')
        return res.status(200).json({
          valid: false,
          message: 'Invalid or expired promo code'
        })
      }

      // Check if promo code has expired
      const currentDate = new Date()
      const validUntil = new Date(promoCode.valid_until)

      if (currentDate > validUntil) {
        return res.status(200).json({
          valid: false,
          message: 'This promo code has expired'
        })
      }

      // Training-specific validation removed as current schema doesn't support training_id

      // Promo code is valid - log usage
      console.log('✅ Promo code validation successful!')
      console.log('Discount:', promoCode.discount_percent + '%')

      // Track promo code usage (increment usage count)
      await supabase
        .from('promo_codes')
        .update({
          current_uses: (promoCode.current_uses || 0) + 1
        })
        .eq('id', promoCode.id)

      console.log('📊 Promo code usage tracked')

      return res.status(200).json({
        valid: true,
        discount_percent: promoCode.discount_percent,
        code: promoCode.code,
        message: `${promoCode.discount_percent}% discount applied!`
      })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return res.status(200).json({
        valid: false,
        message: 'Error validating promo code'
      })
    }

  } catch (error) {
    console.error('Promo code validation error:', error)
    return res.status(500).json({
      valid: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}