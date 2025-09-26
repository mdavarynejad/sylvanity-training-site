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

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About Sylvanity Training
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering professionals and businesses with cutting-edge AI and technology training
              programs designed for the modern digital workplace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At Sylvanity Training, we believe that sustainable and privacy-first AI solutions
                are the future of business. Our mission is to bridge the gap between emerging
                technologies and practical business applications, helping SMEs and professionals
                stay ahead in the rapidly evolving digital landscape.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Approach</h2>
              <p className="text-gray-700 leading-relaxed">
                We focus on hands-on, practical training that you can immediately apply in your
                work environment. Our expert instructors bring real-world experience and industry
                insights to every session, ensuring you gain both theoretical knowledge and
                practical skills.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Why Choose Sylvanity Training?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Practical Focus</h3>
                <p className="text-sm text-gray-600">
                  Real-world applications and hands-on learning experiences
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Instructors</h3>
                <p className="text-sm text-gray-600">
                  Industry professionals with years of practical experience
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy-First</h3>
                <p className="text-sm text-gray-600">
                  Sustainable and privacy-focused AI solutions and methodologies
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our training programs and take the next step in your professional development.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/trainings"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Trainings
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
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