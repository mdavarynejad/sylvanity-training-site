import Head from 'next/head'
import { useState } from 'react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact_page'
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact - Sylvanity Academy Platform</title>
        <meta name="description" content="Get in touch with Sylvanity Academy Platform for inquiries about our AI and technology training programs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="page-container">
        {/* Hero Section */}
        <div className="page-header">
          <div className="text-center">
            <h1 className="heading-page mb-6 text-gradient-primary">Get in Touch</h1>
            <p className="text-subtitle max-w-3xl mx-auto">
              Have questions about our training programs? Want to discuss custom training
              solutions for your team? We'd love to hear from you.
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="page-section">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-12">Let's Connect</h2>

              <div className="space-y-8">
                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-brand-sage/10 rounded-lg flex items-center justify-center mr-6 mt-1 group-hover:bg-brand-sage/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-6 h-6 text-brand-sage group-hover:text-brand-sage/80 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-brand-sage transition-colors duration-300">Email</h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">academy@sylvanity.eu</p>
                  </div>
                </div>

                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mr-6 mt-1 group-hover:bg-brand-blue/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-6 h-6 text-brand-blue group-hover:text-brand-blue/80 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-brand-blue transition-colors duration-300">Phone</h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">+1-555-TRAINING</p>
                  </div>
                </div>

                <div className="flex items-start group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-6 mt-1 group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">Website</h3>
                    <a href="https://sylvanity.eu" className="text-brand-blue hover:text-brand-blue/80 transition-colors duration-200 leading-relaxed font-medium">
                      sylvanity.eu
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 group cursor-pointer hover:border-gray-300 transition-colors duration-300">
                <h3 className="text-lg font-medium text-gray-900 mb-6 group-hover:text-brand-sage transition-colors duration-300">Business Hours</h3>
                <div className="space-y-3 text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  <p className="hover:translate-x-1 transition-transform duration-200">Monday - Friday: 9:00 AM - 6:00 PM (CET)</p>
                  <p className="hover:translate-x-1 transition-transform duration-200">Saturday: 10:00 AM - 2:00 PM (CET)</p>
                  <p className="hover:translate-x-1 transition-transform duration-200">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-12 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-medium text-gray-900 mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage transition-colors duration-200 text-base"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage transition-colors duration-200 text-base"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-3">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-sage focus:border-brand-sage transition-colors duration-200 text-base"
                      placeholder="Your organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-base resize-none"
                      placeholder="Tell us about your training needs or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gradient-primary hover-gradient-lift w-full py-4 text-base font-medium"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}