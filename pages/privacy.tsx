import Head from 'next/head'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function PrivacyPolicy() {
  const lastUpdated = 'May 2025'
  const effectiveDate = 'May 2025'

  return (
    <>
      <Head>
        <title>Privacy Policy – Sylvanity Academy</title>
        <meta name="description" content="Privacy Policy for Sylvanity Academy platform" />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl font-normal text-gray-900 mb-4">
              Sylvanity Academy Privacy Policy
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
              <li><a href="#information-we-collect" className="text-blue-600 hover:underline">Information we collect</a></li>
              <li><a href="#how-we-use" className="text-blue-600 hover:underline">How we use information</a></li>
              <li><a href="#sharing-information" className="text-blue-600 hover:underline">Sharing your information</a></li>
              <li><a href="#data-security" className="text-blue-600 hover:underline">Data security</a></li>
              <li><a href="#your-rights" className="text-blue-600 hover:underline">Your rights</a></li>
              <li><a href="#cookies" className="text-blue-600 hover:underline">Cookies and tracking</a></li>
              <li><a href="#international-transfers" className="text-blue-600 hover:underline">International transfers</a></li>
              <li><a href="#contact-us" className="text-blue-600 hover:underline">Contact us</a></li>
            </ol>
          </nav>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <section id="information-we-collect">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Information we collect</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We collect information to provide better services to all our users. We collect information in the following ways:
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Information you give us</h3>
                <p>
                  When you create an account, register for training, or contact us, you give us information such as your name, email address, company, and professional role.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Information we get from your use of our services</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Training progress and completion status</li>
                  <li>Platform usage patterns and preferences</li>
                  <li>Device information such as your operating system and browser type</li>
                  <li>Log information including your IP address and the time of your requests</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Information from third parties</h3>
                <p>
                  We may receive information about you from public sources or business partners, such as when you register through an employer-sponsored program.
                </p>
              </div>
            </section>

            {/* How We Use Information */}
            <section id="how-we-use">
              <h2 className="text-xl font-medium text-gray-900 mb-6">How we use information</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Sylvanity Academy and our users.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Provide our services</h3>
                <p>
                  We use your information to deliver our training programs, track your progress, provide certificates, and offer customer support.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Maintain & improve our services</h3>
                <p>
                  We use information to ensure our services are working as intended and to make improvements. This includes developing new features and analyzing how our services are used.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Develop new services</h3>
                <p>
                  We use the information we collect in existing services to help us develop new ones.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Provide personalized services</h3>
                <p>
                  We may use the information we collect to provide you with tailored content – such as giving you more relevant training recommendations.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Communicate with you</h3>
                <p>
                  We use information like your email address to interact with you directly. This includes sending training updates, certificates, and responding to support requests.
                </p>
              </div>
            </section>

            {/* Sharing Information */}
            <section id="sharing-information">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Sharing your information</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We do not share personal information with companies, organizations and individuals outside of Sylvanity Academy unless one of the following circumstances applies:
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">With your consent</h3>
                <p>
                  We will share personal information with companies, organizations or individuals outside of Sylvanity Academy when we have your consent to do so.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">For external processing</h3>
                <p>
                  We provide personal information to our affiliates or other trusted businesses or persons to process it for us, based on our instructions and in compliance with our Privacy Policy and any other appropriate confidentiality and security measures.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">For legal reasons</h3>
                <p>
                  We will share personal information with companies, organizations or individuals outside of Sylvanity Academy if we have a good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Meet any applicable law, regulation, legal process or enforceable governmental request</li>
                  <li>Enforce applicable Terms of Service, including investigation of potential violations</li>
                  <li>Detect, prevent, or otherwise address fraud, security or technical issues</li>
                  <li>Protect against harm to the rights, property or safety of Sylvanity Academy, our users or the public</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section id="data-security">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Data security</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We work hard to protect Sylvanity Academy and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Encryption</h3>
                <p>
                  We encrypt many of our services using SSL/TLS protocols to protect your information during transmission.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Access controls</h3>
                <p>
                  We restrict access to personal information to Sylvanity Academy employees, contractors and agents who need to know that information in order to process it for us.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Regular security reviews</h3>
                <p>
                  We regularly review our information collection, storage and processing practices, including physical security measures.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section id="your-rights">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Your rights</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Under applicable data protection laws, including GDPR, you have certain rights regarding your personal information:
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Access and portability</h3>
                <p>
                  You can access and export your personal data from our services. You can also request a copy of the personal information we hold about you.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Correction</h3>
                <p>
                  You can correct inaccurate personal information. You can update much of your information directly through your account settings.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Deletion</h3>
                <p>
                  You can request deletion of your personal information, though we may need to retain certain information for legal or business purposes.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Objection and restriction</h3>
                <p>
                  You can object to certain processing of your personal information or request that we restrict processing in certain circumstances.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">How to exercise your rights</h3>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact us" section below. We will respond to your request within the timeframes required by applicable law.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Cookies and tracking</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use various technologies to collect and store information when you visit our service, and this may include using cookies or similar technologies.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">What are cookies</h3>
                <p>
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently, as well as to provide reporting information.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">How we use cookies</h3>
                <p>
                  We use cookies to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Remember your login status and preferences</li>
                  <li>Understand how you use our services</li>
                  <li>Improve our services and user experience</li>
                  <li>Provide security features</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Managing cookies</h3>
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section id="international-transfers">
              <h2 className="text-xl font-medium text-gray-900 mb-6">International transfers</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Your information may be processed and stored in countries other than your own. We ensure that any international transfers comply with applicable data protection laws.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Safeguards</h3>
                <p>
                  When we transfer personal information internationally, we use appropriate safeguards such as:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>European Commission adequacy decisions</li>
                  <li>Standard contractual clauses approved by the European Commission</li>
                  <li>Other legally recognized transfer mechanisms</li>
                </ul>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact-us">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Contact us</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, we're here to help.
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Privacy questions</h3>
                <p>
                  For privacy-related questions, concerns, or requests regarding your personal data, please{' '}
                  <Link href="/contact" className="text-brand-sage hover:text-brand-blue underline">
                    contact us through our contact form
                  </Link>
                  .
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">General inquiries</h3>
                <p>
                  For general questions about our services or any other inquiries, please{' '}
                  <Link href="/contact" className="text-brand-sage hover:text-brand-blue underline">
                    visit our contact page
                  </Link>
                  .
                </p>

                <h3 className="text-lg font-medium text-gray-900 mt-6">Data protection authority</h3>
                <p>
                  If you have concerns about our handling of your personal information that we have not been able to resolve, you may lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
                </p>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Questions about this policy?</h2>
            <p className="text-gray-700 mb-4">
              We're here to help with any questions or concerns you may have about this Privacy Policy or our privacy practices.
            </p>
            <p className="text-gray-700">
              Please{' '}
              <Link href="/contact" className="text-brand-sage hover:text-brand-blue underline font-medium">
                contact us through our contact form
              </Link>{' '}
              and we'll respond to your inquiry as soon as possible.
            </p>
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