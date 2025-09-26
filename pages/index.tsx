import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getFeaturedTestimonials, renderStars, Testimonial } from '@/lib/supabase-testimonials'
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

      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Sylvanity Training Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Elevate your skills with our comprehensive professional development programs.
            Expert-led training designed for your success.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/trainings"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Browse Trainings
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition inline-block"
            >
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Expert Instructors</h3>
              <p className="text-sm text-gray-600">
                Learn from industry professionals with years of experience
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-sm text-gray-600">
                Choose from various schedules that fit your availability
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-sm text-gray-600">
                Receive recognized certificates upon completion
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Participants Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real feedback from SME leaders who have transformed their businesses with our AI training programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md border">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 text-lg">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.testimonial}"
                  </blockquote>

                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.participantName}</div>
                    {testimonial.participantCompany && (
                      <div className="text-sm text-gray-600">{testimonial.participantCompany}</div>
                    )}
                    <div className="text-sm text-blue-600 mt-1">{testimonial.trainingTitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/trainings"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Join Our Success Stories
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