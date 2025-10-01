import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (!supabase) {
          setError('Authentication service is not configured')
          setLoading(false)
          return
        }

        const { data, error: authError } = await supabase.auth.getSession()

        if (authError) {
          console.error('Auth callback error:', authError)
          setError('Failed to confirm email. Please try again.')
          setLoading(false)
          return
        }

        if (data.session) {
          // User is authenticated, create profile if it doesn't exist
          const { user } = data.session

          // Check if profile exists
          const { data: existingProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single()

          // Create profile if it doesn't exist (when we get an error because no record found)
          if (!existingProfile || profileError) {
            console.log('Creating new profile for user:', user.id)
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email!,
                full_name: user.user_metadata?.full_name || '',
                company: user.user_metadata?.company || ''
              })

            if (insertError) {
              console.error('Error creating profile:', insertError)
            } else {
              console.log('Profile created successfully for user:', user.id)
            }
          } else {
            console.log('Profile already exists for user:', user.id)
          }

          // Redirect to confirmation success page
          router.push('/auth/confirmation-success')
        } else {
          // No session, redirect to signin
          router.push('/auth/signin?message=Please sign in to continue')
        }
      } catch (err) {
        console.error('Callback error:', err)
        setError('An unexpected error occurred')
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirming your email...</h2>
          <p className="text-gray-600">Please wait while we verify your account.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Confirmation Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  return null
}