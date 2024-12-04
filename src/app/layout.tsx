import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Script from 'next/script'
import { generateWebsiteJsonLd } from '@/lib/utils'
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const baseUrl = 'https://jonathanphillipo.com'

export const metadata: Metadata = {
  title: {
    default: 'Grow with JP',
    template: '%s - Grow with JP',
  },
  description: 'A personal blog about growth, technology, finance, and development',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Grow with JP',
    title: 'Grow with JP',
    description: 'A personal blog about growth, technology, finance, and development',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow with JP',
    description: 'A personal blog about growth, technology, finance, and development',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  keywords: ['blog', 'technology', 'finance', 'personal development', 'growth'],
  authors: [{ name: 'JP' }],
  creator: 'JP',
  publisher: 'Grow with JP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = generateWebsiteJsonLd(baseUrl)

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
