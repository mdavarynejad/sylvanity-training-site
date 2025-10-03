import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        setError(data.message || 'Failed to unsubscribe. Please try again.')
      }
    } catch (err) {
      console.error('Error unsubscribing:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Unsubscribe - Sylvanity Academy</title>
        <meta name="description" content="Unsubscribe from Sylvanity Academy newsletter" />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Unsubscribe from Newsletter</h1>
                  <p className="text-gray-600">
                    We're sorry to see you go. Enter your email address below to unsubscribe from our newsletter.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage"
                      placeholder="your@email.com"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gradient-secondary hover-gradient-lift font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : 'Unsubscribe'}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Changed your mind?{' '}
                    <a href="/newsletter" className="text-brand-sage hover:text-brand-blue font-medium">
                      Stay subscribed
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">You've Been Unsubscribed</h2>
                <p className="text-gray-600 mb-6">
                  You will no longer receive newsletter emails from Sylvanity Academy.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  If you change your mind, you can always subscribe again on our newsletter page.
                </p>
                <a
                  href="/"
                  className="inline-block btn-gradient-primary hover-gradient-lift font-semibold py-3 px-6 rounded-lg"
                >
                  Return to Home
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
