import { useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import ChangePasswordModal from '@/components/change-password-modal'

export default function SecuritySettings() {
  const { user } = useAuth()
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              <p className="text-sm text-gray-500">Manage your account security and authentication</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Password Management */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-900 mb-1">Password</h4>
                <p className="text-sm text-gray-500">
                  Change your password to keep your account secure
                </p>
              </div>
              <button
                onClick={() => setChangePasswordOpen(true)}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Email Verification Status */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-900 mb-1">Email Verification</h4>
                <p className="text-sm text-gray-500">
                  Your email address: <span className="font-medium">{user?.email}</span>
                </p>
              </div>
              <div className="ml-4">
                {user?.email_confirmed_at ? (
                  <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                ) : (
                  <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Pending
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Activity */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-900 mb-1">Account Activity</h4>
                <p className="text-sm text-gray-500">
                  Last signed in: {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Never'}
                </p>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-900 mb-1">Data & Privacy</h4>
                <p className="text-sm text-gray-500">
                  Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 bg-red-50 border-t border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-base font-medium text-red-900 mb-1">Danger Zone</h4>
                <p className="text-sm text-red-600">
                  Delete your account and all associated data permanently
                </p>
              </div>
              <button className="ml-4 px-4 py-2 btn-gradient-danger text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </>
  )
}