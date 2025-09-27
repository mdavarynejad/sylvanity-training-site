import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase'

interface TrainingProgress {
  training_id: string
  training_title: string
  instructor: string
  category: string
  total_modules: number
  completed_modules: number
  progress_percentage: number
  last_accessed: string
  status: 'not_started' | 'in_progress' | 'completed'
  certificate_id?: string
}

export default function ProgressTracker() {
  const { user } = useAuth()
  const [progressData, setProgressData] = useState<TrainingProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProgressData()
    }
  }, [user])

  const fetchProgressData = async () => {
    try {
      // Get user's confirmed bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select(`
          training_id,
          trainings (
            title,
            instructor,
            category
          )
        `)
        .eq('user_id', user?.id)
        .eq('status', 'confirmed')

      if (!bookings) return

      // For each training, get progress data
      const progressPromises = bookings.map(async (booking) => {
        // Get total modules count
        const { data: modules } = await supabase
          .from('training_modules')
          .select('id')
          .eq('training_id', booking.training_id)

        // Get user's progress
        const { data: progress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user?.id)
          .eq('training_id', booking.training_id)

        // Check for certificate
        const { data: certificate } = await supabase
          .from('certificates')
          .select('id')
          .eq('user_id', user?.id)
          .eq('training_id', booking.training_id)
          .single()

        const totalModules = modules?.length || 0
        const completedModules = progress?.filter(p => p.status === 'completed').length || 0
        const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

        // Determine overall status
        let status: 'not_started' | 'in_progress' | 'completed' = 'not_started'
        if (progressPercentage === 100) {
          status = 'completed'
        } else if (progressPercentage > 0) {
          status = 'in_progress'
        }

        // Get last accessed date
        const lastAccessed = progress && progress.length > 0
          ? Math.max(...progress.map(p => new Date(p.updated_at).getTime()))
          : null

        return {
          training_id: booking.training_id,
          training_title: booking.trainings.title,
          instructor: booking.trainings.instructor,
          category: booking.trainings.category,
          total_modules: totalModules,
          completed_modules: completedModules,
          progress_percentage: progressPercentage,
          last_accessed: lastAccessed ? new Date(lastAccessed).toISOString() : new Date().toISOString(),
          status,
          certificate_id: certificate?.id
        }
      })

      const progressResults = await Promise.all(progressPromises)
      setProgressData(progressResults)

    } catch (error) {
      console.error('Error fetching progress data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (progressData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Progress</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-500 mb-4">No training progress yet</p>
          <Link
            href="/trainings"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Trainings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Training Progress</h3>
        <p className="text-sm text-gray-500">Track your learning journey</p>
      </div>

      <div className="divide-y divide-gray-200">
        {progressData.map((training) => (
          <div key={training.training_id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">{training.training_title}</h4>
                <p className="text-sm text-gray-500">by {training.instructor} • {training.category}</p>
              </div>
              <div className="flex items-center space-x-3">
                {training.certificate_id && (
                  <Link
                    href={`/certificates/${training.certificate_id}`}
                    className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Certificate
                  </Link>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  training.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : training.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {training.status === 'completed' ? 'Completed' :
                   training.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{training.completed_modules} of {training.total_modules} modules completed</span>
                <span>{training.progress_percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    training.progress_percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${training.progress_percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Last accessed: {new Date(training.last_accessed).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                {training.status === 'completed' && training.certificate_id ? (
                  <Link
                    href={`/certificates/${training.certificate_id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    View Certificate
                  </Link>
                ) : (
                  <Link
                    href={`/training/${training.training_id}/course`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    {training.status === 'not_started' ? 'Start Learning' : 'Continue Learning'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}