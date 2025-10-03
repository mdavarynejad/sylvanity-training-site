/**
 * SEO Configuration and Helper Utilities
 *
 * This file contains default SEO settings and helper functions
 * to generate meta tags for social media sharing.
 */

import React from 'react'

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
 * Returns an array of React elements instead of JSX Fragment
 */
export function getMetaTags(config: PageSEO = {}) {
  const meta = generateMetaTags(config)

  const tags = [
    // Basic Meta
    <title key="title">{meta.title}</title>,
    <meta key="description" name="description" content={meta.description} />,
    <link key="canonical" rel="canonical" href={meta.canonical} />,

    // Open Graph
    <meta key="og:type" property="og:type" content={meta.openGraph.type} />,
    <meta key="og:url" property="og:url" content={meta.openGraph.url} />,
    <meta key="og:title" property="og:title" content={meta.openGraph.title} />,
    <meta key="og:description" property="og:description" content={meta.openGraph.description} />,
    <meta key="og:site_name" property="og:site_name" content={meta.openGraph.siteName} />,
    <meta key="og:image" property="og:image" content={meta.openGraph.images[0].url} />,

    // Twitter
    <meta key="twitter:card" property="twitter:card" content={meta.twitter.card} />,
    <meta key="twitter:url" property="twitter:url" content={meta.twitter.url} />,
    <meta key="twitter:title" property="twitter:title" content={meta.twitter.title} />,
    <meta key="twitter:description" property="twitter:description" content={meta.twitter.description} />,
    <meta key="twitter:image" property="twitter:image" content={meta.twitter.image} />,
  ]

  // Add optional keywords
  if (meta.keywords) {
    tags.push(<meta key="keywords" name="keywords" content={meta.keywords} />)
  }

  // Add optional Twitter site
  if (meta.twitter.site) {
    tags.push(<meta key="twitter:site" property="twitter:site" content={meta.twitter.site} />)
  }

  return tags
}
