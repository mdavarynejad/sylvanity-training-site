import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/components/auth/auth-provider'
import { supabase } from '@/lib/supabase'

interface Certificate {
  id: string
  certificate_number: string
  issued_at: string
  valid_until: string
  certificate_data: {
    participant_name: string
    participant_email: string
    training_title: string
    training_description: string
    instructor: string
    completion_date: string
    total_modules: number
    certificate_number: string
    issued_date: string
  }
}

export default function CertificatePage() {
  const router = useRouter()
  const { id } = router.query
  const { user, loading: authLoading } = useAuth()
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchCertificate()
    }
  }, [id])

  const fetchCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError('Certificate not found')
        return
      }

      // Check if user has access to this certificate
      if (user && data.user_id !== user.id) {
        setError('Access denied')
        return
      }

      setCertificate(data)
    } catch (error) {
      console.error('Error fetching certificate:', error)
      setError('Failed to load certificate')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    // For now, we'll create a simple download of the HTML as PDF
    // In a production environment, you'd want to use a service like Puppeteer or similar
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${certificate?.certificate_data.certificate_number}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 0; padding: 40px; background: white; }
            .certificate { max-width: 800px; margin: 0 auto; border: 8px solid #2563eb; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 48px; color: #2563eb; margin: 20px 0; font-weight: bold; }
            .subtitle { font-size: 24px; color: #374151; margin: 10px 0; }
            .content { text-align: center; line-height: 1.8; }
            .participant { font-size: 32px; color: #1f2937; margin: 30px 0; font-weight: bold; }
            .training { font-size: 24px; color: #2563eb; margin: 20px 0; font-style: italic; }
            .details { margin: 30px 0; font-size: 16px; color: #6b7280; }
            .signature { display: flex; justify-content: space-between; margin-top: 60px; }
            .signature-block { text-align: center; }
            .signature-line { border-top: 2px solid #374151; width: 200px; margin: 20px auto 5px; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="title">CERTIFICATE OF COMPLETION</div>
              <div class="subtitle">Sylvanity Training</div>
            </div>

            <div class="content">
              <p style="font-size: 20px;">This is to certify that</p>
              <div class="participant">${certificate?.certificate_data.participant_name}</div>
              <p style="font-size: 20px;">has successfully completed the training program</p>
              <div class="training">${certificate?.certificate_data.training_title}</div>

              <div class="details">
                <p>Instructor: ${certificate?.certificate_data.instructor}</p>
                <p>Completion Date: ${new Date(certificate?.certificate_data.completion_date || '').toLocaleDateString()}</p>
                <p>Total Modules Completed: ${certificate?.certificate_data.total_modules}</p>
                <p>Certificate Number: ${certificate?.certificate_data.certificate_number}</p>
              </div>

              <div class="signature">
                <div class="signature-block">
                  <div class="signature-line"></div>
                  <p>Training Director</p>
                  <p>Sylvanity Training</p>
                </div>
                <div class="signature-block">
                  <div class="signature-line"></div>
                  <p>Issue Date</p>
                  <p>${new Date(certificate?.certificate_data.issued_date || '').toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>

            <div className="flex space-x-4">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white shadow-xl border-8 border-blue-600 p-12 print:shadow-none print:border-8 print:border-blue-600">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-600 mb-4">CERTIFICATE OF COMPLETION</h1>
            <h2 className="text-2xl text-gray-700">Sylvanity Training</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {/* Content */}
          <div className="text-center space-y-8">
            <p className="text-xl text-gray-700">This is to certify that</p>

            <div className="text-4xl font-bold text-gray-900 py-4 border-b-2 border-gray-200">
              {certificate.certificate_data.participant_name}
            </div>

            <p className="text-xl text-gray-700">has successfully completed the training program</p>

            <div className="text-3xl font-semibold text-blue-600 italic py-4">
              {certificate.certificate_data.training_title}
            </div>

            {/* Details */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-gray-600">
              <p><span className="font-semibold">Instructor:</span> {certificate.certificate_data.instructor}</p>
              <p><span className="font-semibold">Completion Date:</span> {new Date(certificate.certificate_data.completion_date).toLocaleDateString()}</p>
              <p><span className="font-semibold">Total Modules Completed:</span> {certificate.certificate_data.total_modules}</p>
              <p><span className="font-semibold">Certificate Number:</span> {certificate.certificate_data.certificate_number}</p>
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-end mt-16 pt-8">
              <div className="text-center">
                <div className="w-48 border-t-2 border-gray-800 mb-2"></div>
                <p className="text-sm text-gray-600">Training Director</p>
                <p className="text-sm text-gray-600">Sylvanity Training</p>
              </div>

              <div className="text-center">
                <div className="w-48 border-t-2 border-gray-800 mb-2"></div>
                <p className="text-sm text-gray-600">Issue Date</p>
                <p className="text-sm text-gray-600">{new Date(certificate.certificate_data.issued_date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Validation Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                This certificate is valid until {new Date(certificate.valid_until).toLocaleDateString()}<br/>
                Certificate ID: {certificate.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}