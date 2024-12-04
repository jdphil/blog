import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Post } from "./blog"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function generatePostJsonLd(post: Post, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "keywords": post.tags.join(","),
    "url": `${baseUrl}/blog/${post.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Grow with JP",
      "url": baseUrl
    }
  }
}

export function generateWebsiteJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Grow with JP",
    "description": "A personal blog about growth and development",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
}
