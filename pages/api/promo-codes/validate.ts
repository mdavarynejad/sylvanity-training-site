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
      // Query promo codes table
      const { data: promoCode, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single()

      if (error || !promoCode) {
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

      // Check if promo code is for a specific training
      if (promoCode.training_id && promoCode.training_id !== trainingId) {
        return res.status(200).json({
          valid: false,
          message: 'This promo code is not valid for this training'
        })
      }

      // Promo code is valid
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