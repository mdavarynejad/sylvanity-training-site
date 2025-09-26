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
        <title>Newsletter - Sylvanity Training Platform</title>
        <meta name="description" content="Subscribe to the Sylvanity Training newsletter for the latest updates on AI and technology training programs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Stay Updated with Sylvanity Training
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Subscribe to our newsletter and be the first to know about new training programs,
              industry insights, and exclusive early-bird discounts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Get</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">New AI & Technology Training Programs</h3>
                    <p className="text-gray-600">Be the first to know about our latest course offerings and training modules.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600">👥</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Leadership & Management Workshops</h3>
                    <p className="text-gray-600">Updates on executive training and professional development opportunities.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600">📊</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Data & Analytics Courses</h3>
                    <p className="text-gray-600">Learn about our data science and analytics training programs.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Exclusive Early-Bird Discounts</h3>
                    <p className="text-gray-600">Get special pricing and promotional offers before they're available to the public.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600">💡</span>
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-green-600">✓</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Sylvanity Training!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for subscribing! A welcome email has been sent to your inbox.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-blue-900 mb-2">📧 Didn't receive the email?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Check your spam/junk folder</li>
                      <li>• The email comes from "Sylvanity Training"</li>
                      <li>• Subject: "Welcome to Sylvanity Training Newsletter!"</li>
                      <li>• Allow a few minutes for delivery</li>
                    </ul>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      By subscribing, you agree to receive email updates from Sylvanity Training.
                      You can unsubscribe at any time.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Don't wait for the newsletter - explore our current training programs and get started today!
            </p>
            <a
              href="/trainings"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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