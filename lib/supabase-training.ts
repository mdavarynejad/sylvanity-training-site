import { supabase } from './supabase'
import { Training } from './mock-data'

export async function getTrainings(): Promise<Training[]> {
  try {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('featured', { ascending: false })
      .order('start_date', { ascending: true })

    if (error) {
      console.error('Error fetching trainings:', error)
      // Fallback to mock data if Supabase is not configured
      const { mockTrainings } = await import('./mock-data')
      return mockTrainings
    }

    // Transform database format to match frontend interface
    return data.map(training => ({
      id: training.id,
      title: training.title,
      description: training.description,
      longDescription: training.long_description,
      price: training.price,
      currency: training.currency,
      duration: training.duration,
      startDate: training.start_date,
      endDate: training.end_date,
      maxParticipants: training.max_participants,
      currentParticipants: training.current_participants,
      instructor: training.instructor,
      level: training.level as 'Beginner' | 'Intermediate' | 'Advanced',
      category: training.category,
      tags: training.tags || [],
      featured: training.featured,
      imageUrl: training.image_url,
      prerequisites: training.prerequisites
    }))
  } catch (error) {
    console.error('Error in getTrainings:', error)
    // Fallback to mock data
    const { mockTrainings } = await import('./mock-data')
    return mockTrainings
  }
}

export async function getTrainingById(id: string): Promise<Training | null> {
  try {
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

    // Transform database format to match frontend interface
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      longDescription: data.long_description,
      price: data.price,
      currency: data.currency,
      duration: data.duration,
      startDate: data.start_date,
      endDate: data.end_date,
      maxParticipants: data.max_participants,
      currentParticipants: data.current_participants,
      instructor: data.instructor,
      level: data.level as 'Beginner' | 'Intermediate' | 'Advanced',
      category: data.category,
      tags: data.tags || [],
      featured: data.featured,
      imageUrl: data.image_url,
      prerequisites: data.prerequisites
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