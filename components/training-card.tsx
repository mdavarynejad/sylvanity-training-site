import Link from 'next/link'
import { Training, formatPrice, formatDate } from '@/lib/mock-data'

interface TrainingCardProps {
  training: Training
  variant?: 'default' | 'featured'
}

export default function TrainingCard({ training, variant = 'default' }: TrainingCardProps) {
  const availableSpots = training.maxParticipants - training.currentParticipants
  const isAlmostFull = availableSpots <= 3
  const isFull = availableSpots === 0
  const isUpcoming = training.upcoming || false

  // Generate animation pattern based on training ID for variety
  const animationPattern = training.id % 3

  // Design Pattern: State Pattern - Different card states
  const getCardClasses = () => {
    if (isUpcoming) {
      return 'card training-card-interactive border-2 border-dashed border-gray-300 bg-gray-50 opacity-75'
    }
    if (variant === 'featured') {
      return 'card training-card-interactive border-2 border-blue-500 bg-blue-50'
    }
    return 'card training-card-interactive'
  }

  const cardClasses = getCardClasses()

  const levelColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  }

  return (
    <div className={`${cardClasses} mobile-card-padding group bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-2xl cursor-pointer relative overflow-hidden transition-all duration-300`}>
      {/* Animated Background Gradient Overlay - Following landing page pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating Particles Effect - Pattern 0 (Blue theme) */}
      {animationPattern === 0 && (
        <>
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-bounce transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
        </>
      )}

      {/* Floating Particles Effect - Pattern 1 (Green theme) */}
      {animationPattern === 1 && (
        <>
          <div className="absolute top-6 right-6 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:translate-x-1" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute top-10 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:translate-x-2" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
        </>
      )}

      {/* Floating Particles Effect - Pattern 2 (Yellow/Orange theme) */}
      {animationPattern === 2 && (
        <>
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-amber-300 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-opacity duration-300" style={{animationDelay: '0.6s'}}></div>
        </>
      )}

      {/* Content wrapper for proper z-index */}
      <div className="relative z-10">
        {/* Design Pattern: Template Method - Badge rendering strategy */}
        {variant === 'featured' && !isUpcoming && (
          <div className="flex items-center mb-4">
            <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full training-card-icon">
              Featured
            </span>
          </div>
        )}

        {isUpcoming && (
          <div className="flex items-center mb-4">
            <span className="bg-gray-500 text-white text-xs font-medium px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
        )}

      <div className="mb-4">
        <h3 className="text-xl font-medium mb-3 leading-tight">
          {isUpcoming ? (
            <span className="text-gray-900 cursor-default">
              {training.title}
            </span>
          ) : (
            <Link href={`/trainings/${training.id}`}>
              <span className="text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                {training.title}
              </span>
            </Link>
          )}
        </h3>
        <p className="text-gray-600 leading-relaxed line-clamp-2">
          {training.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelColors[training.level]}`}>
          {training.level}
        </span>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {training.category}
        </span>
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {training.duration}
        </span>
      </div>

      {/* Tags */}
      {training.tags && training.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {training.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
            {training.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{training.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm group/info">
          <span className="text-gray-600 flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400 group-hover/info:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Next Start:
          </span>
          <span className="font-medium text-gray-900">
            {training.startDates && training.startDates.length > 0
              ? formatDate(training.startDates[0])
              : training.startDate
              ? formatDate(training.startDate)
              : 'TBD'
            }
          </span>
        </div>
        {training.startDates && training.startDates.length > 1 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">More Dates:</span>
            <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">+{training.startDates.length - 1} more</span>
          </div>
        )}
        <div className="flex justify-between text-sm group/seats">
          <span className="text-gray-600 flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400 group-hover/seats:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Max Seats:
          </span>
          <span className="font-medium text-gray-900">{training.maxParticipants}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-medium text-gray-900">
            {formatPrice(training.price, training.currency)}
          </div>
          <div className="text-sm text-gray-600">per session</div>
        </div>

        <Link href={`/trainings/${training.id}`}>
          <span className={`${
            isFull
              ? 'btn-secondary opacity-60 cursor-not-allowed'
              : 'btn-gradient-primary hover-gradient-lift'
          } cursor-pointer`}>
            {isFull ? 'Waitlist' : 'View Details'}
          </span>
        </Link>
      </div>
      </div>
    </div>
  )
}