import { useState } from 'react'

interface CourseSection {
  id: string
  title: string
  content: React.ReactNode
}

interface CourseMaterialsTabsProps {
  training: {
    title: string
    pdfAttachmentUrl?: string
  }
}

export default function CourseMaterialsTabs({ training }: CourseMaterialsTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  // Define course sections based on common PDF structure
  const courseSections: CourseSection[] = [
    {
      id: 'overview',
      title: 'Course Overview',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Course Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              This intensive workshop is designed to provide practical, hands-on experience with cutting-edge
              AI technologies and methodologies. Participants will gain comprehensive understanding of both
              theoretical foundations and real-world applications.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Hands-on practical exercises and real-world scenarios</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Expert-led instruction with industry insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Comprehensive materials and ongoing support</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span className="text-gray-700">Certification upon successful completion</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'objectives',
      title: 'Learning Objectives',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Learning Objectives</h3>
            <p className="text-gray-700 mb-6">
              Upon successful completion of this course, participants will be able to:
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-blue-900 mb-3">Remember & Understand</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">Define key concepts and explain their business relevance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">Identify opportunities and strategic risks in implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">Recognize core components of effective methodologies</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-green-900 mb-3">Apply</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700">Construct well-defined solutions using established frameworks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700">Utilize practical tools for business tasks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700">Apply iterative techniques to improve outcomes</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-purple-900 mb-3">Analyze & Evaluate</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-700">Compare and contrast different approaches and their limitations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-700">Assess quality, relevance, and potential implications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span className="text-gray-700">Create personalized frameworks tailored to specific needs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'schedule',
      title: 'Course Schedule',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Course Schedule & Modules</h3>
            <p className="text-gray-600 mb-6">Total Duration: 8 hours (including breaks)</p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Module 1: Introduction & Foundations</h4>
                <span className="text-sm text-gray-500">9:00 - 10:30</span>
              </div>
              <p className="text-gray-700 mb-3">
                Welcome, course objectives, and foundational concepts. Interactive icebreaker and setting expectations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Interactive</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Foundations</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Module 2: Core Concepts & Theory</h4>
                <span className="text-sm text-gray-500">10:45 - 12:30</span>
              </div>
              <p className="text-gray-700 mb-3">
                Deep dive into key concepts with practical examples and real-world applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Theory</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Examples</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Module 3: Hands-on Practice</h4>
                <span className="text-sm text-gray-500">13:30 - 15:15</span>
              </div>
              <p className="text-gray-700 mb-3">
                Practical exercises, tool exploration, and guided implementation workshops.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Hands-on</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Workshop</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Module 4: Implementation & Next Steps</h4>
                <span className="text-sm text-gray-500">15:30 - 17:00</span>
              </div>
              <p className="text-gray-700 mb-3">
                Action planning, wrap-up discussion, and personalized roadmap creation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Planning</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Roadmap</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'resources',
      title: 'Resources & Materials',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Resources & Materials</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-blue-900 mb-4">Required Materials</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                  </svg>
                  <span className="text-gray-700">Laptop with Wi-Fi capability</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H2a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Course handbook (provided)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Account setup instructions (sent before course)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-green-900 mb-4">Provided Handouts</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H2a1 1 0 110-2V4zm2 3a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 2a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Reference guide and cheat sheets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Workshop templates and worksheets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Personal action plan template</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Post-Course Support</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  </svg>
                </div>
                <h5 className="font-medium text-gray-900 mb-2">Q&A Support</h5>
                <p className="text-sm text-gray-600">30 days of email support for questions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h5 className="font-medium text-gray-900 mb-2">Certification</h5>
                <p className="text-sm text-gray-600">Digital certificate upon completion</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h5 className="font-medium text-gray-900 mb-2">Updates</h5>
                <p className="text-sm text-gray-600">Access to updated materials</p>
              </div>
            </div>
          </div>

          {training.pdfAttachmentUrl && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-orange-600 mr-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="text-lg font-medium text-orange-900 mb-2">Download Complete Syllabus</h4>
                  <p className="text-orange-700 mb-3">
                    Get the complete course syllabus with detailed schedules, prerequisites, and additional resources.
                  </p>
                  <a
                    href={training.pdfAttachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    Download PDF Syllabus
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Materials</h3>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {courseSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {courseSections.find(section => section.id === activeTab)?.content}
      </div>
    </div>
  )
}