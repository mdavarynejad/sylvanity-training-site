import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Global Open Graph / Facebook defaults */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sylvanity Academy" />
        <meta property="og:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />

        {/* Global Twitter defaults */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://sylvanity.eu/hs-fs/hubfs/LOGO%202.png" />

        {/* Global SEO defaults */}
        <meta name="author" content="Sylvanity B.V." />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
