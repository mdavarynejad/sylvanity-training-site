/**
 * SEO Configuration and Helper Utilities
 *
 * This file contains default SEO settings and helper functions
 * to generate meta tags for social media sharing.
 */

export const DEFAULT_SEO = {
  siteName: 'Sylvanity Academy',
  siteUrl: 'https://sylvanity-training-site.netlify.app',
  defaultTitle: 'Sylvanity Academy - Professional AI Training Programs',
  defaultDescription: 'Expert-led AI and technology training programs for SME professionals. Learn artificial intelligence, machine learning, data analytics, and leadership development.',
  defaultImage: 'https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png',
  twitterHandle: '@Sylvanity_BV',
}

export interface PageSEO {
  title?: string
  description?: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string
}

/**
 * Generate meta tags configuration for a page
 * Pages only need to specify what's different from defaults
 */
export function generateMetaTags(config: PageSEO = {}) {
  const {
    title = DEFAULT_SEO.defaultTitle,
    description = DEFAULT_SEO.defaultDescription,
    url = DEFAULT_SEO.siteUrl,
    image = DEFAULT_SEO.defaultImage,
    type = 'website',
    keywords,
  } = config

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: DEFAULT_SEO.siteName,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      url,
      title,
      description,
      image,
      site: DEFAULT_SEO.twitterHandle,
    },
    keywords,
  }
}
