import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = createSupabaseClient()

    // Test: Get trainings count
    const { count: trainingCount, error: countError } = await supabase
      .from('trainings')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to count trainings',
        error: countError.message
      })
    }

    // Test: Get first few trainings
    const { data: trainings, error: trainingsError } = await supabase
      .from('trainings')
      .select('id, title, description, price, featured')
      .limit(3)

    if (trainingsError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch trainings',
        error: trainingsError.message
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Trainings data retrieved successfully',
      trainingCount,
      sampleTrainings: trainings
    })

  } catch (error) {
    console.error('Test trainings error:', error)
    return res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}