import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (!supabase) {
      setMessage('Authentication is not configured. Please set up Supabase credentials.')
      setLoading(false)
      return
    }

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/auth/callback`,
            data: {
              full_name: fullName,
              company: company
            }
          }
        })

        if (error) throw error

        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) throw error

        setMessage('Successfully signed in!')
        onSuccess?.()
      }
    } catch (error: any) {
      // Provide more specific error messages
      let errorMessage = error.message

      if (mode === 'signin') {
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Email or password is incorrect. Please check your credentials and try again.'
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.'
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a few minutes before trying again.'
        }
      } else {
        // For signup errors
        if (error.message?.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Try signing in instead.'
        } else if (error.message?.includes('Password should be at least')) {
          errorMessage = 'Password must be at least 6 characters long.'
        } else if (error.message?.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.'
        }
      }

      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus-gradient"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus-gradient"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {mode === 'signin' && (
                <Link href="/auth/forgot-password">
                  <span className="text-sm text-brand-sage hover:text-brand-blue transition-colors cursor-pointer">
                    Forgot password?
                  </span>
                </Link>
              )}
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient-primary py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover-gradient-lift"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-sm border transition-all duration-300 ${
            message.includes('error') || message.includes('Error')
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-gray-50 text-gray-800 border-gray-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                message.includes('error') || message.includes('Error')
                  ? 'bg-red-200'
                  : 'bg-gray-300'
              }`}>
                {message.includes('error') || message.includes('Error') ? (
                  <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium leading-relaxed">{message}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}