import { createSupabaseClient } from './supabase'
import { Training } from './mock-data'

export async function getTrainings(): Promise<Training[]> {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching trainings:', error)
      // Fallback to mock data if Supabase is not configured
      const { mockTrainings } = await import('./mock-data')
      return mockTrainings
    }


    // Transform database format to match frontend interface
    return data.map(training => {
      // Handle start_dates JSONB array - take the first available date
      const startDates = training.start_dates || []
      const firstStartDate = Array.isArray(startDates) && startDates.length > 0 ? startDates[0] : null

      return {
        id: training.id,
        title: training.title,
        description: training.description,
        longDescription: training.long_description,
        price: training.price,
        currency: training.currency || 'USD',
        duration: training.duration,
        startDate: firstStartDate,
        startDates: startDates, // Add start dates array
        endDate: training.end_date || null,
        maxParticipants: training.max_participants || 20,
        currentParticipants: training.current_participants || 0,
        instructor: training.instructor,
        level: training.level as 'Beginner' | 'Intermediate' | 'Advanced',
        category: training.category,
        tags: training.tags || [],
        featured: training.featured || false,
        imageUrl: training.hero_image_url,
        heroImageUrl: training.hero_image_url, // Add heroImageUrl for detail page
        pdfAttachmentUrl: training.pdf_attachment_url, // Add PDF attachment URL
        prerequisites: training.prerequisites || []
      }
    })
  } catch (error) {
    console.error('Error in getTrainings:', error)
    // Fallback to mock data
    const { mockTrainings } = await import('./mock-data')
    return mockTrainings
  }
}

export async function getTrainingById(id: string): Promise<Training | null> {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching training:', error)
      // Fallback to mock data
      const { getTrainingById: getMockTraining } = await import('./mock-data')
      return getMockTraining(id)
    }

    if (!data) return null

    // Handle start_dates JSONB array - take the first available date
    const startDates = data.start_dates || []
    const firstStartDate = Array.isArray(startDates) && startDates.length > 0 ? startDates[0] : null

    // Transform database format to match frontend interface
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      longDescription: data.long_description,
      price: data.price,
      currency: data.currency || 'USD',
      duration: data.duration,
      startDate: firstStartDate,
      startDates: startDates, // Add start dates array
      endDate: data.end_date || null,
      maxParticipants: data.max_participants || 20,
      currentParticipants: data.current_participants || 0,
      instructor: data.instructor,
      level: data.level as 'Beginner' | 'Intermediate' | 'Advanced',
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
      imageUrl: data.hero_image_url,
      heroImageUrl: data.hero_image_url, // Add heroImageUrl for detail page
      pdfAttachmentUrl: data.pdf_attachment_url, // Add PDF attachment URL
      prerequisites: data.prerequisites || []
    }
  } catch (error) {
    console.error('Error in getTrainingById:', error)
    // Fallback to mock data
    const { getTrainingById: getMockTraining } = await import('./mock-data')
    return getMockTraining(id)
  }
}

export async function createBooking(trainingId: string, userId: string) {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        training_id: trainingId,
        user_id: userId,
        status: 'pending',
        payment_status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error creating booking:', error)
    return { data: null, error }
  }
}