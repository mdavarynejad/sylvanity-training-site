import Link from 'next/link'
import NewsletterForm from '@/components/forms/newsletter-form'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="space-y-8">
          {/* Row 1: Company Info, Quick Links, Training Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Sylvanity Academy</h3>
              <p className="text-gray-300 text-sm mb-4">
                Professional development programs designed to elevate your skills and drive your success.
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/sylvanity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://eiai.today/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <span className="sr-only">EIAI Today - News</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </a>
                <a href="https://x.com/Sylvanity_BV" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/trainings" className="text-gray-300 hover:text-white transition">
                    Training Programs
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Training Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Training Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/trainings?category=AI" className="text-gray-300 hover:text-white transition">
                    AI & Technology
                  </Link>
                </li>
                <li>
                  <Link href="/trainings?category=Leadership" className="text-gray-300 hover:text-white transition">
                    Leadership & Management
                  </Link>
                </li>
                <li>
                  <Link href="/trainings?category=Data" className="text-gray-300 hover:text-white transition">
                    Data & Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/trainings?category=Strategy" className="text-gray-300 hover:text-white transition">
                    Strategy & Planning
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2: Our Publications spanning full width */}
          <div className="border-t border-gray-700 pt-8">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Our Publications</h4>
              <p className="text-sm text-gray-400">Explore our comprehensive guides and resources</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              <a
                href="https://sylvanity.eu/prompt-engineering"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Prompt Engineering Guide
                </div>
              </a>
              <a
                href="https://sylvanity.eu/vibe-coding"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Vibe Coding
                </div>
              </a>
              <a
                href="https://sylvanity.eu/ai-automation"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  AI Automation
                </div>
              </a>
              <a
                href="https://sylvanity.eu/terminal"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Terminal Mastery
                </div>
              </a>
              <a
                href="https://sylvanity.eu/go-programming"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Go Programming
                </div>
              </a>
              <a
                href="https://sylvanity.eu/change-management"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  Change Management
                </div>
              </a>
              <a
                href="/brochure"
                className="group p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center"
              >
                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  📄 Training Brochure
                </div>
              </a>
            </div>
          </div>

          {/* Row 3: Stay Updated spanning full width but organized in two columns */}
          <div className="border-t border-gray-700 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Get notified about new training programs and special offers.
                </p>
              </div>
              <div className="w-full md:max-w-md md:ml-auto">
                <NewsletterForm source="footer" className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://www.sylvanity.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Sylvanity
            </a>{' '}
            Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}