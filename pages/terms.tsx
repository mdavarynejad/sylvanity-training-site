import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function TermsOfService() {
  const lastUpdated = 'January 15, 2024'
  const effectiveDate = 'January 15, 2024'

  return (
    <>
      <Head>
        <title>Terms of Service – Sylvanity Academy</title>
        <meta name="description" content="Terms of Service for Sylvanity Academy platform" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl font-normal text-gray-900 mb-4">
              Sylvanity Academy Terms of Service
            </h1>
            <div className="text-sm text-gray-600">
              <p>Effective: {effectiveDate}</p>
              <p>Last updated: {lastUpdated}</p>
            </div>
          </header>

          {/* Table of Contents */}
          <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contents</h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#introduction" className="text-blue-600 hover:underline">Introduction</a></li>
              <li><a href="#who-can-use" className="text-blue-600 hover:underline">Who can use our services</a></li>
              <li><a href="#what-you-can-expect" className="text-blue-600 hover:underline">What you can expect from us</a></li>
              <li><a href="#what-we-expect" className="text-blue-600 hover:underline">What we expect from you</a></li>
              <li><a href="#content-policies" className="text-blue-600 hover:underline">Content policies</a></li>
              <li><a href="#software" className="text-blue-600 hover:underline">Software in our services</a></li>
              <li><a href="#problems-disagreements" className="text-blue-600 hover:underline">Problems and disagreements</a></li>
              <li><a href="#about-terms" className="text-blue-600 hover:underline">About these terms</a></li>
            </ol>
          </nav>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <section id="introduction">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Introduction</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to Sylvanity Academy! We&apos;re a professional training platform focused on AI, technology, and leadership development for small and medium enterprises (SMEs).
                </p>
                <p>
                  We provide these Terms of Service to help you understand the rules that govern your use of our services. These terms apply to all our training programs, digital content, and platform features.
                </p>
                <p>
                  By using our services, you&apos;re agreeing to these terms. Please read them carefully.
                </p>
              </div>
            </section>

            {/* Who Can Use */}
            <section id="who-can-use">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Who can use our services</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium text-gray-900">Age requirements</h3>
                <p>
                  You must be at least 18 years old to use our services independently. If you&apos;re under 18, you may use our services with appropriate supervision from a parent, guardian, or employer.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Permission from your organization</h3>
                <p>
                  If you&apos;re using our services for work or on behalf of an organization, you confirm that you have the necessary authority to agree to these terms on behalf of that organization.
                </p>
              </div>
            </section>

            {/* What You Can Expect */}
            <section id="what-you-can-expect">
              <h2 className="text-xl font-medium text-gray-900 mb-6">What you can expect from us</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium text-gray-900">Professional training services</h3>
                <p>
                  We provide high-quality training programs in AI, technology, data analysis, and leadership. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Interactive workshops and training sessions</li>
                  <li>Digital learning materials and resources</li>
                  <li>Professional certificates upon completion</li>
                  <li>Ongoing support and community access</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Service availability</h3>
                <p>
                  We strive to keep our services available and accessible. However, our services may sometimes be interrupted for maintenance, updates, or due to factors beyond our control.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Developing our services</h3>
                <p>
                  We&apos;re constantly improving our services. This means we may add, change, or remove features, and we may also suspend or discontinue services entirely.
                </p>
              </div>
            </section>

            {/* What We Expect */}
            <section id="what-we-expect">
              <h2 className="text-xl font-medium text-gray-900 mb-6">What we expect from you</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium text-gray-900">Follow these terms and applicable laws</h3>
                <p>
                  Respect these terms, applicable laws, and other users. Don&apos;t misuse our services.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Respect others</h3>
                <p>
                  We want to maintain a respectful environment for everyone. Don&apos;t abuse, harass, or harm others or yourself. When communicating with others, follow the same rules you&apos;d follow in real life.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Permission to use your content</h3>
                <p>
                  Some of our services allow you to upload, submit, store, or share content. You retain ownership of any content you submit. When you upload content to our services, you give us permission to use that content to provide and improve our services.
                </p>
              </div>
            </section>

            {/* Content Policies */}
            <section id="content-policies">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Content policies</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Don&apos;t misuse our services. For example, don&apos;t:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use our services to do anything unlawful, misleading, or fraudulent</li>
                  <li>Distribute content that&apos;s spam or malware</li>
                  <li>Harm or interfere with the operation of our services</li>
                  <li>Try to access our services using methods other than the interface we provide</li>
                  <li>Share training materials outside of your organization without permission</li>
                </ul>
              </div>
            </section>

            {/* Software */}
            <section id="software">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Software in our services</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium text-gray-900">License</h3>
                <p>
                  When our services include downloadable software, that software may update automatically on your device when a new version or feature is available.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Open source</h3>
                <p>
                  Some software used in our services may be offered under an open source license. There may be provisions in an open source license that expressly override some of these terms.
                </p>
              </div>
            </section>

            {/* Problems and Disagreements */}
            <section id="problems-disagreements">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Problems and disagreements</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium text-gray-900">First, let&apos;s try to work it out</h3>
                <p>
                  Before taking formal action, we&apos;ll try to resolve any disagreements directly with you. Contact us at{' '}
                  <a href="mailto:support@sylvanity.com" className="text-blue-600 hover:underline">
                    support@sylvanity.com
                  </a>{' '}
                  if you have concerns.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Legal proceedings</h3>
                <p>
                  These terms are governed by Dutch law. All claims arising out of or relating to these terms or our services will be litigated exclusively in the courts of the Netherlands, and you consent to personal jurisdiction in those courts.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Limitation of liability</h3>
                <p>
                  To the extent allowed by applicable law, Sylvanity Academy will not be responsible for lost profits, revenues, or data, financial losses, or indirect, special, consequential, exemplary, or punitive damages.
                </p>
              </div>
            </section>

            {/* About These Terms */}
            <section id="about-terms">
              <h2 className="text-xl font-medium text-gray-900 mb-6">About these terms</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium text-gray-900">When these terms apply</h3>
                <p>
                  These terms describe the relationship between you and Sylvanity Academy. They apply to your use of our services.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">What happens if these terms change</h3>
                <p>
                  We may change these terms from time to time, for example, to reflect changes to our services or for legal reasons. We&apos;ll provide reasonable advance notice of material changes to these terms and the opportunity to review them.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">What happens if there&apos;s a problem with these terms</h3>
                <p>
                  If it turns out that a particular term isn&apos;t enforceable, this won&apos;t affect any other terms.
                </p>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Questions about these terms?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms or our services, please contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Email:{' '}
                <a href="mailto:support@sylvanity.com" className="text-blue-600 hover:underline">
                  support@sylvanity.com
                </a>
              </p>
              <p>
                Website:{' '}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact Form
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Sylvanity Academy B.V. • Netherlands • Effective {effectiveDate}
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}