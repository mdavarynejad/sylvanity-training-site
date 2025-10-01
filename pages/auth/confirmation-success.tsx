import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import MissionApproachSection from '@/components/about/MissionApproachSection'
import FeaturesSection from '@/components/about/FeaturesSection'
import CTASection from '@/components/about/CTASection'

export default function ConfirmationSuccessPage() {

  return (
    <>
      <Head>
        <title>Email Confirmed - Sylvanity Academy Platform</title>
        <meta name="description" content="Your email has been successfully confirmed. Start exploring our AI and technology training programs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="page-container">
        {/* Success Hero Section */}
        <div className="relative bg-gradient-to-br from-brand-sage/10 via-white to-brand-blue/10 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-sage/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand-sage to-brand-sage/80 rounded-full mb-6 shadow-lg animate-bounce-slow">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Email Confirmed Successfully! 🎉
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Welcome to Sylvanity Academy! Your account is now active and ready to use.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/login">
                  <span className="btn-gradient-primary hover-gradient-lift text-base inline-flex items-center gap-2 px-8 py-4 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login to Your Account
                  </span>
                </Link>
                <Link href="/trainings">
                  <span className="btn-gradient-secondary hover-gradient-lift text-base inline-flex items-center gap-2 px-8 py-4 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Explore Training Programs
                  </span>
                </Link>
              </div>

              {/* What's Next Section */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What You Can Do Now:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-sage/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-sage font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Browse Courses</p>
                      <p className="text-sm text-gray-600">Explore our AI & tech programs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-blue font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Complete Profile</p>
                      <p className="text-sm text-gray-600">Add your details & preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-sage/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-sage font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Book Training</p>
                      <p className="text-sm text-gray-600">Reserve your spot today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reusable About Content Sections */}
        <div className="page-section">
          <MissionApproachSection />
          <FeaturesSection />
          <CTASection
            title="Ready to Start Learning?"
            description="Your account is ready! Dive into our comprehensive AI training programs designed for professionals."
            primaryLink={{
              href: "/trainings",
              text: "Browse All Trainings"
            }}
            secondaryLink={{
              href: "/dashboard",
              text: "Go to Dashboard"
            }}
          />
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}