import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function NewsletterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '' })
      } else {
        setError(data.message || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Newsletter - Sylvanity Academy Platform</title>
        <meta name="description" content="Subscribe to the Sylvanity Academy newsletter for the latest updates on AI and technology training programs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="heading-page mb-4 sm:mb-6">
              Stay Updated with Sylvanity Academy
            </h1>
            <p className="text-subtitle max-w-3xl mx-auto">
              Subscribe to our newsletter and be the first to know about new training programs,
              industry insights, and exclusive early-bird discounts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Get</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-brand-sage">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">New AI and Automation Training Programs</h3>
                    <p className="text-gray-600">Be the first to know about our latest course offerings and training modules.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-brand-blue">👥</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Leadership & Management Workshops</h3>
                    <p className="text-gray-600">Updates on executive training and professional development opportunities.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-brand-sage">📊</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Data & Analytics Courses</h3>
                    <p className="text-gray-600">Learn about our data science and analytics training programs.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-brand-blue">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Exclusive Early-Bird Discounts</h3>
                    <p className="text-gray-600">Get special pricing and promotional offers before they're available to the public.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-brand-sage/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-brand-sage">💡</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Industry Insights and Tips</h3>
                    <p className="text-gray-600">Expert insights on AI trends, business transformation, and technology adoption.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Subscribe to Our Newsletter</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-ping"></div>
                  </div>

                  <h3 className="text-2xl font-normal text-gray-900 mb-3">You're all set!</h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Welcome to Sylvanity Academy. Check your inbox for a confirmation email.
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto">
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">No email yet?</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Check your spam folder or allow a few minutes for delivery. The email comes from Sylvanity Academy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gradient-primary hover-gradient-lift py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      By subscribing, you agree to receive email updates from Sylvanity Academy.
                      You can unsubscribe at any time.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-brand-sage/10 to-brand-blue/10 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Don't wait for the newsletter - explore our current training programs and get started today!
            </p>
            <a
              href="/trainings"
              className="btn-gradient-primary hover-gradient-lift px-6 py-3 inline-flex items-center"
            >
              Browse Training Programs
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}