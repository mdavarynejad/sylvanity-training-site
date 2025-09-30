import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to signin page with signup tab
    router.replace('/auth/signin?tab=signup')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}