import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Swapnil Nair | Software Engineer',
    template: '%s | Swapnil',
  },
  description: 'Multidisciplinary software engineer who can believes in building fast and breaking things.',
  openGraph: {
    title: 'Swapnil | Software Engineer',
    description: 'Multidisciplinary software engineer who can believes in building fast and breaking things.',
    url: baseUrl,
    siteName: 'ClosedAI',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
