import { useState } from 'react'
import TrainingCard from './training-card'
import { Training, categories, levels, getTrainingsByCategory, getTrainingsByLevel } from '@/lib/mock-data'

interface TrainingListProps {
  trainings: Training[]
  showFilters?: boolean
  title?: string
  subtitle?: string
}

export default function TrainingList({
  trainings,
  showFilters = true,
  title = 'Available Trainings',
  subtitle = 'Choose from our comprehensive catalog of professional development programs'
}: TrainingListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter trainings based on selected filters and search term
  const filteredTrainings = trainings.filter(training => {
    const matchesCategory = selectedCategory === 'All' || training.category === selectedCategory
    const matchesLevel = selectedLevel === 'All Levels' || training.level === selectedLevel
    const matchesSearch = searchTerm === '' ||
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesCategory && matchesLevel && matchesSearch
  })

  const featuredTrainings = filteredTrainings.filter(training => training.featured)
  const regularTrainings = filteredTrainings.filter(training => !training.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Trainings
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or tags..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                id="level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTrainings.length} of {trainings.length} trainings
          </div>
        </div>
      )}

      {/* Featured Trainings */}
      {featuredTrainings.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Trainings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredTrainings.map(training => (
              <TrainingCard key={training.id} training={training} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* Regular Trainings */}
      {regularTrainings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {featuredTrainings.length > 0 ? 'All Trainings' : 'Trainings'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularTrainings.map(training => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {filteredTrainings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trainings found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or browse all available trainings.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
              setSelectedLevel('All Levels')
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}