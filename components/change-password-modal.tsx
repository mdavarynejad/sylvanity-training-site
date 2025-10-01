import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-provider'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (!supabase || !user) {
        throw new Error('Authentication required')
      }

      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (formData.newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Note: We skip current password verification in this implementation
      // as it would require re-authentication flow. For enhanced security,
      // consider implementing the secure password change option in Supabase settings.

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword
      })

      if (updateError) {
        throw updateError
      }

      setMessage({ type: 'success', text: 'Password updated successfully!' })
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })

      // Close modal after showing success message
      setTimeout(() => {
        onClose()
        setMessage(null)
      }, 2000)

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password' })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setMessage(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your current password"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your new password"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your new password"
                required
                minLength={6}
              />
            </div>

            {/* Password strength indicator */}
            {formData.newPassword && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Password Strength:</div>
                <div className="space-y-1">
                  <div className={`text-xs ${formData.newPassword.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                    ✓ At least 6 characters
                  </div>
                  <div className={`text-xs ${/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-400'}`}>
                    ✓ Contains uppercase letter (recommended)
                  </div>
                  <div className={`text-xs ${/[0-9]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-400'}`}>
                    ✓ Contains number (recommended)
                  </div>
                </div>
              </div>
            )}

            {/* Password match indicator */}
            {formData.confirmPassword && (
              <div className={`text-xs ${formData.newPassword === formData.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {formData.newPassword === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || formData.newPassword !== formData.confirmPassword || formData.newPassword.length < 6}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}