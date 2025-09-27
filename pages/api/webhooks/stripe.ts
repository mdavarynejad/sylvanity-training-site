import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe/server'
import { sendTrainingConfirmation } from '@/lib/email'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: any

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret!)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    console.log('💳 Payment completed for session:', session.id)

    try {
      // Get training details from session metadata
      const trainingId = session.metadata?.trainingId
      const trainingTitle = session.metadata?.trainingTitle

      if (!trainingId || !trainingTitle) {
        console.error('Missing training metadata in session')
        return res.status(200).json({ received: true })
      }

      // Get customer details
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name

      if (!customerEmail || !customerName) {
        console.error('Missing customer details in session')
        return res.status(200).json({ received: true })
      }

      // Extract payment details
      const amountTotal = session.amount_total / 100 // Convert from cents
      const currency = session.currency.toUpperCase()

      // Store booking in database
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          training_id: trainingId,
          customer_email: customerEmail,
          customer_name: customerName,
          payment_session_id: session.id,
          payment_status: 'paid',
          amount_paid: amountTotal,
          currency: currency,
          booking_status: 'confirmed'
        })

      if (bookingError) {
        console.error('Error storing booking:', bookingError)
      }

      // Send confirmation email
      const emailResult = await sendTrainingConfirmation(
        customerEmail,
        customerName,
        trainingTitle,
        amountTotal,
        currency,
        session.id
      )

      if (emailResult.success) {
        console.log('✅ Training confirmation email sent successfully')
      } else {
        console.log('⚠️ Failed to send training confirmation email:', emailResult.error)
      }

      console.log(`📧 Training confirmation processed for ${customerEmail}`)

    } catch (error) {
      console.error('Error processing webhook:', error)
      return res.status(500).json({ error: 'Webhook processing failed' })
    }
  }

  res.status(200).json({ received: true })
}

// Disable body parsing for Stripe webhooks
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}