import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Grow with JP',
  description: 'A personal blog about growth and development',
  metadataBase: new URL('https://jonathanphillipo.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
