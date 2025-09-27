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
    <div className="page-section">
      {/* Filters */}
      {showFilters && (
        <div className="card p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-sm text-gray-600">
            Showing {filteredTrainings.length} of {trainings.length} trainings
          </div>
        </div>
      )}

      {/* Featured Trainings */}
      {featuredTrainings.length > 0 && (
        <div className="mb-20">
          <h2 className="text-3xl font-medium text-gray-900 mb-8">Featured Trainings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredTrainings.map(training => (
              <TrainingCard key={training.id} training={training} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* Regular Trainings */}
      {regularTrainings.length > 0 && (
        <div>
          <h2 className="text-3xl font-medium text-gray-900 mb-8">
            {featuredTrainings.length > 0 ? 'All Trainings' : 'Trainings'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularTrainings.map(training => (
              <TrainingCard key={training.id} training={training} />
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {filteredTrainings.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-6">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-3">No trainings found</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Try adjusting your search criteria or browse all available trainings.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
              setSelectedLevel('All Levels')
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}