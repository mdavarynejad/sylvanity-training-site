/**
 * SEO Helper Components for Next.js
 * This file contains JSX helpers for generating meta tags
 */

import React from 'react'
import { generateMetaTags, PageSEO } from './seo-config'

/**
 * Generate JSX meta tags for Next.js Head component
 * Returns an array of React elements
 *
 * Usage:
 * <Head>
 *   {getMetaTags({ title: 'My Page', description: 'Description' })}
 * </Head>
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
