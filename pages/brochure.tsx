import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function BrochurePage() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleDownload = (format: 'svg' | 'png') => {
    const link = document.createElement('a')
    if (format === 'svg') {
      link.href = '/attachments/sylvanity-training-flyer-final.svg'
      link.download = 'Sylvanity-Training-Programs-2025.svg'
    } else {
      link.href = '/attachments/sylvanity-training-flyer-final.png'
      link.download = 'Sylvanity-Training-Programs-2025.png'
    }
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Head>
        <title>Training Brochure - Sylvanity Professional AI Development Programs</title>
        <meta name="description" content="View and download our comprehensive training brochure with all AI development course details, schedules, and pricing information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-container">
        <Header />

        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-brand-sage to-brand-blue text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link href="/trainings">
                <div className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/20 mb-6 group cursor-pointer">
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back to Trainings</span>
                </div>
              </Link>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Training Brochure
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                Professional AI Development Programs 2025-2026
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => handleDownload('png')}
                  className="bg-white text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PNG
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Download SVG
                </button>
                <button
                  onClick={handleFullscreen}
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brochure Viewer */}
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-100 overflow-auto' : 'bg-gray-50 py-12'}`}>
          {isFullscreen && (
            <div className="sticky top-0 bg-white shadow-sm border-b z-10 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Training Brochure - Fullscreen View</h2>
                <button
                  onClick={handleFullscreen}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close
                </button>
              </div>
            </div>
          )}

          <div className={`${isFullscreen ? 'p-4 sm:p-8' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`${isFullscreen ? 'p-2 sm:p-4' : 'p-4 sm:p-6'}`}>
                <div className="flex justify-center">
                  <div className={`w-full ${isFullscreen ? 'max-w-4xl' : 'max-w-3xl'}`}>
                    <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                      <object
                        data="/attachments/sylvanity-training-flyer-final.svg"
                        type="image/svg+xml"
                        className="absolute inset-0 w-full h-full border border-gray-200 rounded-lg"
                        style={{ objectFit: 'contain' }}
                      >
                        <img
                          src="/attachments/sylvanity-training-flyer-final.png"
                          alt="Sylvanity Training Programs Brochure"
                          className="absolute inset-0 w-full h-full border border-gray-200 rounded-lg object-contain"
                        />
                      </object>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isFullscreen && (
          <div className="bg-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Skills?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our comprehensive AI development programs and advance your career with cutting-edge skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trainings">
                  <span className="btn-gradient-primary hover-gradient-lift text-base inline-block text-center cursor-pointer">
                    View All Trainings
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="btn-gradient-secondary hover-gradient-lift text-base inline-block text-center cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}