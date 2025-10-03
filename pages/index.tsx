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
        <title>Sylvanity Academy Platform - Professional AI and Automation Training</title>
        <meta name="description" content="Elevate your skills with expert-led AI and technology training programs. Professional development designed for SME leaders and teams." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sylvanity-training-site.netlify.app/" />
        <meta property="og:title" content="Sylvanity Academy Platform - Professional AI and Automation Training" />
        <meta property="og:description" content="Elevate your skills with expert-led AI and technology training programs. Professional development designed for SME leaders and teams." />
        <meta property="og:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:site_name" content="Sylvanity Academy" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sylvanity-training-site.netlify.app/" />
        <meta property="twitter:title" content="Sylvanity Academy Platform - Professional AI and Automation Training" />
        <meta property="twitter:description" content="Elevate your skills with expert-led AI and technology training programs. Professional development designed for SME leaders and teams." />
        <meta property="twitter:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />
        <meta property="twitter:creator" content="@Sylvanity_BV" />

        {/* Additional SEO */}
        <meta name="keywords" content="AI training, technology training, professional development, SME training, artificial intelligence, machine learning, leadership development, data analytics" />
        <meta name="author" content="Sylvanity Academy" />
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
              Sylvanity Academy Platform
            </h1>
            <p className={`text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
              Elevate your skills with our comprehensive professional development programs.
              Expert-led training designed for your success.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 fade-in-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.4s'}}>
              <Link href="/trainings">
                <span className="btn-gradient-primary hover-gradient-lift text-base inline-block text-center cursor-pointer">
                  Browse Trainings
                </span>
              </Link>
              <Link href="/auth/signin">
                <span className="btn-gradient-secondary hover-gradient-lift text-base inline-block text-center cursor-pointer">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Our Training Methodology Section - Enhanced Interactive Design */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20" ref={featuresRef}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 mb-4">Our Training Methodology</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience a comprehensive approach to professional development with our proven methodology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Expert Instructors - Interactive Card */}
            <div className="group animate-on-scroll methodology-box bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-400 hover:shadow-2xl cursor-pointer relative overflow-hidden stagger-animation" style={{'--delay': '0.1s'} as React.CSSProperties}>
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Interactive Icon Container */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-300/50 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <svg className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">Expert Instructors</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Learn from <span className="font-medium text-blue-600 group-hover:text-blue-700">industry professionals</span> with years of hands-on experience
                </p>
              </div>

              {/* Floating Particles Effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300" style={{animationDelay: '0.1s'}}></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300" style={{animationDelay: '0.3s'}}></div>
            </div>

            {/* Flexible Schedule - Interactive Card */}
            <div className="group animate-on-scroll methodology-box bg-white border border-gray-200 rounded-xl p-8 hover:border-green-400 hover:shadow-2xl cursor-pointer relative overflow-hidden stagger-animation" style={{'--delay': '0.2s'} as React.CSSProperties}>
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Interactive Icon Container with Clock Animation */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-green-300/50 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <svg className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {/* Pulsing Ring Effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-green-300 opacity-0 group-hover:opacity-50 group-hover:animate-ping"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">Flexible Schedule</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Choose from <span className="font-medium text-green-600 group-hover:text-green-700">various schedules</span> that perfectly fit your availability
                </p>
              </div>

              {/* Moving Time Indicators */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:translate-x-1"></div>
              <div className="absolute top-10 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-700 group-hover:translate-x-2"></div>
            </div>

            {/* Certification - Premium Interactive Card */}
            <div className="group animate-on-scroll methodology-box bg-white border border-gray-200 rounded-xl p-8 hover:border-yellow-400 hover:shadow-2xl cursor-pointer relative overflow-hidden stagger-animation" style={{'--delay': '0.3s'} as React.CSSProperties}>
              {/* Premium Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>

              {/* Interactive Certificate Icon */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-yellow-300/50 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <svg className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {/* Golden Ring Animation */}
                <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 opacity-0 group-hover:opacity-60 group-hover:animate-pulse"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4 group-hover:scale-105 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:from-yellow-600 group-hover:to-orange-600 transition-all duration-300">Professional Certification</span>
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Receive <span className="font-semibold text-orange-600 group-hover:text-orange-700">industry-recognized certificates</span> upon successful completion
                </p>
              </div>

              {/* Sparkling Effects */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-opacity duration-300" style={{animationDelay: '0.6s'}}></div>
            </div>
          </div>
        </div>

        {/* Training Brochure Download Section */}
        <div className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Our Complete Training Guide</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Download our comprehensive training brochure with detailed course information, schedules, and everything you need to know about our professional development programs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/attachments/sylvanity-training-flyer-final.png"
                className="btn-gradient-primary hover-gradient-lift px-8 py-4 text-lg font-semibold"
                download="Sylvanity-Training-Programs-2025.png"
              >
                Download Training Brochure
              </a>

              <a
                href="/attachments/sylvanity-training-flyer-final.png"
                className="btn-gradient-secondary hover-gradient-lift px-8 py-4 text-lg font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview Brochure
              </a>
            </div>
          </div>
        </div>

        {/* Hero Testimonial Section */}
        <div className="w-full bg-gradient-to-br from-brand-sage/10 to-brand-blue/10 py-20" ref={testimonialsRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              {featuredTestimonials.length > 0 && (
                <div className="animate-on-scroll">
                  {/* Hero Testimonial Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-12 lg:p-16 border border-gray-100 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-sage/5 to-brand-blue/5 opacity-50"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-sage/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-blue/10 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>

                    <div className="relative z-10">
                      {/* Quote Icon */}
                      <div className="mb-8">
                        <svg className="w-16 h-16 text-brand-sage mx-auto opacity-60" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center mb-8">
                        <div className="text-yellow-500 text-2xl mr-4">
                          {renderStars(featuredTestimonials[0].rating)}
                        </div>
                        <span className="text-lg font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                          Excellent Training
                        </span>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-2xl lg:text-3xl text-gray-800 mb-12 leading-relaxed font-light">
                        "{featuredTestimonials[0].testimonial}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="border-t border-gray-200 pt-8">
                        <div className="text-xl font-semibold text-gray-900 mb-2">
                          {featuredTestimonials[0].participantName}
                        </div>
                        <div className="text-lg text-brand-blue font-medium mb-2">
                          {featuredTestimonials[0].participantCompany}
                        </div>
                        <div className="text-base text-gray-600">
                          {featuredTestimonials[0].trainingTitle}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-16 animate-on-scroll" style={{animationDelay: '0.3s'}}>
                    <Link href="/trainings">
                      <span className="btn-gradient-primary hover-gradient-lift text-lg inline-flex items-center cursor-pointer px-8 py-4">
                        Join Our Success Stories
                        <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              )}
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