import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!supabase) {
      setMessage({ type: 'error', text: 'Authentication is not configured. Please contact support.' })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/reset-password`
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Password reset instructions have been sent to your email address.'
      })
      setEmailSent(true)
    } catch (error: any) {
      let errorMessage = error.message

      if (error.message?.includes('User not found')) {
        errorMessage = 'No account found with this email address.'
      } else if (error.message?.includes('Email rate limit exceeded')) {
        errorMessage = 'Too many password reset requests. Please wait a few minutes before trying again.'
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address.'
      }

      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary">Reset Your Password</h1>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient-primary py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover-gradient-lift transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-4">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-4 rounded-xl text-sm border transition-all duration-300 ${
              message.type === 'error'
                ? 'bg-red-50 text-red-800 border-red-200'
                : 'bg-green-50 text-green-800 border-green-200'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                  message.type === 'error' ? 'bg-red-200' : 'bg-green-200'
                }`}>
                  {message.type === 'error' ? (
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          )}

          {emailSent && (
            <button
              onClick={() => {
                setEmailSent(false)
                setEmail('')
                setMessage(null)
              }}
              className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Different Email
            </button>
          )}
        </div>

        <div className="mt-6 text-center space-y-3">
          <Link href="/auth/signin">
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200 shadow-sm cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Sign In
            </span>
          </Link>

          <div className="text-sm text-gray-500">
            Remember your password? {' '}
            <Link href="/auth/signin">
              <span className="text-brand-sage hover:text-brand-blue transition-colors cursor-pointer font-medium">
                Sign in here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}