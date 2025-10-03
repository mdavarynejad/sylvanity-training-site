import { useState } from 'react'

interface PromoCodeModalProps {
  promoCode: string
  onClose: () => void
  trainingTitle?: string
}

export default function PromoCodeModal({ promoCode, onClose, trainingTitle }: PromoCodeModalProps) {
  const [copied, setCopied] = useState(false)

  // Map training titles to their PDF attachments
  const getPdfUrl = (title?: string): string | null => {
    if (!title) return null

    const pdfMap: { [key: string]: string } = {
      'AI & Prompt Engineering Workshop': '/attachments/ai-prompt-engineering-syllabus.pdf',
      'AI-Powered Business Automation': '/attachments/automation-playbook.pdf',
      'Agentic AI Workshop': '/attachments/agentic-ai-blueprint.pdf',
      'Change Management in the AI Era': '/attachments/change-management-toolkit.pdf',
      'Practical Data Analysis for SMEs': '/attachments/data-analysis-workbook.pdf'
    }

    return pdfMap[title] || null
  }

  const pdfUrl = getPdfUrl(trainingTitle)

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

          <p className="text-gray-600 mb-4">
            {trainingTitle ? (
              <>We've sent you more information about <strong>{trainingTitle}</strong> to your email.</>
            ) : (
              <>We've sent you the training information to your email.</>
            )}
          </p>

          {pdfUrl && (
            <div className="mb-6">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-blue transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Complete Syllabus
              </a>
            </div>
          )}

          <div className="bg-gradient-to-r from-brand-sage/10 to-brand-blue/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Your Special Discount Code:</strong>
            </p>

            <div className="flex items-center justify-center gap-2 mb-3">
              <code className="text-2xl font-mono font-bold text-brand-sage bg-white px-4 py-2 rounded border-2 border-dashed border-brand-sage/30">
                {promoCode}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-brand-sage text-white rounded hover:bg-brand-blue transition text-sm"
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
              className="w-full px-4 py-2 btn-gradient-primary hover-gradient-lift"
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