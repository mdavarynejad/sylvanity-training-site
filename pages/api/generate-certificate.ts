import { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseClient } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { training_id } = req.body
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No valid authorization token provided' })
    }

    const token = authHeader.substring(7)
    const supabase = createSupabaseClient()

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid authentication token' })
    }

    // Check if user has completed all modules for this training
    const { data: modules } = await supabase
      .from('training_modules')
      .select('id')
      .eq('training_id', training_id)

    if (!modules || modules.length === 0) {
      return res.status(400).json({ error: 'No modules found for this training' })
    }

    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('training_id', training_id)
      .eq('status', 'completed')

    if (!progress || progress.length !== modules.length) {
      return res.status(400).json({ error: 'Training not completed. All modules must be completed to generate certificate.' })
    }

    // Check if certificate already exists
    const { data: existingCertificate } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id)
      .eq('training_id', training_id)
      .single()

    if (existingCertificate) {
      return res.status(200).json({
        message: 'Certificate already exists',
        certificate: existingCertificate
      })
    }

    // Get training and user details
    const { data: training } = await supabase
      .from('trainings')
      .select('*')
      .eq('id', training_id)
      .single()

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!training) {
      return res.status(404).json({ error: 'Training not found' })
    }

    // Generate certificate number (unique identifier)
    const certificateNumber = `SYL-${Date.now()}-${user.id.substring(0, 8).toUpperCase()}`

    // Calculate completion date (latest module completion)
    const completionDate = progress.reduce((latest, p) => {
      const date = new Date(p.completed_at)
      return date > latest ? date : latest
    }, new Date(0))

    // Create certificate data
    const certificateData = {
      participant_name: profile?.full_name || user.email,
      participant_email: user.email,
      training_title: training.title,
      training_description: training.description,
      instructor: training.instructor,
      completion_date: completionDate.toISOString(),
      total_modules: modules.length,
      certificate_number: certificateNumber,
      issued_date: new Date().toISOString()
    }

    // Insert certificate record
    const { data: certificate, error: certificateError } = await supabase
      .from('certificates')
      .insert({
        user_id: user.id,
        training_id: training_id,
        certificate_number: certificateNumber,
        certificate_data: certificateData,
        issued_at: new Date().toISOString(),
        valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // Valid for 1 year
      })
      .select()
      .single()

    if (certificateError) {
      console.error('Certificate creation error:', certificateError)
      return res.status(500).json({ error: 'Failed to create certificate' })
    }

    return res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      certificate: certificate
    })

  } catch (error) {
    console.error('Certificate generation error:', error)
    return res.status(500).json({
      success: false,
      message: 'Certificate generation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}