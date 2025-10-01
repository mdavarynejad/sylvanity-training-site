export default function FeaturesSection() {
  return (
    <div className="mb-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium text-gray-900 mb-4">Why Choose Sylvanity Academy?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We combine industry expertise with practical learning to deliver exceptional training experiences
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="group text-center methodology-box relative overflow-hidden bg-white rounded-xl p-8 border border-gray-200 hover:border-brand-sage transition-all duration-300">
          <div className="relative">
            <div className="w-20 h-20 bg-brand-sage-light rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-brand-blue transition-colors duration-300">Practical Focus</h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              Real-world applications and hands-on learning experiences that you can implement immediately
            </p>

            {/* Floating animated dots grouped in top-right corner */}
            <div className="floating-dot floating-dot-1 absolute top-2 right-2"></div>
            <div className="floating-dot floating-dot-2 absolute top-3 right-4"></div>
            <div className="floating-dot floating-dot-3 absolute top-4 right-3"></div>
          </div>
          <div className="training-card-gradient-overlay"></div>
        </div>

        <div className="group text-center methodology-box relative overflow-hidden bg-white rounded-xl p-8 border border-gray-200 hover:border-brand-blue transition-all duration-300">
          <div className="relative">
            <div className="w-20 h-20 bg-brand-sage-light rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-brand-sage transition-colors duration-300">Expert Instructors</h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              Industry professionals with years of practical experience and proven track records
            </p>

            {/* Floating animated dots grouped in top-left corner */}
            <div className="floating-dot floating-dot-1 absolute top-2 left-2"></div>
            <div className="floating-dot floating-dot-2 absolute top-3 left-4"></div>
            <div className="floating-dot floating-dot-bounce-1 absolute top-4 left-3"></div>
          </div>
          <div className="training-card-gradient-overlay" data-animation-pattern="1"></div>
        </div>

        <div className="group text-center methodology-box relative overflow-hidden bg-white rounded-xl p-8 border border-gray-200 hover:border-brand-sage transition-all duration-300">
          <div className="relative">
            <div className="w-20 h-20 bg-brand-sage-light rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-brand-blue transition-colors duration-300">Privacy-First</h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              Sustainable and privacy-focused AI solutions and methodologies for responsible innovation
            </p>

            {/* Floating animated dots grouped in bottom-right corner */}
            <div className="floating-dot floating-dot-1 absolute bottom-2 right-2"></div>
            <div className="floating-dot floating-dot-2 absolute bottom-3 right-4"></div>
            <div className="floating-dot floating-dot-3 absolute bottom-4 right-3"></div>
          </div>
          <div className="training-card-gradient-overlay" data-animation-pattern="2"></div>
        </div>
      </div>
    </div>
  )
}