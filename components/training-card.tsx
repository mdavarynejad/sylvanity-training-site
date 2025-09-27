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

  const cardClasses = variant === 'featured'
    ? 'card border-2 border-blue-500 bg-blue-50'
    : 'card'

  const levelColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  }

  return (
    <div className={`${cardClasses} mobile-card-padding`}>
      {variant === 'featured' && (
        <div className="flex items-center mb-4">
          <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-medium mb-3 leading-tight">
          <Link
            href={`/trainings/${training.id}`}
            className="text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
          >
            {training.title}
          </Link>
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
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Instructor:</span>
          <span className="font-medium text-gray-900">{training.instructor}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Next Start:</span>
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
            <span className="font-medium text-blue-600">+{training.startDates.length - 1} more</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-medium text-gray-900">
            {formatPrice(training.price, training.currency)}
          </div>
          <div className="text-sm text-gray-600">per person</div>
        </div>

        <Link
          href={`/trainings/${training.id}`}
          className={`${
            isFull
              ? 'btn-secondary opacity-60 cursor-not-allowed'
              : 'btn-gradient-primary hover-gradient-lift'
          }`}
        >
          {isFull ? 'Waitlist' : 'View Details'}
        </Link>
      </div>
    </div>
  )
}