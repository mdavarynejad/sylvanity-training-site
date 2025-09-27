import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Connect to Supabase using service role
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Create test promo codes
    const testPromoCodes = [
      {
        code: 'TEST10',
        discount_percent: 10,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days, date only
        current_uses: 0
      },
      {
        code: 'WELCOME20',
        discount_percent: 20,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days, date only
        current_uses: 0
      },
      {
        code: 'SAVE15',
        discount_percent: 15,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days, date only
        current_uses: 0
      }
    ]

    const { data, error } = await supabase
      .from('promo_codes')
      .upsert(testPromoCodes)
      .select()

    if (error) {
      console.error('Error creating test promo codes:', error)
      return res.status(500).json({ message: 'Failed to create test promo codes', error })
    }

    console.log('✅ Test promo codes created:')
    data?.forEach(code => {
      console.log(`- ${code.code}: ${code.discount_percent}% off`)
    })

    return res.status(200).json({
      success: true,
      message: 'Test promo codes created successfully',
      codes: data
    })

  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}