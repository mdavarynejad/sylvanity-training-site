import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="page-container">
      <Header />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you create an account,
                enroll in training programs, or contact us for support.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company information</li>
                <li><strong>Account Information:</strong> Username, password, profile preferences</li>
                <li><strong>Training Data:</strong> Course progress, completion status, certificates earned</li>
                <li><strong>Communication Data:</strong> Messages, feedback, support requests</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, usage analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our training services</li>
                <li>Create and manage your account</li>
                <li>Track your training progress and issue certificates</li>
                <li>Send you course updates, notifications, and administrative messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our platform</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication systems</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Account Deletion:</strong> Delete your account and associated data through your dashboard</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform.
                These technologies help us:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Remember your preferences and login status</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookie settings through your browser preferences, though this may affect platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations,
                resolve disputes, and enforce our agreements. Training records and certificates may be retained longer for verification purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your country of residence.
                We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information
                from children under 16. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy
                on this page and updating the "Last updated" date. Your continued use of our services after such modifications constitutes
                your acknowledgment and acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Sylvanity Training</strong><br/>
                  Email: <a href="mailto:privacy@sylvanity.com" className="text-blue-600 hover:text-blue-700">privacy@sylvanity.com</a><br/>
                  Website: <a href="/contact" className="text-blue-600 hover:text-blue-700">Contact Form</a>
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-500">
                This Privacy Policy is designed to comply with GDPR, CCPA, and other applicable data protection regulations.
                If you are located in the European Union or California, you may have additional rights under local law.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}