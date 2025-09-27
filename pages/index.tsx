import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import { getFeaturedTestimonials, renderStars, Testimonial } from '@/lib/supabase-testimonials'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

interface HomePageProps {
  featuredTestimonials: Testimonial[]
}

export default function HomePage({ featuredTestimonials }: HomePageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((element) => observer.observe(element))

    // Trigger hero animation on load
    setTimeout(() => setIsVisible(true), 100)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Sylvanity Training Platform - Professional AI & Technology Training</title>
        <meta name="description" content="Elevate your skills with expert-led AI and technology training programs. Professional development designed for SME leaders and teams." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sylvanity-training-site.netlify.app/" />
        <meta property="og:title" content="Sylvanity Training Platform - Professional AI & Technology Training" />
        <meta property="og:description" content="Elevate your skills with expert-led AI and technology training programs. Professional development designed for SME leaders and teams." />
        <meta property="og:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content="Sylvanity Training" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sylvanity-training-site.netlify.app/" />
        <meta property="twitter:title" content="Sylvanity Training Platform - Professional AI & Technology Training" />
        <meta property="twitter:description" content="Elevate your skills with expert-led AI and technology training programs. Professional development designed for SME leaders and teams." />
        <meta property="twitter:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />
        <meta property="twitter:creator" content="@sylvanity" />

        {/* Additional SEO */}
        <meta name="keywords" content="AI training, technology training, professional development, SME training, artificial intelligence, machine learning, leadership development, data analytics" />
        <meta name="author" content="Sylvanity Training" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sylvanity-training-site.netlify.app/" />
        <style jsx>{`
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
          }
          .animate-in {
            opacity: 1;
            transform: translateY(0);
          }
          .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
          }
          .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .bounce-in {
            animation: bounceIn 0.8s ease-out;
          }
          @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          .shine-effect {
            position: relative;
            overflow: hidden;
          }
          .shine-effect::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
            transform: rotate(45deg);
            animation: shine 3s infinite;
          }
          @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          .stagger-animation {
            animation-delay: var(--delay, 0s);
          }
        `}</style>
      </Head>

      <Header />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 leading-tight gradient-text fade-in-up ${isVisible ? 'visible' : ''}`}>
              Sylvanity Training Platform
            </h1>
            <p className={`text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
              Elevate your skills with our comprehensive professional development programs.
              Expert-led training designed for your success.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.4s'}}>
              <Link href="/trainings" className="btn-gradient-primary hover-gradient-lift px-8 py-4 text-base inline-block text-center">
                Browse Trainings
              </Link>
              <Link href="/auth/signin" className="btn-gradient-secondary hover-gradient-lift px-8 py-4 text-base inline-block text-center">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20" ref={featuresRef}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll bg-white border border-gray-200 rounded-lg p-8 hover-lift stagger-animation" style={{'--delay': '0.1s'} as React.CSSProperties}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 bounce-in">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with years of experience
              </p>
            </div>
            <div className="animate-on-scroll bg-white border border-gray-200 rounded-lg p-8 hover-lift stagger-animation" style={{'--delay': '0.2s'} as React.CSSProperties}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-6 bounce-in">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Flexible Schedule</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from various schedules that fit your availability
              </p>
            </div>
            <div className="animate-on-scroll bg-white border border-gray-200 rounded-lg p-8 hover-lift shine-effect stagger-animation" style={{'--delay': '0.3s'} as React.CSSProperties}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 bounce-in relative">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Certification</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive <span className="font-medium text-orange-600">recognized certificates</span> upon completion
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20" ref={testimonialsRef}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl font-normal text-gray-900 mb-4">What Our Participants Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real feedback from SME leaders who have transformed their businesses with our AI training programs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="animate-on-scroll bg-white p-8 rounded-lg border border-gray-200 hover-lift stagger-animation"
                  style={{'--delay': `${0.1 * (index + 1)}s`} as React.CSSProperties}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="text-yellow-500 text-lg mr-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {testimonial.rating === 5 ? 'Excellent' : testimonial.rating === 4 ? 'Very Good' : 'Good'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      VERIFIED
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
                    <div className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium mt-2">{testimonial.trainingTitle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center animate-on-scroll">
              <Link href="/trainings">
                <span className="btn-gradient-primary hover-gradient-lift px-8 py-4 text-base inline-flex items-center">
                  Join Our Success Stories
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
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