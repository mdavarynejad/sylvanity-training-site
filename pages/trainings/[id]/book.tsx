import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useAuth } from '@/components/auth/auth-provider'
import { Training, formatPrice, formatDate } from '@/lib/mock-data'
import { getTrainingById, createBooking } from '@/lib/supabase-training'

interface BookingPageProps {
  training: Training
}

export default function BookingPage({ training }: BookingPageProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/auth/signin?redirect=/trainings/${training.id}/book`)
    }
  }, [user, authLoading, router, training.id])

  const handleBooking = async () => {
    if (!user) return

    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await createBooking(training.id, user.id)

      if (error) {
        if (error.message?.includes('duplicate')) {
          setMessage('You have already booked this training.')
        } else {
          setMessage('Failed to create booking. Please try again.')
        }
        return
      }

      setMessage('Booking created successfully! You will receive a confirmation email.')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Booking error:', error)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const availableSpots = training.maxParticipants - training.currentParticipants
  const isFull = availableSpots === 0

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/trainings/${training.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Training Details
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-blue-600 text-white">
              <h1 className="text-2xl font-bold">Book Training</h1>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {training.title}
                </h2>
                <p className="text-gray-600">{training.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Training Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span>{formatDate(training.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span>{training.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instructor:</span>
                      <span>{training.instructor}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">{formatPrice(training.price, training.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-blue-600 font-medium">Pending Payment</span>
                    </div>
                  </div>
                </div>
              </div>

              {isFull ? (
                <div className="text-center py-4">
                  <p className="text-red-600 font-medium mb-4">
                    This training is currently full. You can join the waitlist.
                  </p>
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Joining Waitlist...' : 'Join Waitlist'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Click below to confirm your booking. You will receive payment instructions via email.
                  </p>
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="btn-gradient-primary hover-gradient-lift px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              )}

              {message && (
                <div className={`mt-4 p-4 rounded-lg text-sm ${
                  message.includes('success') || message.includes('created')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll receive a booking confirmation email</li>
                  <li>• Payment instructions will be provided</li>
                  <li>• Training materials will be sent before the session</li>
                  <li>• You can manage your bookings in your dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const training = await getTrainingById(params?.id as string)

  if (!training) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      training,
    },
  }
}