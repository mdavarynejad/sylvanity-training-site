import Link from 'next/link'
import Head from 'next/head'

export default function CheckoutCancel() {
  return (
    <>
      <Head>
        <title>Payment Cancelled - Sylvanity Training</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            No worries! Your payment was cancelled and no charges were made.
            You can try again whenever you're ready.
          </p>

          <div className="space-y-3">
            <Link
              href="/trainings"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Trainings
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}