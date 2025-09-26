import { NextApiRequest, NextApiResponse } from 'next'
import { stripe, isStripeConfigured } from '@/lib/stripe/server'
import { getTrainingById } from '@/lib/supabase-training'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if Stripe is configured
  if (!isStripeConfigured() || !stripe) {
    return res.status(500).json({
      message: 'Payment system not configured. Please add Stripe credentials to enable payments.',
      configured: false
    })
  }

  try {
    const { trainingId, promoCode, successUrl, cancelUrl } = req.body

    if (!trainingId) {
      return res.status(400).json({ message: 'Training ID is required' })
    }

    // Get training details
    const training = await getTrainingById(trainingId)
    if (!training) {
      return res.status(404).json({ message: 'Training not found' })
    }

    // Check if training is full
    const availableSpots = training.maxParticipants - training.currentParticipants
    if (availableSpots <= 0) {
      return res.status(400).json({ message: 'Training is full' })
    }

    let finalPrice = training.price
    let discountAmount = 0
    let appliedPromoCode = null

    // Validate promo code if provided
    if (promoCode) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      try {
        const { data: promoData, error } = await supabase
          .from('promo_codes')
          .select('*')
          .eq('code', promoCode.toUpperCase())
          .eq('is_active', true)
          .single()

        if (!error && promoData) {
          // Check if promo code has expired
          const currentDate = new Date()
          const validUntil = new Date(promoData.valid_until)

          if (currentDate <= validUntil) {
            // Check if promo code is for this training or general
            if (!promoData.training_id || promoData.training_id === trainingId) {
              // Apply discount
              const discountPercent = promoData.discount_percent
              discountAmount = Math.round((training.price * discountPercent) / 100)
              finalPrice = training.price - discountAmount
              appliedPromoCode = promoData
            }
          }
        }
      } catch (dbError) {
        console.error('Error validating promo code:', dbError)
        // Continue without discount if validation fails
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: training.currency.toLowerCase(),
            product_data: {
              name: appliedPromoCode
                ? `${training.title} (${appliedPromoCode.discount_percent}% discount applied)`
                : training.title,
              description: appliedPromoCode
                ? `${training.description} - Discount: ${appliedPromoCode.code}`
                : training.description,
              images: training.heroImageUrl ? [`${process.env.NEXT_PUBLIC_APP_URL}${training.heroImageUrl}`] : [],
            },
            unit_amount: Math.round(finalPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/trainings/${trainingId}`,
      metadata: {
        trainingId: training.id,
        trainingTitle: training.title,
        originalPrice: training.price.toString(),
        finalPrice: finalPrice.toString(),
        promoCode: appliedPromoCode ? appliedPromoCode.code : '',
        discountPercent: appliedPromoCode ? appliedPromoCode.discount_percent.toString() : '0',
      },
    })

    res.status(200).json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({
      message: 'Error creating checkout session',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}