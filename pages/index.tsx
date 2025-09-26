import Head from 'next/head'
import Link from 'next/link'

export default function HomePage() {
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
              href="/about"
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition inline-block"
            >
              Learn More
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
        </div>
      </div>
    </>
  )
}