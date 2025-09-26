import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCurrentAdminUser, AdminUser } from '@/lib/admin/auth'
import { Training, formatPrice, formatDate } from '@/lib/mock-data'
import { getTrainings } from '@/lib/supabase-training'

export default function AdminTrainings() {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      setLoading(true)
      const user = await getCurrentAdminUser()

      if (!user) {
        router.push('/auth/signin?message=Admin access required')
        return
      }

      setAdminUser(user)
      await loadTrainings()
    } catch (err) {
      console.error('Admin access error:', err)
      setError('Failed to load admin dashboard')
      router.push('/auth/signin?message=Admin access required')
    } finally {
      setLoading(false)
    }
  }

  const loadTrainings = async () => {
    try {
      const trainingsData = await getTrainings()
      setTrainings(trainingsData)
    } catch (err) {
      console.error('Error loading trainings:', err)
      setError('Failed to load trainings')
    }
  }

  const handleDeleteTraining = async (trainingId: string) => {
    if (!confirm('Are you sure you want to delete this training? This action cannot be undone.')) {
      return
    }

    try {
      // In a real implementation, this would call an API to delete the training
      console.log('Would delete training:', trainingId)
      alert('Delete functionality will be implemented with real database connection.')
    } catch (err) {
      console.error('Error deleting training:', err)
      alert('Failed to delete training')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !adminUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">{error || 'Admin privileges required'}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                ← Admin Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Training Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {adminUser.full_name || adminUser.email}
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {adminUser.role}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Trainings</h2>
          <button
            onClick={() => alert('Create new training functionality will be implemented with real database connection.')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Create New Training
          </button>
        </div>

        {/* Training List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Start
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trainings.map((training) => {
                  const availableSpots = training.maxParticipants - training.currentParticipants
                  const isAlmostFull = availableSpots <= 3
                  const isFull = availableSpots === 0

                  return (
                    <tr key={training.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {training.heroImageUrl && (
                            <img
                              className="h-10 w-10 rounded object-cover mr-4"
                              src={training.heroImageUrl}
                              alt={training.title}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {training.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {training.instructor}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {training.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(training.price, training.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {training.currentParticipants}/{training.maxParticipants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {training.startDates && training.startDates.length > 0
                          ? formatDate(training.startDates[0])
                          : 'TBD'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isFull
                            ? 'bg-red-100 text-red-800'
                            : isAlmostFull
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {isFull ? 'Full' : isAlmostFull ? 'Almost Full' : 'Available'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/trainings/${training.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => alert('Edit functionality will be implemented with real database connection.')}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTraining(training.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {trainings.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No trainings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new training program.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => alert('Create new training functionality will be implemented with real database connection.')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  + Create New Training
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Demo Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Demo Mode
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This admin panel is running with mock data. To enable full CRUD functionality,
                  connect a real Supabase database and implement the API endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}