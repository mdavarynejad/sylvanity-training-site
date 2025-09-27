import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function TermsOfServicePage() {
  return (
    <div className="page-container">
      <Header />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the Sylvanity Training platform, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Sylvanity Training provides online and in-person professional training programs focused on AI,
                technology, leadership, and business development. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Training program enrollment and participation</li>
                <li>Educational content and materials</li>
                <li>Progress tracking and certification</li>
                <li>Support and guidance from qualified instructors</li>
                <li>Access to training platforms and resources</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                To access our services, you must create an account and provide accurate information. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Providing accurate, current, and complete information</li>
                <li>Updating your information as necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Training Programs and Enrollment</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Enrollment</h3>
                  <p className="text-gray-700">
                    Training program enrollment is subject to availability and our acceptance.
                    We reserve the right to refuse enrollment at our discretion.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Program Content</h3>
                  <p className="text-gray-700">
                    Training content, schedules, and instructors may be modified at our discretion.
                    We will provide reasonable notice of significant changes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.3 Attendance and Participation</h3>
                  <p className="text-gray-700">
                    Active participation is required for successful completion.
                    Certificates are awarded only upon meeting all program requirements.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5.1 Fees</h3>
                  <p className="text-gray-700">
                    Training fees are due at the time of enrollment unless otherwise specified.
                    All prices are listed in EUR and include applicable taxes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5.2 Refund Policy</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Full refund: Cancellation more than 14 days before program start</li>
                    <li>50% refund: Cancellation 7-14 days before program start</li>
                    <li>No refund: Cancellation less than 7 days before program start</li>
                    <li>Emergency cancellations will be considered on a case-by-case basis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5.3 Payment Methods</h3>
                  <p className="text-gray-700">
                    We accept major credit cards and bank transfers.
                    Payment processing is handled securely through third-party providers.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">6.1 Our Content</h3>
                  <p className="text-gray-700">
                    All training materials, content, and resources are protected by intellectual property laws.
                    You may use them solely for personal learning purposes during and after the training program.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">6.2 Restrictions</h3>
                  <p className="text-gray-700">You may not:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                    <li>Share, distribute, or republish training materials</li>
                    <li>Use content for commercial purposes without permission</li>
                    <li>Remove copyright or proprietary notices</li>
                    <li>Create derivative works based on our content</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Respect other participants and instructors</li>
                <li>Maintain a professional and constructive learning environment</li>
                <li>Not disrupt training sessions or platform operations</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in harassment, discrimination, or inappropriate behavior</li>
                <li>Protect confidential information shared during training</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Certificates and Credentials</h2>
              <p className="text-gray-700 mb-4">
                Certificates are awarded upon successful completion of training programs.
                Certificate requirements include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Full attendance or completion of all required modules</li>
                <li>Satisfactory performance on assessments (where applicable)</li>
                <li>Active participation in training activities</li>
                <li>Compliance with program requirements</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Certificates are for professional development and do not constitute professional licenses or qualifications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Sylvanity Training shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from use or inability to use our services</li>
                <li>Technical issues, platform downtime, or service interruptions</li>
                <li>Actions or omissions of third-party service providers</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our total liability shall not exceed the fees paid for the specific training program in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Service Availability</h2>
              <p className="text-gray-700">
                We strive to provide continuous service availability but cannot guarantee uninterrupted access.
                We may temporarily suspend services for maintenance, updates, or other operational needs.
                We are not liable for any inconvenience or damages resulting from service interruptions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to our services at any time for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violation of these Terms of Service</li>
                <li>Inappropriate conduct or behavior</li>
                <li>Non-payment of fees</li>
                <li>Fraudulent or illegal activities</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You may terminate your account at any time through your dashboard settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms of Service at any time.
                Changes will be effective immediately upon posting.
                Your continued use of our services constitutes acceptance of the modified terms.
                We recommend reviewing these terms periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700">
                These Terms of Service are governed by the laws of the European Union and the Netherlands.
                Any disputes will be resolved in the competent courts of the Netherlands.
                If any provision is found unenforceable, the remaining provisions shall remain in full force.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Sylvanity Training</strong><br/>
                  Email: <a href="mailto:support@sylvanity.com" className="text-blue-600 hover:text-blue-700">support@sylvanity.com</a><br/>
                  Website: <a href="/contact" className="text-blue-600 hover:text-blue-700">Contact Form</a>
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-sm text-gray-500">
                These Terms of Service constitute the entire agreement between you and Sylvanity Training
                regarding the use of our services and supersede all prior agreements and understandings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}