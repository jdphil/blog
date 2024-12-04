import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { CalendarDays, Tag, User, Clock } from 'lucide-react'
import type { Metadata } from 'next'
import type { ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import { calculateReadingTime, generatePostJsonLd } from '@/lib/utils'
import { track } from '@vercel/analytics/server'
import { headers } from 'next/headers'
import Script from 'next/script'

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((post) => ({
    slug: post.replace(/\.md$/, ''),
  }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    const previousImages = (await parent).openGraph?.images || []
    const baseUrl = 'https://jonathanphillipo.com'

    return {
      title: `${post.title} - Grow with JP`,
      description: post.description,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
      openGraph: {
        type: 'article',
        title: post.title,
        description: post.description,
        publishedTime: post.date,
        authors: [post.author],
        images: [...previousImages],
        url: `${baseUrl}/blog/${params.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
      },
      keywords: post.tags,
      authors: [{ name: post.author }],
      publisher: 'Grow with JP',
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
  } catch {
    return {
      title: 'Post Not Found - Grow with JP',
      description: 'The requested blog post could not be found.',
    }
  }
}

interface BlogPostPageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug)
    const processedContent = await remark()
      .use(html)
      .process(post.content)
    const contentHtml = processedContent.toString()
    const readingTime = calculateReadingTime(post.content)
    const baseUrl = 'https://jonathanphillipo.com'
    const jsonLd = generatePostJsonLd(post, baseUrl)

    // Track page view with headers for proper context
    track('post_view', {
      title: post.title,
      slug: params.slug,
      author: post.author,
      tags: post.tags.join(',')
    }, { headers: headers() })

    return (
      <>
        <Script
          id="post-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="flex min-h-screen flex-col">
          <div className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <div className="space-y-6">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {readingTime} min read
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs bg-secondary px-2.5 py-0.5 rounded-full text-secondary-foreground"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="prose prose-gray dark:prose-invert max-w-none mt-12"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>
            </div>
          </div>
        </article>
      </>
    )
  } catch {
    notFound()
  }
} 