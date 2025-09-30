import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import TrainingList from '../components/training-list'
import { Training } from '@/lib/mock-data'
import { getTrainings } from '@/lib/supabase-training'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function TrainingsPage() {
  const router = useRouter()
  const { category } = router.query
  const [trainings, setTrainings] = useState<Training[]>([])
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'AI', label: 'AI & Technology' },
    { value: 'Leadership', label: 'Leadership & Management' },
    { value: 'Data', label: 'Data & Analytics' },
    { value: 'Strategy', label: 'Strategy & Planning' }
  ]

  useEffect(() => {
    loadTrainings()
  }, [])

  useEffect(() => {
    if (category && typeof category === 'string') {
      setSelectedCategory(category)
    }
  }, [category])

  useEffect(() => {
    filterTrainings()
  }, [trainings, selectedCategory])

  const loadTrainings = async () => {
    try {
      const data = await getTrainings()
      setTrainings(data)
    } catch (error) {
      console.error('Error loading trainings:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterTrainings = () => {
    if (selectedCategory === 'all') {
      setFilteredTrainings(trainings)
    } else {
      const filtered = trainings.filter(training =>
        training.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      )
      setFilteredTrainings(filtered)
    }
  }

  const handleCategoryChange = (categoryValue: string) => {
    setSelectedCategory(categoryValue)
    if (categoryValue === 'all') {
      router.push('/trainings', undefined, { shallow: true })
    } else {
      router.push(`/trainings?category=${categoryValue}`, undefined, { shallow: true })
    }
  }

  return (
    <>
      <Head>
        <title>AI Training Programs - Sylvanity Academy Platform</title>
        <meta name="description" content="Browse our comprehensive AI and technology training programs. Expert-led courses in artificial intelligence, machine learning, data analytics, and leadership development for SME professionals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sylvanity-training-site.netlify.app/trainings" />
        <meta property="og:title" content="AI Training Programs - Sylvanity Academy Platform" />
        <meta property="og:description" content="Browse our comprehensive AI and technology training programs. Expert-led courses in artificial intelligence, machine learning, data analytics, and leadership development for SME professionals." />
        <meta property="og:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />
        <meta property="og:site_name" content="Sylvanity Academy" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="AI Training Programs - Sylvanity Academy Platform" />
        <meta property="twitter:description" content="Browse our comprehensive AI and technology training programs. Expert-led courses in artificial intelligence, machine learning, data analytics, and leadership development for SME professionals." />
        <meta property="twitter:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />

        {/* Additional SEO */}
        <meta name="keywords" content="AI courses, machine learning training, data analytics programs, leadership development, professional training, SME education, artificial intelligence certification" />
        <link rel="canonical" href="https://sylvanity-training-site.netlify.app/trainings" />
      </Head>

      <div className="page-container">
        <Header />
      <div className="page-header">
        <div className="text-center">
          <h1 className="heading-page mb-6">Professional AI Training Programs</h1>
          <p className="text-subtitle max-w-3xl mx-auto">
            Empower your SME with cutting-edge AI knowledge and practical skills designed for business leaders and professionals
          </p>
        </div>
      </div>

      {/* Complete Training Overview - Full Width Hero */}
      <div className="w-full bg-gradient-to-r from-brand-sage to-brand-blue text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Complete Training Overview
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Download our comprehensive training brochure with all course details, schedules, and pricing information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/brochure"
                className="bg-white text-gray-900 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Training Brochure
              </a>
              <a
                href="/attachments/sylvanity-training-flyer-final.png"
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2"
                download="Sylvanity-Training-Programs-2025.png"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 mt-8 sm:mt-12">
        <div className="bg-white rounded-lg shadow-sm border mobile-card-padding pt-6 sm:pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'btn-gradient-primary text-white transform -translate-y-0.5'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {selectedCategory !== 'all' && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredTrainings.length} training{filteredTrainings.length !== 1 ? 's' : ''} in "{categories.find(c => c.value === selectedCategory)?.label}"
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border mobile-card-padding animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <TrainingList trainings={filteredTrainings} />
      )}

        <Footer />
      </div>
    </>
  )
}