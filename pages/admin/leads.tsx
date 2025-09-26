import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCurrentAdminUser, AdminUser } from '@/lib/admin/auth'

interface Lead {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  interestedTrainingId?: string
  promoCode?: string
  message?: string
  source: string
  createdAt: string
}

// Mock leads data for demo
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    company: 'Tech Innovations Inc',
    phone: '+1 (555) 123-4567',
    interestedTrainingId: '1',
    promoCode: 'LEAD2024',
    message: 'Interested in leadership training for our management team',
    source: 'training_page',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@startup.co',
    company: 'StartupCo',
    interestedTrainingId: '2',
    promoCode: 'LEAD2025',
    message: 'Looking for AI training for our development team',
    source: 'training_page',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@enterprise.com',
    company: 'Enterprise Solutions',
    phone: '+1 (555) 987-6543',
    promoCode: 'LEAD2026',
    message: 'Need data analytics training for multiple departments',
    source: 'footer',
    createdAt: '2024-01-13T09:15:00Z'
  }
]

export default function AdminLeads() {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'training_page' | 'footer'>('all')

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
      loadLeads()
    } catch (err) {
      console.error('Admin access error:', err)
      setError('Failed to load admin dashboard')
      router.push('/auth/signin?message=Admin access required')
    } finally {
      setLoading(false)
    }
  }

  const loadLeads = () => {
    // In a real implementation, this would fetch from the database
    setLeads(mockLeads)
  }

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true
    return lead.source === filter
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportLeads = () => {
    // Simple CSV export functionality
    const csvContent = [
      ['Name', 'Email', 'Company', 'Phone', 'Promo Code', 'Source', 'Created At'],
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.company || '',
        lead.phone || '',
        lead.promoCode || '',
        lead.source,
        formatDate(lead.createdAt)
      ])
    ].map(row => row.join(',')).join('\\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
                Lead Management
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
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">All Leads</h2>
            <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              {filteredLeads.length} leads
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'training_page' | 'footer')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sources</option>
              <option value="training_page">Training Pages</option>
              <option value="footer">Newsletter Footer</option>
            </select>

            <button
              onClick={exportLeads}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promo Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="text-sm text-gray-500">
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.promoCode ? (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {lead.promoCode}
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        lead.source === 'training_page'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {lead.source === 'training_page' ? 'Training Page' : 'Newsletter'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => alert(`Message: ${lead.message || 'No message provided'}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            const mailto = `mailto:${lead.email}?subject=Follow up from Sylvanity Training&body=Hi ${lead.name},%0D%0A%0D%0AThank you for your interest in our training programs.`
                            window.open(mailto)
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all'
                  ? 'No leads have been submitted yet.'
                  : `No leads from ${filter.replace('_', ' ')} found.`
                }
              </p>
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
                  This shows mock lead data. Real leads will be stored in the database when you configure Supabase and submit forms through the website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}