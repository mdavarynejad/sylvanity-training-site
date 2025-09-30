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

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow-sm border mobile-card-padding">
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