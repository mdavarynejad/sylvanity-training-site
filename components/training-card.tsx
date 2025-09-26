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
    ? 'border-2 border-blue-500 bg-blue-50'
    : 'border border-gray-200 hover:border-gray-300'

  const levelColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800'
  }

  return (
    <div className={`${cardClasses} rounded-lg p-6 transition-all duration-200 hover:shadow-lg`}>
      {variant === 'featured' && (
        <div className="flex items-center mb-3">
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {training.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {training.description}
          </p>
        </div>
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

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Instructor:</span>
          <span className="font-medium">{training.instructor}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Next Start:</span>
          <span className="font-medium">
            {training.startDates && training.startDates.length > 0
              ? formatDate(training.startDates[0])
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
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Available Spots:</span>
          <span className={`font-medium ${isAlmostFull ? 'text-orange-600' : isFull ? 'text-red-600' : 'text-green-600'}`}>
            {isFull ? 'Full' : `${availableSpots} left`}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(training.price, training.currency)}
          </div>
          <div className="text-sm text-gray-500">per person</div>
        </div>

        <Link
          href={`/trainings/${training.id}`}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isFull
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isFull ? 'Waitlist' : 'View Details'}
        </Link>
      </div>
    </div>
  )
}