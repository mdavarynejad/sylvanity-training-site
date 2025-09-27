import Stripe from 'stripe'

// For development, use test key or skip if not configured
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_TEST

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
}) : null

export const isStripeConfigured = () => Boolean(stripeSecretKey)