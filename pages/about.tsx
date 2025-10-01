import Head from 'next/head'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import MissionApproachSection from '@/components/about/MissionApproachSection'
import FeaturesSection from '@/components/about/FeaturesSection'
import CTASection from '@/components/about/CTASection'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Sylvanity Academy Platform</title>
        <meta name="description" content="Learn about Sylvanity Academy Platform and our mission to empower professionals with AI and technology skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="page-container">
        {/* Hero Section */}
        <div className="page-header">
          <div className="text-center">
            <h1 className="heading-page mb-6">About Sylvanity Academy</h1>
            <p className="text-subtitle max-w-4xl mx-auto">
              Empowering professionals and businesses with cutting-edge AI and technology training
              programs designed for the modern digital workplace.
            </p>
          </div>
        </div>

        {/* Mission & Approach Section */}
        <div className="page-section">
          <MissionApproachSection />
          <FeaturesSection />
          <CTASection
            title="Ready to Get Started?"
            description="Explore our training programs and take the next step in your professional development."
            primaryLink={{
              href: "/trainings",
              text: "Browse Trainings"
            }}
            secondaryLink={{
              href: "/contact",
              text: "Contact Us"
            }}
          />
        </div>
      </div>

      <Footer />
    </>
  )
}