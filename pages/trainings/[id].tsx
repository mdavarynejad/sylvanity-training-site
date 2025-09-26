import { GetStaticProps, GetStaticPaths } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { Training, formatPrice, formatDate } from '@/lib/mock-data'
import { getTrainings, getTrainingById } from '@/lib/supabase-training'
import { getStripe, isStripeConfigured } from '@/lib/stripe/client'
import LeadCaptureForm from '@/components/forms/lead-capture-form'
import PromoCodeModal from '@/components/forms/promo-code-modal'
import Footer from '@/components/layout/footer'

interface TrainingDetailPageProps {
  training: Training
}

export default function TrainingDetailPage({ training }: TrainingDetailPageProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [generatedPromoCode, setGeneratedPromoCode] = useState('')

  const availableSpots = training.maxParticipants - training.currentParticipants
  const isAlmostFull = availableSpots <= 3
  const isFull = availableSpots === 0
  const stripeConfigured = isStripeConfigured()

  const handleRegister = async () => {
    if (!stripeConfigured) {
      setError('Payment system is not configured. Please contact support.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create checkout session
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainingId: training.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Failed to load payment system')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleLeadSuccess = (promoCode: string) => {
    setGeneratedPromoCode(promoCode)
    setShowLeadForm(false)
    setShowPromoCode(true)
  }

  const levelColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/trainings"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Trainings
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {training.featured && (
            <div className="bg-blue-500 text-white px-6 py-3">
              <span className="font-medium">Featured Training</span>
            </div>
          )}

          {training.heroImageUrl && (
            <div className="relative h-64 md:h-80">
              <img
                src={training.heroImageUrl}
                alt={training.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {training.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${levelColors[training.level]}`}>
                    {training.level}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {training.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {training.duration}
                  </span>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  {training.description}
                </p>

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Course Overview</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {training.longDescription}
                  </p>
                </div>

                {training.tags && training.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {training.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {training.pdfAttachmentUrl && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Materials</h3>
                    <a
                      href={training.pdfAttachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Course Syllabus (PDF)
                    </a>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatPrice(training.price, training.currency)}
                    </div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium">{training.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Start:</span>
                      <span className="font-medium">
                        {training.startDates && training.startDates.length > 0
                          ? formatDate(training.startDates[0])
                          : 'TBD'
                        }
                      </span>
                    </div>
                    {training.startDates && training.startDates.length > 1 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">More Dates:</span>
                        <span className="font-medium text-blue-600">+{training.startDates.length - 1} more</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{training.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Participants:</span>
                      <span className="font-medium">{training.maxParticipants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Spots:</span>
                      <span className={`font-medium ${isAlmostFull ? 'text-orange-600' : isFull ? 'text-red-600' : 'text-green-600'}`}>
                        {isFull ? 'Full' : `${availableSpots} left`}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      onClick={handleRegister}
                      disabled={isFull || loading || !stripeConfigured}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-center ${
                        isFull || !stripeConfigured
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : loading
                          ? 'bg-blue-400 text-white cursor-wait'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {loading ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                          Processing...
                        </>
                      ) : isFull ? (
                        'Join Waitlist'
                      ) : !stripeConfigured ? (
                        'Payment System Unavailable'
                      ) : (
                        'Register Now'
                      )}
                    </button>

                    <button
                      onClick={() => setShowLeadForm(true)}
                      className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-center font-medium"
                    >
                      Get More Info & Discount
                    </button>
                  </div>

                  {!stripeConfigured && (
                    <p className="text-orange-600 text-sm text-center mt-2">
                      💡 Demo mode: Add Stripe credentials to enable payments
                    </p>
                  )}

                  {isAlmostFull && !isFull && (
                    <p className="text-orange-600 text-sm text-center mt-2">
                      Only {availableSpots} spots remaining!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Modal */}
      {showLeadForm && (
        <LeadCaptureForm
          training={training}
          onSuccess={handleLeadSuccess}
          onClose={() => setShowLeadForm(false)}
          source="training_page"
        />
      )}

      {/* Promo Code Success Modal */}
      {showPromoCode && (
        <PromoCodeModal
          promoCode={generatedPromoCode}
          trainingTitle={training.title}
          onClose={() => setShowPromoCode(false)}
        />
      )}

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const trainings = await getTrainings()
  const paths = trainings.map((training) => ({
    params: { id: training.id },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    revalidate: 60, // Revalidate every minute
  }
}