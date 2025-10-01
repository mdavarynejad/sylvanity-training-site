import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase'
import EditProfileModal from '@/components/edit-profile-modal'
import ProgressTracker from '@/components/progress-tracker'
import SecuritySettings from '@/components/security-settings'

interface Booking {
  id: string
  training_id: string
  status: string
  payment_status: string
  created_at: string
  trainings: {
    title: string
    start_date: string
    price: number
    currency: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      console.log('Fetching user data for:', user?.id)

      // Clear existing profile state first
      setProfile(null)

      // Fetch user profile with a small delay to ensure database consistency
      await new Promise(resolve => setTimeout(resolve, 100))

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (profileError) {
        console.error('Profile fetch error:', profileError)

        // If profile doesn't exist, create it
        if (profileError.code === 'PGRST116') { // No rows returned
          console.log('Profile does not exist, creating new profile for user:', user?.id)
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user?.id,
              email: user?.email || '',
              full_name: '',
              company: ''
            })
            .select()
            .single()

          if (createError) {
            console.error('Error creating profile:', createError)
            throw createError
          }

          console.log('New profile created:', newProfile)
          setProfile(newProfile)
        } else {
          throw profileError
        }
      } else {
        console.log('Profile data fetched:', profileData)
        setProfile(profileData)
      }

      // Fetch user bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          trainings (
            title,
            start_date,
            price,
            currency
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      setBookings(bookingsData || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.')) {
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('You must be logged in to delete your account')
        return
      }

      const response = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        alert('Your account has been successfully deleted.')
        await signOut()
        router.push('/')
      } else {
        const errorData = await response.json()
        alert(`Failed to delete account: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Delete account error:', error)
      alert('An error occurred while deleting your account. Please try again.')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <Link href="/" className="text-lg sm:text-xl font-bold text-gradient-primary">
                Sylvanity Academy
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="btn-gradient-secondary text-sm px-4 py-2 hover-gradient-lift"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:px-0">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {profile?.full_name || user.email?.split('@')[0]}!</h1>
            <p className="mt-2 text-gray-600">Manage your training bookings and account</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Bookings Card */}
            <div className="group relative bg-gradient-to-br from-brand-sage/10 via-white to-brand-blue/10 overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:border-brand-sage transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-sage/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-sage to-brand-sage/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Total Bookings
                      </dt>
                      <dd className="text-3xl font-bold text-gray-900 group-hover:text-brand-sage transition-colors duration-300">
                        {bookings.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmed Bookings Card */}
            <div className="group relative bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Confirmed
                      </dt>
                      <dd className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                        {bookings.filter(b => b.status === 'confirmed').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Bookings Card */}
            <div className="group relative bg-gradient-to-br from-yellow-50 via-white to-amber-50 overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Pending
                      </dt>
                      <dd className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                        {bookings.filter(b => b.status === 'pending').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                My Bookings
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your training program bookings and their status
              </p>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
                <Link href="/trainings">
                  <span className="btn-gradient-primary hover-gradient-lift text-base inline-flex items-center justify-center gap-2 px-6 py-3 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Browse Trainings
                  </span>
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <li key={booking.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {booking.trainings.title}
                          </p>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <span>
                                Start Date: {new Date(booking.trainings.start_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                          <div className="flex">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            €{booking.trainings.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Training Progress Section */}
          <div className="mt-8">
            <ProgressTracker />
          </div>

          {/* Account Management Section */}
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account Management
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Profile Information</h4>
                    <p className="text-sm text-gray-500">
                      Name: {profile?.full_name || 'Not provided'}<br />
                      Email: {user?.email}<br />
                      Company: {profile?.company || 'Not provided'}
                      {/* Debug info - remove in production */}
                      <br /><small style={{color: '#999', fontSize: '10px'}}>
                        Debug: Profile ID: {profile?.id}, Updated: {profile?.updated_at}
                      </small>
                    </p>
                  </div>
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="btn-gradient-primary hover-gradient-lift px-4 py-2 text-sm"
                  >
                    Edit Profile
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Security Settings Section */}
          <div className="mt-8">
            <SecuritySettings />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        profile={profile}
        onUpdate={async () => {
          console.log('Profile update callback triggered')
          await fetchUserData()
          console.log('Profile data refreshed')
        }}
      />
    </div>
  )
}