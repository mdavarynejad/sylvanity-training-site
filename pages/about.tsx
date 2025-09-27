import Head from 'next/head'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Sylvanity Training Platform</title>
        <meta name="description" content="Learn about Sylvanity Training Platform and our mission to empower professionals with AI and technology skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="page-container">
        {/* Hero Section */}
        <div className="page-header">
          <div className="text-center">
            <h1 className="heading-page mb-6">About Sylvanity Training</h1>
            <p className="text-subtitle max-w-4xl mx-auto">
              Empowering professionals and businesses with cutting-edge AI and technology training
              programs designed for the modern digital workplace.
            </p>
          </div>
        </div>

        {/* Mission & Approach Section */}
        <div className="page-section">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                At Sylvanity Training, we believe that sustainable and privacy-first AI solutions
                are the future of business. Our mission is to bridge the gap between emerging
                technologies and practical business applications, helping SMEs and professionals
                stay ahead in the rapidly evolving digital landscape.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-medium text-gray-900 mb-6">Our Approach</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We focus on hands-on, practical training that you can immediately apply in your
                work environment. Our expert instructors bring real-world experience and industry
                insights to every session, ensuring you gain both theoretical knowledge and
                practical skills.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium text-gray-900 mb-4">Why Choose Sylvanity Training?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We combine industry expertise with practical learning to deliver exceptional training experiences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Practical Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-world applications and hands-on learning experiences that you can implement immediately
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Expert Instructors</h3>
                <p className="text-gray-600 leading-relaxed">
                  Industry professionals with years of practical experience and proven track records
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Privacy-First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sustainable and privacy-focused AI solutions and methodologies for responsible innovation
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-50 rounded-2xl p-16">
            <h2 className="text-4xl font-medium text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore our training programs and take the next step in your professional development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/trainings" className="btn-primary px-8 py-4 text-base">
                Browse Trainings
              </a>
              <a href="/contact" className="btn-secondary px-8 py-4 text-base">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}