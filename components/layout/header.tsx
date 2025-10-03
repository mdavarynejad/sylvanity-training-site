import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [signingOut, setSigningOut] = useState(false)
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user || !supabase) return

    const { data } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    if (data) {
      setProfile(data)
    }
  }

  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Failed to sign out:', error)
    } finally {
      setSigningOut(false)
    }
  }

  const navigation = [
    { name: 'Trainings', href: '/trainings' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(href)
  }

  return (
    <header className="bg-white border-b-4 border-brand-sage sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center hover:opacity-75 transition-opacity duration-200">
              <img
                src="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png"
                alt="Sylvanity"
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#1f2937'
                    e.currentTarget.style.transform = 'scale(1)'
                  }
                }}
                className={`text-base font-bold px-4 py-2 rounded-lg border-2 border-transparent ${
                  isActive(item.href)
                    ? 'text-white bg-blue-600 border-blue-600'
                    : 'text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Login & CTA - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                    {profile?.full_name ? profile.full_name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:block">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link href="/dashboard">
                      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => setIsUserMenuOpen(false)}>
                        Dashboard
                      </div>
                    </Link>
                    <Link href="/dashboard">
                      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => setIsUserMenuOpen(false)}>
                        My Bookings
                      </div>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        handleSignOut()
                      }}
                      disabled={signingOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 flex items-center"
                    >
                      {signingOut ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-3 w-3 border-b border-gray-700 mr-2"></span>
                          Signing out...
                        </>
                      ) : (
                        'Sign Out'
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/signin">
                  <span className="flex items-center gap-2 text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </span>
                </Link>
                <span className="text-gray-300 text-xl mx-2">|</span>
              </>
            )}

            <Link href="/trainings">
              <span className="flex items-center gap-2 text-base font-semibold text-gray-800 hover:text-green-600 transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Browse Trainings
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`px-4 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4 px-4">
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-200 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                          {profile?.full_name ? profile.full_name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {profile?.full_name || user.email?.split('@')[0]}
                          </div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    <Link href="/dashboard">
                      <div
                        className="block w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 py-3 px-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </div>
                    </Link>
                    <Link href="/dashboard">
                      <div
                        className="block w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 py-3 px-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Bookings
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleSignOut()
                      }}
                      disabled={signingOut}
                      className="block w-full text-left text-sm font-medium text-red-600 hover:text-red-700 py-3 px-4 transition-colors duration-200 hover:bg-red-50 mt-2 disabled:opacity-50 flex items-center"
                    >
                      {signingOut ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-3 w-3 border-b border-red-600 mr-2"></span>
                          Signing out...
                        </>
                      ) : (
                        'Sign Out'
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <div
                        className="block w-full btn-gradient-secondary hover-gradient-lift text-white px-4 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300 cursor-pointer mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </div>
                    </Link>
                  </>
                )}
                <Link href="/trainings">
                  <div
                    className="block w-full btn-gradient-primary hover-gradient-lift text-white px-4 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300 cursor-pointer mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Trainings
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  )
}