import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase'

interface TrainingModule {
  id: string
  title: string
  description: string
  content: string
  video_url?: string
  duration_minutes: number
  order_index: number
  is_mandatory: boolean
}

interface UserProgress {
  id: string
  module_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress_percentage: number
  time_spent_minutes: number
  completed_at?: string
}

interface Training {
  id: string
  title: string
  description: string
  instructor: string
  category: string
  level: string
}

export default function TrainingCoursePage() {
  const router = useRouter()
  const { id } = router.query
  const { user, loading: authLoading } = useAuth()
  const [training, setTraining] = useState<Training | null>(null)
  const [modules, setModules] = useState<TrainingModule[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (id && user) {
      checkAccessAndLoadCourse()
    }
  }, [id, user])

  const checkAccessAndLoadCourse = async () => {
    try {
      // Check if user has booked this training
      const { data: booking } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .eq('training_id', id)
        .eq('status', 'confirmed')
        .single()

      if (!booking) {
        setHasAccess(false)
        setLoading(false)
        return
      }

      setHasAccess(true)

      // Load training details
      const { data: trainingData } = await supabase
        .from('trainings')
        .select('*')
        .eq('id', id)
        .single()

      setTraining(trainingData)

      // Load modules
      const { data: modulesData } = await supabase
        .from('training_modules')
        .select('*')
        .eq('training_id', id)
        .order('order_index')

      setModules(modulesData || [])

      // Load user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('training_id', id)

      setProgress(progressData || [])

      // Set first module as current if no progress exists
      if (modulesData && modulesData.length > 0) {
        const firstIncompleteModule = modulesData.find(module => {
          const moduleProgress = progressData?.find(p => p.module_id === module.id)
          return !moduleProgress || moduleProgress.status !== 'completed'
        })
        setCurrentModuleId(firstIncompleteModule?.id || modulesData[0].id)
      }

    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const getModuleProgress = (moduleId: string) => {
    return progress.find(p => p.module_id === moduleId)
  }

  const updateProgress = async (moduleId: string, status: 'in_progress' | 'completed', progressPercentage: number = 100) => {
    try {
      const existingProgress = getModuleProgress(moduleId)

      const progressData = {
        user_id: user?.id,
        training_id: id,
        module_id: moduleId,
        status,
        progress_percentage: progressPercentage,
        completed_at: status === 'completed' ? new Date().toISOString() : null
      }

      if (existingProgress) {
        await supabase
          .from('user_progress')
          .update(progressData)
          .eq('id', existingProgress.id)
      } else {
        await supabase
          .from('user_progress')
          .insert(progressData)
      }

      // Reload progress
      const { data: updatedProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('training_id', id)

      setProgress(updatedProgress || [])

    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const markModuleComplete = async (moduleId: string) => {
    await updateProgress(moduleId, 'completed', 100)

    // Check if all modules are now completed
    const updatedProgress = [...progress]
    const existingProgressIndex = updatedProgress.findIndex(p => p.module_id === moduleId)
    if (existingProgressIndex >= 0) {
      updatedProgress[existingProgressIndex] = { ...updatedProgress[existingProgressIndex], status: 'completed' }
    } else {
      updatedProgress.push({
        id: '',
        module_id: moduleId,
        status: 'completed',
        progress_percentage: 100,
        time_spent_minutes: 0
      })
    }

    const completedCount = updatedProgress.filter(p => p.status === 'completed').length

    // If all modules completed, generate certificate
    if (completedCount === modules.length) {
      await generateCertificate()
    }

    // Move to next module
    const currentIndex = modules.findIndex(m => m.id === moduleId)
    if (currentIndex < modules.length - 1) {
      setCurrentModuleId(modules[currentIndex + 1].id)
    }
  }

  const generateCertificate = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const response = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          training_id: id
        })
      })

      const result = await response.json()

      if (result.success) {
        // Show success message and option to view certificate
        alert('Congratulations! You have completed the training. Your certificate has been generated.')

        // Optionally redirect to certificate or dashboard
        setTimeout(() => {
          router.push(`/certificates/${result.certificate.id}`)
        }, 2000)
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
    }
  }

  const calculateOverallProgress = () => {
    if (modules.length === 0) return 0
    const completedModules = progress.filter(p => p.status === 'completed').length
    return Math.round((completedModules / modules.length) * 100)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to enroll in this training to access the course content.</p>
          <Link
            href={`/training/${id}`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Training Details
          </Link>
        </div>
      </div>
    )
  }

  const currentModule = modules.find(m => m.id === currentModuleId)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{training?.title}</h1>
                <p className="text-sm text-gray-500">by {training?.instructor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progress: {calculateOverallProgress()}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateOverallProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Course Modules</h2>
                <p className="text-sm text-gray-500">{modules.length} modules</p>
              </div>
              <div className="divide-y">
                {modules.map((module, index) => {
                  const moduleProgress = getModuleProgress(module.id)
                  const isCompleted = moduleProgress?.status === 'completed'
                  const isCurrent = module.id === currentModuleId

                  return (
                    <button
                      key={module.id}
                      onClick={() => setCurrentModuleId(module.id)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        isCurrent ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isCompleted
                            ? 'bg-green-100 text-green-800'
                            : isCurrent
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isCurrent ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {module.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {module.duration_minutes} min
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentModule ? (
              <div className="bg-white rounded-lg shadow-sm border">
                {/* Module Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{currentModule.title}</h1>
                      <p className="text-gray-600 mt-1">{currentModule.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>⏱️ {currentModule.duration_minutes} minutes</span>
                        {currentModule.is_mandatory && <span>📋 Required</span>}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {getModuleProgress(currentModule.id)?.status !== 'completed' && (
                        <button
                          onClick={() => markModuleComplete(currentModule.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  {currentModule.video_url && (
                    <div className="mb-6">
                      <iframe
                        src={currentModule.video_url}
                        className="w-full h-64 md:h-96 rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  )}

                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: currentModule.content || 'Content coming soon...' }} />
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-6 border-t bg-gray-50">
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        const currentIndex = modules.findIndex(m => m.id === currentModuleId)
                        if (currentIndex > 0) {
                          setCurrentModuleId(modules[currentIndex - 1].id)
                        }
                      }}
                      disabled={modules.findIndex(m => m.id === currentModuleId) === 0}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={() => {
                        const currentIndex = modules.findIndex(m => m.id === currentModuleId)
                        if (currentIndex < modules.length - 1) {
                          setCurrentModuleId(modules[currentIndex + 1].id)
                        }
                      }}
                      disabled={modules.findIndex(m => m.id === currentModuleId) === modules.length - 1}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <p className="text-gray-500">Select a module to begin learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}