# SEO Configuration Guide

## Overview

This project uses a centralized SEO configuration system to make it easy to add social media meta tags and SEO data to pages.

## Quick Start

### For New Pages

Import the helper and use it in your page's `<Head>`:

```tsx
import Head from 'next/head'
import { getMetaTags } from '@/lib/seo-config'

export default function MyPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {getMetaTags({
          title: 'My Custom Page Title',
          description: 'A great description of my page',
          url: 'https://sylvanity-training-site.netlify.app/my-page',
          keywords: 'keyword1, keyword2, keyword3'
        })}
      </Head>

      {/* Your page content */}
    </>
  )
}
```

### Using Default Values

If you don't provide values, defaults from `seo-config.ts` will be used:

```tsx
<Head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {getMetaTags()} {/* Uses all defaults */}
</Head>
```

### Partial Overrides

Only override what you need:

```tsx
{getMetaTags({
  title: 'Custom Title',  // Only change the title
  // description, url, image, etc. will use defaults
})}
```

## Configuration Options

Available options for `getMetaTags()`:

```typescript
interface PageSEO {
  title?: string        // Page title (used for <title>, OG, Twitter)
  description?: string  // Meta description
  url?: string         // Canonical URL
  image?: string       // Social media preview image
  type?: 'website' | 'article'  // OG type (default: 'website')
  keywords?: string    // SEO keywords (comma-separated)
}
```

## What Gets Generated

The `getMetaTags()` function automatically generates:

✅ **Basic SEO:**
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">` (if provided)
- `<link rel="canonical">`

✅ **Open Graph (Facebook, LinkedIn):**
- `og:type`
- `og:url`
- `og:title`
- `og:description`
- `og:site_name`
- `og:image`

✅ **Twitter Cards:**
- `twitter:card`
- `twitter:url`
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:site`

## Global Defaults

Located in `/lib/seo-config.ts`:

```typescript
export const DEFAULT_SEO = {
  siteName: 'Sylvanity Academy',
  siteUrl: 'https://sylvanity-training-site.netlify.app',
  defaultTitle: 'Sylvanity Academy - Professional AI Training Programs',
  defaultDescription: '...',
  defaultImage: 'https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png',
  twitterHandle: '@Sylvanity_BV',
}
```

## Global Meta Tags

The `pages/_document.tsx` file contains global meta tags that apply to ALL pages:
- Favicon
- Default OG image
- Default Twitter card type
- Author and robots meta tags

## Examples

### Training Page
```tsx
{getMetaTags({
  title: 'AI & Prompt Engineering Workshop - Sylvanity Academy',
  description: 'Master AI prompt engineering with our hands-on workshop...',
  url: 'https://sylvanity-training-site.netlify.app/trainings/ai-prompt',
  keywords: 'AI training, prompt engineering, ChatGPT, machine learning'
})}
```

### Blog Article
```tsx
{getMetaTags({
  title: 'How AI is Transforming SME Operations',
  description: 'Learn how small and medium enterprises can leverage AI...',
  url: 'https://sylvanity-training-site.netlify.app/blog/ai-transforms-smes',
  type: 'article',
  image: 'https://example.com/blog-post-image.jpg'
})}
```

### Contact Page
```tsx
{getMetaTags({
  title: 'Contact Sylvanity Academy',
  description: 'Get in touch with our team for training inquiries...',
  url: 'https://sylvanity-training-site.netlify.app/contact'
})}
```

## Updating Defaults

To change the default values used across all pages:

1. Open `/lib/seo-config.ts`
2. Modify the `DEFAULT_SEO` object
3. Save and rebuild

## Testing Social Previews

After updating meta tags, test them with:

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: Post preview in composer
- **Generic**: https://www.opengraph.xyz/

**Note:** Social platforms cache meta tags. Use the validators above to force a refresh.
