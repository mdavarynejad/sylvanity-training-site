import { NextApiRequest, NextApiResponse } from 'next'
import { stripe, isStripeConfigured } from '@/lib/stripe/server'
import { getTrainingById } from '@/lib/supabase-training'

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
    const { trainingId, successUrl, cancelUrl } = req.body

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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: training.currency.toLowerCase(),
            product_data: {
              name: training.title,
              description: training.description,
              images: training.heroImageUrl ? [`${process.env.NEXT_PUBLIC_APP_URL}${training.heroImageUrl}`] : [],
            },
            unit_amount: training.price * 100, // Convert to cents
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