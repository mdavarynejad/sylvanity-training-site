import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getFeaturedTestimonials, renderStars, Testimonial } from '@/lib/supabase-testimonials'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

interface HomePageProps {
  featuredTestimonials: Testimonial[]
}

export default function HomePage({ featuredTestimonials }: HomePageProps) {

  return (
    <>
      <Head>
        <title>Sylvanity Training Platform</title>
        <meta name="description" content="Professional development programs for your success" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-normal text-gray-900 mb-6 leading-tight">
              Sylvanity Training Platform
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Elevate your skills with our comprehensive professional development programs.
              Expert-led training designed for your success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="/trainings">
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium transition-colors duration-200 cursor-pointer">
                  Browse Trainings
                </div>
              </Link>
              <Link href="/auth/signin">
                <div className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer">
                  Sign In
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of experience
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Flexible Schedule</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from various schedules that fit your availability
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Certification</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive recognized certificates upon completion
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-normal text-gray-900 mb-4">What Our Participants Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real feedback from SME leaders who have transformed their businesses with our AI training programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-6">
                    <div className="text-yellow-500 text-sm">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.testimonial}"
                  </blockquote>

                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-medium text-gray-900">{testimonial.participantName}</div>
                    {testimonial.participantCompany && (
                      <div className="text-sm text-gray-600 mt-1">{testimonial.participantCompany}</div>
                    )}
                    <div className="text-sm text-blue-600 mt-2">{testimonial.trainingTitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/trainings">
                <div className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-medium transition-colors duration-200 cursor-pointer">
                  Join Our Success Stories
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredTestimonials = await getFeaturedTestimonials()

  return {
    props: {
      featuredTestimonials,
    },
    revalidate: 300, // Revalidate every 5 minutes
  }
}