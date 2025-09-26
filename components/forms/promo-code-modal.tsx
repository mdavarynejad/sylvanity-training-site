import { useState } from 'react'

interface PromoCodeModalProps {
  promoCode: string
  onClose: () => void
  trainingTitle?: string
}

export default function PromoCodeModal({ promoCode, onClose, trainingTitle }: PromoCodeModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promoCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = promoCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 text-center">
          <div className="text-green-600 text-6xl mb-4">🎉</div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>

          <p className="text-gray-600 mb-6">
            {trainingTitle ? (
              <>We've sent you more information about <strong>{trainingTitle}</strong> to your email.</>
            ) : (
              <>We've sent you the training information to your email.</>
            )}
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Your Special Discount Code:</strong>
            </p>

            <div className="flex items-center justify-center gap-2 mb-3">
              <code className="text-2xl font-mono font-bold text-blue-600 bg-white px-4 py-2 rounded border-2 border-dashed border-blue-300">
                {promoCode}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Use this code during checkout to get your discount. Valid for 30 days.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue Browsing
            </button>

            <p className="text-xs text-gray-500">
              We'll also send this promo code to your email so you don't lose it!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}