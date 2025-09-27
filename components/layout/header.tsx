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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center hover:opacity-75 transition-opacity duration-200">
              <img
                src="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png"
                alt="Sylvanity"
                className="h-8 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-gradient-primary'
                    : 'text-gray-700 hover:text-gray-900'
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
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/trainings"
              className="btn-gradient-primary px-4 py-2 text-sm hover-gradient-lift"
            >
              Browse Trainings
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
                        className="block w-full text-center text-sm font-medium text-gray-700 hover:text-gray-900 py-3 cursor-pointer transition-colors duration-200 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </div>
                    </Link>
                  </>
                )}
                <Link href="/trainings">
                  <div
                    className="block w-full bg-gradient-primary hover-gradient-lift text-white px-4 py-3 rounded-lg text-sm font-medium text-center transition-all duration-300 cursor-pointer mt-2"
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