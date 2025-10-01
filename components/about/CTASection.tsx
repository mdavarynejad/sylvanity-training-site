import Link from 'next/link'

interface CTASectionProps {
  title: string
  description: string
  primaryLink: {
    href: string
    text: string
  }
  secondaryLink: {
    href: string
    text: string
  }
}

export default function CTASection({ title, description, primaryLink, secondaryLink }: CTASectionProps) {
  return (
    <div className="text-center bg-gray-50 rounded-2xl p-16">
      <h2 className="text-4xl font-medium text-gray-900 mb-6">
        {title}
      </h2>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={primaryLink.href}>
          <span className="btn-gradient-primary hover-gradient-lift text-base inline-block text-center cursor-pointer">
            {primaryLink.text}
          </span>
        </Link>
        <Link href={secondaryLink.href}>
          <span className="btn-gradient-secondary hover-gradient-lift text-base inline-block text-center cursor-pointer">
            {secondaryLink.text}
          </span>
        </Link>
      </div>
    </div>
  )
}