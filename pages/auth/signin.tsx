import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthForm from '@/components/auth/auth-form'
import { useAuth } from '@/components/auth/auth-provider'

export default function SignInPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  useEffect(() => {
    // Check for tab parameter in URL
    if (router.query.tab === 'signup') {
      setActiveTab('signup')
    }
  }, [router.query.tab])

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  const getPageTitle = () => {
    return activeTab === 'signin' ? 'Welcome Back' : 'Join Sylvanity Academy'
  }

  const getPageDescription = () => {
    return activeTab === 'signin'
      ? 'Sign in to your Sylvanity training account'
      : 'Create your training account to book AI and technology programs'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary">{getPageTitle()}</h1>
          <p className="mt-2 text-gray-600">{getPageDescription()}</p>
        </div>

        {/* Enhanced Tab Interface */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          {/* Tab Headers */}
          <div className="relative border-b border-gray-200 bg-gray-50">
            <div className="flex">
              <button
                onClick={() => setActiveTab('signin')}
                className={`relative flex-1 py-4 px-6 text-center font-medium transition-all duration-300 z-10 ${
                  activeTab === 'signin'
                    ? 'text-brand-sage'
                    : 'text-gray-500 hover:text-brand-sage'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`relative flex-1 py-4 px-6 text-center font-medium transition-all duration-300 z-10 ${
                  activeTab === 'signup'
                    ? 'text-brand-blue'
                    : 'text-gray-500 hover:text-brand-blue'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              </button>
            </div>

            {/* Sliding Indicator */}
            <div
              className={`absolute bottom-0 h-1 transition-all duration-300 ease-out ${
                activeTab === 'signin'
                  ? 'bg-brand-sage left-0 w-1/2'
                  : 'bg-brand-blue left-1/2 w-1/2'
              }`}
            />

            {/* Active Tab Background */}
            <div
              className={`absolute top-0 bottom-0 transition-all duration-300 ease-out ${
                activeTab === 'signin'
                  ? 'bg-white left-0 w-1/2 shadow-sm'
                  : 'bg-white left-1/2 w-1/2 shadow-sm'
              }`}
            />
          </div>

          {/* Form Content with Slide Animation */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${activeTab === 'signin' ? '0%' : '-100%'})` }}
            >
              {/* Sign In Form */}
              <div className="w-full flex-shrink-0 p-6">
                <AuthForm mode="signin" onSuccess={handleSuccess} />
              </div>

              {/* Sign Up Form */}
              <div className="w-full flex-shrink-0 p-6">
                <AuthForm mode="signup" onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
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