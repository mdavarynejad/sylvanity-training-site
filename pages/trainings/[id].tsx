import { GetStaticProps, GetStaticPaths } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { Training, formatPrice, formatDate } from '@/lib/mock-data'
import { getTrainings, getTrainingById } from '@/lib/supabase-training'
import { getStripe, isStripeConfigured } from '@/lib/stripe/client'
import LeadCaptureForm from '@/components/forms/lead-capture-form'
import PromoCodeModal from '@/components/forms/promo-code-modal'
import CourseMaterialsTabs from '@/components/course-materials-tabs'
import EnrollmentModal, { EnrollmentData } from '@/components/enrollment-modal'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

interface TrainingDetailPageProps {
  training: Training
}

export default function TrainingDetailPage({ training }: TrainingDetailPageProps) {
  // Redirect upcoming courses to 404 or show a "coming soon" message
  if (training.upcoming) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h1>
            <p className="text-gray-600 mb-6">
              This training course is currently in preparation and not yet available for booking.
            </p>
            <Link
              href="/trainings"
              className="btn-gradient-primary"
            >
              View Available Trainings
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)
  const [generatedPromoCode, setGeneratedPromoCode] = useState('')

  const stripeConfigured = isStripeConfigured()

  const validatePromoCode = async (code: string) => {
    if (!code.trim()) {
      return { valid: false }
    }

    try {
      const response = await fetch('/api/promo-codes/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          trainingId: training.id,
        }),
      })

      const data = await response.json()

      if (response.ok && data.valid) {
        return {
          valid: true,
          discount_percent: data.discount_percent
        }
      } else {
        return {
          valid: false,
          message: data.message || 'Invalid promo code'
        }
      }
    } catch (error) {
      console.error('Error validating promo code:', error)
      return {
        valid: false,
        message: 'Error validating promo code'
      }
    }
  }

  const handleEnrollClick = () => {
    if (!stripeConfigured) {
      setError('Payment system is not configured. Please contact support.')
      return
    }
    setShowEnrollmentModal(true)
  }

  const handleProceedToPayment = async (enrollmentData: EnrollmentData) => {
    setShowEnrollmentModal(false)
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
          promoCode: enrollmentData.promoCode || null,
          selectedDate: enrollmentData.selectedDate,
          dataConsent: enrollmentData.dataConsent,
          marketingConsent: enrollmentData.marketingConsent,
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
    <div className="page-container">
      <Header />
      <div className="page-section">
        <Link href="/trainings">
          <div className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-md mb-12 group cursor-pointer">
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">All Trainings</span>
          </div>
        </Link>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl sm:rounded-2xl mobile-hero-section mobile-section-gap">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {training.featured && (
                <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                  ⭐ Featured
                </span>
              )}
              <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                {training.level}
              </span>
              <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                {training.category}
              </span>
              <span className="bg-white bg-opacity-20 text-white text-sm font-medium px-3 py-1 rounded-full">
                {training.duration}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              {training.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-3xl">
              {training.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEnrollClick}
                disabled={loading || !stripeConfigured}
                className={`px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 ${
                  !stripeConfigured
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : loading
                    ? 'btn-gradient-primary opacity-80 cursor-wait'
                    : 'btn-gradient-primary hover-gradient-lift'
                }`}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></span>
                    Processing...
                  </>
                ) : !stripeConfigured ? (
                  'Enrollment Currently Unavailable'
                ) : (
                  'Enroll Now'
                )}
              </button>

              <button
                onClick={() => setShowLeadForm(true)}
                className="btn-gradient-secondary hover-gradient-lift px-8 py-4 font-medium text-lg"
              >
                Get More Information
              </button>
            </div>

            {!stripeConfigured && (
              <p className="text-blue-200 text-sm mt-4">
                💡 Demo mode: Contact us for enrollment details
              </p>
            )}
          </div>
        </div>

        {/* Course Overview */}
        <div className="card mobile-card-padding mobile-section-gap">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Course Overview</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              {training.longDescription}
            </p>
          </div>
        </div>

        {/* What You'll Learn */}
        {training.tags && training.tags.length > 0 && (
          <div className="card mobile-card-padding mobile-section-gap">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {training.tags.map((tag, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 mr-3">✓</span>
                  <span className="text-gray-800 font-medium">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <CourseMaterialsTabs training={training} />

        {/* Why Choose This Training */}
        <div className="card mobile-card-padding mobile-section-gap">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose This {training.title} Training?</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">
              {training.seoWhyChoose || `Transform your career with our comprehensive ${training.title} training program.
              This hands-on ${training.category} course is designed for professionals seeking to master
              ${training.level.toLowerCase()} level skills in today's competitive market.
              Our expert-led ${training.duration} program combines theoretical knowledge with practical application,
              ensuring you gain real-world expertise that employers value.`}
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="card mobile-card-padding mobile-section-gap">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Key Learning Outcomes</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <p className="text-gray-700 mb-6 text-lg">
              {training.seoLearningOutcomes || `Upon completing this ${training.category} training, participants will:`}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {(training.learningOutcomes || [
                `Master fundamental and advanced concepts in ${training.category}`,
                `Apply practical skills through hands-on exercises and real-world scenarios`,
                `Develop strategic thinking and problem-solving capabilities`,
                `Build confidence in implementing ${training.category} solutions`,
                `Network with industry professionals and expand your career opportunities`
              ]).map((outcome, index) => (
                <div key={index} className="flex items-start p-3 bg-white rounded-lg">
                  <span className="text-blue-600 mr-3 font-bold">✓</span>
                  <span className="text-gray-700 font-medium">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who Should Attend */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Should Attend This Training?</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed">
              {training.seoTargetAudience || `This ${training.level} level ${training.category} training is ideal for
              professionals, managers, and executives looking to enhance their skills and advance their careers.
              Whether you're transitioning into ${training.category} or seeking to deepen your existing knowledge,
              this comprehensive program provides the tools and insights needed for success.`}
            </p>
          </div>
        </div>

        {/* Training Methodology */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Training Methodology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">🎯 Interactive Learning</h3>
              <p className="text-gray-700">Engaging workshops with hands-on exercises and group discussions</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Real-World Cases</h3>
              <p className="text-gray-700">Learn from actual business scenarios and industry best practices</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">📚 Comprehensive Materials</h3>
              <p className="text-gray-700">Access to exclusive resources, templates, and ongoing support</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="card mobile-card-padding mobile-section-gap">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {(training.faqs || [
              {
                question: `What prerequisites are needed for this ${training.category} training?`,
                answer: `This ${training.level} level course ${training.level === 'Beginner' ?
                  'requires no prior experience' :
                  'assumes basic familiarity with core concepts'}. We provide all necessary materials and support.`
              },
              {
                question: "What certification will I receive?",
                answer: "Upon successful completion, you'll receive an official Sylvanity Training certificate recognized by industry leaders."
              },
              {
                question: "Is this training available online?",
                answer: "We offer flexible delivery options including in-person, virtual, and hybrid formats to suit your needs."
              }
            ]).map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Skills?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who have already enhanced their capabilities through our expert-led training programs.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
            <button
              onClick={handleEnrollClick}
              disabled={loading || !stripeConfigured}
              className={`w-full sm:w-auto px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 ${
                !stripeConfigured
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : loading
                  ? 'btn-gradient-primary opacity-80 cursor-wait'
                  : 'btn-gradient-primary hover-gradient-lift'
              }`}
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Processing...
                </>
              ) : !stripeConfigured ? (
                'Enrollment Currently Unavailable'
              ) : (
                'Enroll Now'
              )}
            </button>

            <button
              onClick={() => setShowLeadForm(true)}
              className="w-full sm:w-auto btn-gradient-secondary hover-gradient-lift px-8 py-4 font-medium text-lg"
            >
              Get More Information
            </button>
          </div>

          {!stripeConfigured && (
            <p className="text-blue-600 text-sm mt-4">
              💡 Demo mode: Contact us for enrollment details
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Instant Enrollment
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Secure Payment
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Money-Back Guarantee
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Certificate Included
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

      {/* Enrollment Modal */}
      <EnrollmentModal
        training={training}
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        onProceedToPayment={handleProceedToPayment}
        onValidatePromoCode={validatePromoCode}
      />

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