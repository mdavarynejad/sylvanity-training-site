export interface Training {
  id: string
  title: string
  description: string
  longDescription: string
  price: number
  currency: string
  duration: string
  startDate?: string // First start date for backward compatibility
  startDates?: string[] // Multiple start dates
  endDate?: string
  maxParticipants: number
  currentParticipants: number
  instructor: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  tags: string[]
  featured: boolean
  upcoming?: boolean
  imageUrl?: string // For list view compatibility
  heroImageUrl?: string // For detail view
  pdfAttachmentUrl?: string
  prerequisites?: string[]
  // SEO-optimized content fields
  format?: string
  seoWhyChoose?: string
  seoLearningOutcomes?: string
  seoTargetAudience?: string
  learningOutcomes?: string[]
  faqs?: { question: string; answer: string }[]
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

export interface Testimonial {
  id: string
  participantName: string
  participantCompany?: string
  trainingTitle: string
  rating: number
  testimonial: string
  date: string
  featured: boolean
}

export const mockTrainings: Training[] = [
  {
    id: '1',
    title: 'AI & Prompt Engineering Workshop',
    description: 'Master prompt engineering techniques and learn to use AI responsibly to enhance productivity in your SME.',
    longDescription: 'This practical, hands-on workshop demystifies AI concepts and teaches you to leverage AI tools responsibly for business productivity. You\'ll learn prompt construction frameworks (RTCFE), create a personalized Prompt Library, and understand data privacy and intellectual property considerations. Designed specifically for SMEs, this intensive workshop provides confidence and skills to begin using AI responsibly to enhance productivity and innovation.',
    price: 899,
    currency: 'EUR',
    duration: '1 day',
    startDates: ['2024-02-15', '2024-03-12', '2024-04-09', '2024-05-14'],
    maxParticipants: 22,
    currentParticipants: 12,
    instructor: 'Dr. Sarah Mitchell',
    level: 'Beginner',
    category: 'AI & Technology',
    tags: ['AI', 'prompt engineering', 'productivity', 'SME', 'ChatGPT', 'automation'],
    featured: true,
    heroImageUrl: '/images/trainings/ai-prompt-engineering-hero.webp',
    pdfAttachmentUrl: '/attachments/ai-prompt-engineering-syllabus.pdf',
  },
  {
    id: '2',
    title: 'Change Management in the AI Era',
    description: 'Lead your SME through AI transformation with proven change management strategies and practical toolkits.',
    longDescription: 'This one-day leadership workshop is tailored for SME leaders who want to integrate AI into their organizations while managing the human challenges of technological transformation. Learn to build compelling visions for AI implementation, communicate transformation strategies effectively, and manage resistance and fear around technological change. Using Kotter\'s 8-Step Model and practical toolkits, transform AI from a source of anxiety to a powerful catalyst for excitement, growth, and shared success.',
    price: 1099,
    currency: 'EUR',
    duration: '1 day',
    startDates: ['2024-03-01', '2024-03-28', '2024-04-25', '2024-05-23'],
    maxParticipants: 22,
    currentParticipants: 8,
    instructor: 'Prof. Michael Chen',
    level: 'Intermediate',
    category: 'Leadership & Management',
    tags: ['change management', 'AI transformation', 'leadership', 'SME', 'digital strategy'],
    featured: true,
    heroImageUrl: '/images/trainings/change-management-hero.webp',
    pdfAttachmentUrl: '/attachments/change-management-toolkit.pdf',
  },
  {
    id: '3',
    title: 'Agentic AI Workshop',
    description: 'Build autonomous AI teammates capable of understanding goals, breaking down tasks, and executing complex processes.',
    longDescription: 'This advanced workshop explores how to create intelligent AI agents that go beyond single-prompt interactions. Learn to design AI agents for complex business processes like market research, email management, and project planning. You\'ll master agent components, build agents on specialized platforms, write master prompts, and design AI agent blueprints for your business needs. Perfect for SMEs ready to create autonomous AI systems with minimal human intervention.',
    price: 1299,
    currency: 'EUR',
    duration: '1 day',
    startDates: ['2024-03-15', '2024-04-12', '2024-05-10', '2024-06-14'],
    maxParticipants: 18,
    currentParticipants: 6,
    instructor: 'Dr. Elena Rodriguez',
    level: 'Advanced',
    category: 'AI & Technology',
    tags: ['agentic AI', 'AI agents', 'automation', 'advanced AI', 'machine learning', 'AI workflows'],
    featured: true,
    heroImageUrl: '/images/trainings/agentic-ai-hero.webp',
    pdfAttachmentUrl: '/attachments/agentic-ai-blueprint.pdf',
    prerequisites: ['AI & Prompt Engineering', 'AI-Powered Business Automation']
  },
  {
    id: '4',
    title: 'Practical Data Analysis for SMEs',
    description: 'Transform gut-feel decisions into data-backed strategies using accessible tools and AI-driven insights.',
    longDescription: 'This hands-on workshop debunks the myth that data analysis is exclusive to large corporations. Designed for SME leaders and business professionals, learn to define core data concepts, identify internal data sources, and master data cleaning with AI tools. Perform basic descriptive analysis, craft effective AI-driven insight prompts, and create Business Insights Dashboards. Unlock the power of your existing data through practical, accessible analysis methods using spreadsheets and AI.',
    price: 999,
    currency: 'EUR',
    duration: '1 day',
    startDates: ['2024-04-05', '2024-04-26', '2024-05-17', '2024-06-07'],
    maxParticipants: 22,
    currentParticipants: 14,
    instructor: 'Data Scientist Alex Thompson',
    level: 'Beginner',
    category: 'Data & Analytics',
    tags: ['data analysis', 'business insights', 'SME', 'spreadsheets', 'Excel', 'visualization'],
    featured: false,
    heroImageUrl: '/images/trainings/data-analysis-hero.webp',
    pdfAttachmentUrl: '/attachments/data-analysis-workbook.pdf',
  },
  {
    id: '5',
    title: 'AI-Powered Business Automation',
    description: 'Streamline your SME operations with intelligent automation solutions and AI-driven workflows.',
    longDescription: 'Discover how to automate repetitive business processes using AI tools and platforms. Learn to identify automation opportunities, design efficient workflows, and implement AI-powered solutions that save time and reduce errors. This practical workshop covers everything from simple task automation to complex business process optimization, specifically designed for resource-constrained SME environments.',
    price: 1199,
    currency: 'EUR',
    duration: '1 day',
    startDates: ['2024-04-20', '2024-05-11', '2024-06-01', '2024-06-22'],
    maxParticipants: 22,
    currentParticipants: 11,
    instructor: 'Automation Expert James Wilson',
    level: 'Intermediate',
    category: 'AI & Technology',
    tags: ['automation', 'business processes', 'AI workflows', 'efficiency', 'Zapier', 'API integration'],
    featured: false,
    heroImageUrl: '/images/trainings/business-automation-hero.webp',
    pdfAttachmentUrl: '/attachments/automation-playbook.pdf',
  },
  {
    id: '6',
    title: 'AI Strategy for SME Leaders',
    description: 'Develop a comprehensive AI strategy that aligns with your business goals and drives sustainable growth.',
    longDescription: 'This strategic workshop helps SME leaders create a roadmap for AI adoption that fits their unique business context. Learn to assess AI readiness, identify high-impact use cases, develop implementation timelines, and create governance frameworks. You\'ll leave with a practical AI strategy document and the knowledge to lead your organization\'s AI transformation confidently and effectively.',
    price: 1399,
    currency: 'EUR',
    duration: '1 day',
    startDates: ['2024-05-10', '2024-05-31', '2024-06-21', '2024-07-12'],
    maxParticipants: 22,
    currentParticipants: 9,
    instructor: 'Strategy Consultant Maria Garcia',
    level: 'Intermediate',
    category: 'Strategy & Planning',
    tags: ['AI strategy', 'business planning', 'SME leadership', 'digital transformation', 'ROI', 'governance'],
    featured: false,
    heroImageUrl: '/images/trainings/ai-strategy-hero.webp',
    pdfAttachmentUrl: '/attachments/ai-strategy-framework.pdf',
  }
]

export const mockTestimonials: Testimonial[] = [
  {
    id: '3',
    participantName: 'Emma Rodriguez',
    participantCompany: 'Move Intermodal',
    trainingTitle: 'Practical Data Analysis for SMEs',
    rating: 5,
    testimonial: 'Finally, a data analysis course that speaks SME language! Complex statistical concepts made simple and actionable. Our decision-making process is now completely data-driven.',
    date: '2024-01-10',
    featured: true,
  }
]

export const categories = [
  'All',
  'AI & Technology',
  'Leadership & Management',
  'Data & Analytics',
  'Strategy & Planning'
]

export const levels = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
]

// Helper functions
export const getFeaturedTrainings = () => mockTrainings.filter(training => training.featured)

export const getTrainingById = (id: string) => mockTrainings.find(training => training.id === id)

export const getTrainingsByCategory = (category: string) =>
  category === 'All'
    ? mockTrainings
    : mockTrainings.filter(training => training.category === category)

export const getTrainingsByLevel = (level: string) =>
  level === 'All Levels'
    ? mockTrainings
    : mockTrainings.filter(training => training.level === level)

export const formatPrice = (price: number, currency: string = 'EUR') =>
  new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: currency,
  }).format(price)

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-EU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

// Helper functions for testimonials
export const getFeaturedTestimonials = () => mockTestimonials.filter(testimonial => testimonial.featured)

export const getTestimonialsByTraining = (trainingTitle: string) =>
  mockTestimonials.filter(testimonial => testimonial.trainingTitle === trainingTitle)

export const renderStars = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}