import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isValidSession, setIsValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      if (!supabase) {
        setMessage({ type: 'error', text: 'Authentication is not configured.' })
        setCheckingSession(false)
        return
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error || !session) {
          setMessage({
            type: 'error',
            text: 'Invalid or expired reset link. Please request a new password reset.'
          })
          setIsValidSession(false)
        } else {
          setIsValidSession(true)
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: 'Unable to verify reset link. Please try again.'
        })
        setIsValidSession(false)
      } finally {
        setCheckingSession(false)
      }
    }

    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' })
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' })
      setLoading(false)
      return
    }

    if (!supabase) {
      setMessage({ type: 'error', text: 'Authentication is not configured.' })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Password updated successfully! You will be redirected to the dashboard.'
      })

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error: any) {
      let errorMessage = error.message

      if (error.message?.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long.'
      } else if (error.message?.includes('Auth session missing')) {
        errorMessage = 'Your session has expired. Please request a new password reset.'
      } else if (error.message?.includes('Invalid session')) {
        errorMessage = 'Invalid reset session. Please request a new password reset.'
      }

      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying reset link...</h2>
          <p className="text-gray-600">Please wait while we validate your password reset request.</p>
        </div>
      </div>
    )
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Reset Link</h2>
            <p className="text-gray-600 mb-6">
              This password reset link has expired or is invalid. Please request a new one.
            </p>
            <div className="space-y-3">
              <Link href="/auth/forgot-password">
                <span className="block w-full btn-gradient-primary py-2 px-4 text-center cursor-pointer">
                  Request New Reset Link
                </span>
              </Link>
              <Link href="/auth/signin">
                <span className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center cursor-pointer">
                  Back to Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary">Set New Password</h1>
          <p className="mt-2 text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your new password"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Confirm your new password"
                required
                minLength={6}
              />
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Password Strength:</div>
                <div className="space-y-1">
                  <div className={`text-xs ${password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                    ✓ At least 6 characters
                  </div>
                  <div className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                    ✓ Contains uppercase letter (recommended)
                  </div>
                  <div className={`text-xs ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                    ✓ Contains number (recommended)
                  </div>
                </div>
              </div>
            )}

            {/* Password match indicator */}
            {confirmPassword && (
              <div className={`text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || password !== confirmPassword || password.length < 6}
              className="w-full btn-gradient-primary py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover-gradient-lift transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </div>
              ) : (
                'Update Password'
              )}
            </button>
          </form>

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
        </div>

        <div className="mt-6 text-center">
          <Link href="/auth/signin">
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200 shadow-sm cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}