import { createSupabaseClient } from './supabase'

export interface TestimonialData {
  id: string
  participant_name: string
  participant_company?: string
  testimonial: string
  rating: number
  training_title?: string
  featured: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  participantName: string
  participantCompany?: string
  testimonial: string
  rating: number
  trainingTitle?: string
  featured: boolean
  createdAt: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      // Fallback to mock data if Supabase fails
      const { getFeaturedTestimonials } = await import('./mock-data')
      return getFeaturedTestimonials()
    }

    // Transform database format to match frontend interface
    return data.map((testimonial: TestimonialData) => ({
      id: testimonial.id,
      participantName: testimonial.participant_name,
      participantCompany: testimonial.participant_company,
      testimonial: testimonial.testimonial,
      rating: testimonial.rating,
      trainingTitle: testimonial.training_title,
      featured: testimonial.featured,
      createdAt: testimonial.created_at
    }))
  } catch (error) {
    console.error('Error in getTestimonials:', error)
    // Fallback to mock data
    const { getFeaturedTestimonials } = await import('./mock-data')
    return getFeaturedTestimonials()
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured testimonials:', error)
      // Fallback to mock data if Supabase fails
      const { getFeaturedTestimonials: getMockTestimonials } = await import('./mock-data')
      return getMockTestimonials()
    }

    // Transform database format to match frontend interface
    return data.map((testimonial: TestimonialData) => ({
      id: testimonial.id,
      participantName: testimonial.participant_name,
      participantCompany: testimonial.participant_company,
      testimonial: testimonial.testimonial,
      rating: testimonial.rating,
      trainingTitle: testimonial.training_title,
      featured: testimonial.featured,
      createdAt: testimonial.created_at
    }))
  } catch (error) {
    console.error('Error in getFeaturedTestimonials:', error)
    // Fallback to mock data
    const { getFeaturedTestimonials: getMockTestimonials } = await import('./mock-data')
    return getMockTestimonials()
  }
}

export function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}