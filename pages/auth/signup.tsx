import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthForm from '@/components/auth/auth-form'
import { useAuth } from '@/components/auth/auth-provider'

export default function SignUpPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary">Join Sylvanity Training</h1>
          <p className="mt-2 text-gray-600">Create your training account to book AI and technology programs</p>
        </div>

        <AuthForm mode="signup" />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium link-gradient">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/">
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200 shadow-sm cursor-pointer">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}