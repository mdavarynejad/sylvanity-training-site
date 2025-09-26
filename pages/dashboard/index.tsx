import Head from 'next/head'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Sylvanity Training</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-4">
                The dashboard functionality is currently under development.
                You'll soon be able to view your training registrations, payment history, and certificates here.
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">Planned Features:</h3>
                  <ul className="mt-2 text-blue-800 text-sm list-disc list-inside">
                    <li>View registered trainings</li>
                    <li>Download certificates</li>
                    <li>Payment history</li>
                    <li>Update profile information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/trainings"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Trainings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}