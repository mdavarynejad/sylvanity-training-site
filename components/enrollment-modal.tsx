import { useState, useEffect } from 'react'
import { Training, formatPrice, formatDate } from '@/lib/mock-data'

interface EnrollmentModalProps {
  training: Training
  isOpen: boolean
  onClose: () => void
  onProceedToPayment: (enrollmentData: EnrollmentData) => void
  onValidatePromoCode: (code: string) => Promise<{ valid: boolean; discount_percent?: number; message?: string }>
}

export interface EnrollmentData {
  selectedDate: string
  promoCode: string
  discount: number
  dataConsent: boolean
  marketingConsent: boolean
}

export default function EnrollmentModal({
  training,
  isOpen,
  onClose,
  onProceedToPayment,
  onValidatePromoCode
}: EnrollmentModalProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [validatingPromo, setValidatingPromo] = useState(false)
  const [dataConsent, setDataConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  // Set default date if no dates are available
  useEffect(() => {
    if (!training.startDates || training.startDates.length === 0) {
      setSelectedDate('tbd')
    }
  }, [training.startDates])

  const validatePromoCode = async (code: string) => {
    if (!code.trim()) {
      setDiscount(0)
      setPromoError('')
      return
    }

    setValidatingPromo(true)
    setPromoError('')

    try {
      const result = await onValidatePromoCode(code.trim().toUpperCase())

      if (result.valid && result.discount_percent) {
        setDiscount(result.discount_percent)
        setPromoError('')
      } else {
        setDiscount(0)
        setPromoError(result.message || 'Invalid promo code')
      }
    } catch (error) {
      console.error('Error validating promo code:', error)
      setDiscount(0)
      setPromoError('Error validating promo code')
    } finally {
      setValidatingPromo(false)
    }
  }

  const handleProceed = () => {
    if (!selectedDate) {
      alert('Please select a training date')
      return
    }

    if (!dataConsent) {
      alert('Please consent to data processing to continue')
      return
    }

    onProceedToPayment({
      selectedDate,
      promoCode: promoCode.trim().toUpperCase(),
      discount,
      dataConsent,
      marketingConsent
    })
  }

  const finalPrice = training.price * (1 - discount / 100)
  const savings = training.price - finalPrice

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Complete Your Enrollment</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2">{training.title}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Training Price:</span>
                <span className={discount > 0 ? 'line-through text-gray-500' : 'font-semibold text-gray-900'}>
                  {formatPrice(training.price, training.currency)}
                </span>
              </div>

              {discount > 0 && (
                <>
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%):</span>
                    <span>-{formatPrice(savings, training.currency)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total Price:</span>
                    <span className="font-bold text-2xl text-green-600">
                      {formatPrice(finalPrice, training.currency)}
                    </span>
                  </div>
                </>
              )}

              {discount === 0 && (
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total Price:</span>
                  <span className="font-bold text-2xl text-blue-600">
                    {formatPrice(training.price, training.currency)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Training Date</h3>
            <div className="space-y-3">
              {training.startDates && training.startDates.length > 0 ? (
                training.startDates.map((date, index) => (
                  <label key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="trainingDate"
                      value={date}
                      checked={selectedDate === date}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{formatDate(date)}</div>
                      <div className="text-sm text-gray-600">{training.duration}</div>
                    </div>
                  </label>
                ))
              ) : (
                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <p className="text-yellow-800">Training dates will be announced soon. You can enroll now and we'll notify you once dates are available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Promo Code (Optional)</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase())
                    if (promoError) setPromoError('')
                  }}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                />
                <button
                  onClick={() => validatePromoCode(promoCode)}
                  disabled={validatingPromo || !promoCode.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {validatingPromo ? 'Checking...' : 'Apply'}
                </button>
              </div>

              {promoError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{promoError}</div>
              )}

              {discount > 0 && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  ✓ Promo code "{promoCode}" applied - {discount}% discount!
                </div>
              )}
            </div>
          </div>

          {/* Data Consent */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Consent</h3>
            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={dataConsent}
                  onChange={(e) => setDataConsent(e.target.checked)}
                  className="mt-1 text-blue-600"
                  required
                />
                <div className="text-sm">
                  <span className="text-gray-900">
                    I consent to the processing of my personal data for enrollment and training delivery purposes. *
                  </span>
                  <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="text-blue-600 hover:text-blue-700 ml-1"
                  >
                    View Details
                  </button>
                </div>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1 text-blue-600"
                />
                <span className="text-sm text-gray-900">
                  I would like to receive updates about new training programs and special offers (optional)
                </span>
              </label>

              {showTerms && (
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                  <h4 className="font-semibold mb-2">Data Processing Information:</h4>
                  <ul className="space-y-1">
                    <li>• Your data will be used to process your enrollment and deliver training services</li>
                    <li>• We'll store your contact information for course completion certificates</li>
                    <li>• Payment information is processed securely through our payment provider</li>
                    <li>• You can request data deletion at any time by contacting support@sylvanity.eu</li>
                    <li>• We comply with GDPR and other applicable data protection regulations</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Training Details Summary */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-4">Training Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-blue-700">Duration:</span>
                <span className="ml-2 text-blue-900">{training.duration}</span>
              </div>
              <div>
                <span className="text-blue-700">Level:</span>
                <span className="ml-2 text-blue-900">{training.level}</span>
              </div>
              <div>
                <span className="text-blue-700">Format:</span>
                <span className="ml-2 text-blue-900">{training.format || 'Interactive Workshop'}</span>
              </div>
              <div>
                <span className="text-blue-700">Certificate:</span>
                <span className="ml-2 text-blue-900">✓ Included</span>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-6">
              <h5 className="text-lg font-semibold text-blue-900 mb-4">Training Location & Delivery</h5>
              <p className="text-blue-800 mb-6 leading-relaxed">
                One of our employees will contact you to agree on the optimal training location. Choose from our flexible delivery options:
              </p>

              <div className="grid gap-4">
                {/* In-house Location */}
                <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-gray-900 mb-2">Our Training Center</h6>
                      <p className="text-gray-600 text-sm mb-3">
                        Treubstraat 19-23, Rijswijk<br />
                        <span className="text-xs text-gray-500">Plaspoelpolder business district, between Delft and Den Haag</span>
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="text-xs font-medium text-gray-700">By Car</span>
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>5 min from Prins Clausplein</li>
                            <li>Direct A4, A12, A13 access</li>
                            <li>10 min from TU Delft</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <span className="text-xs font-medium text-gray-700">Public Transit</span>
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>Near Rijswijk station</li>
                            <li>Tram 17, Bus 30 & 23</li>
                            <li>Multiple connections</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Online Delivery */}
                <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold text-gray-900 mb-2">Online Delivery</h6>
                      <p className="text-gray-600 text-sm">
                        Interactive virtual training sessions with full instructor support and digital materials
                      </p>
                    </div>
                  </div>
                </div>

                {/* On-site Delivery */}
                <div className="bg-white rounded-xl p-6 border border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-semibold text-gray-900 mb-2">At Your Location</h6>
                      <p className="text-gray-600 text-sm">
                        We come to your office anywhere in the Netherlands with all necessary training materials
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={!dataConsent || (!selectedDate && training.startDates?.length > 0)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Proceed to Payment
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 text-xs text-gray-500 pt-4 border-t">
            <div className="flex items-center">
              <span className="text-green-600 mr-1">🔒</span>
              Secure Payment
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-1">💰</span>
              Money-Back Guarantee
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-1">📧</span>
              Instant Confirmation
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}