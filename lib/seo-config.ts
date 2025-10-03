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
 * Generate meta tags for a page
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

/**
 * Helper to generate JSX meta tags for Next.js Head component
 */
export function getMetaTags(config: PageSEO = {}) {
  const meta = generateMetaTags(config)

  return (
    <>
      {/* Basic Meta */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <link rel="canonical" href={meta.canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={meta.openGraph.type} />
      <meta property="og:url" content={meta.openGraph.url} />
      <meta property="og:title" content={meta.openGraph.title} />
      <meta property="og:description" content={meta.openGraph.description} />
      <meta property="og:site_name" content={meta.openGraph.siteName} />
      <meta property="og:image" content={meta.openGraph.images[0].url} />

      {/* Twitter */}
      <meta property="twitter:card" content={meta.twitter.card} />
      <meta property="twitter:url" content={meta.twitter.url} />
      <meta property="twitter:title" content={meta.twitter.title} />
      <meta property="twitter:description" content={meta.twitter.description} />
      <meta property="twitter:image" content={meta.twitter.image} />
      {meta.twitter.site && <meta property="twitter:site" content={meta.twitter.site} />}
    </>
  )
}
