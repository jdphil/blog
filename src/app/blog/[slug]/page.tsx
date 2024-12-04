import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { CalendarDays, Tag, User, Clock } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import { calculateReadingTime } from '@/lib/utils'
import { track } from '@vercel/analytics'

interface Props {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const posts = await getPostSlugs()
  return posts.map((post) => ({
    slug: post.replace(/\.md$/, ''),
  }))
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    return {
      title: `${post.title} - Grow with Lin`,
      description: post.description,
    }
  } catch {
    return {
      title: 'Post Not Found - Grow with Lin',
      description: 'The requested blog post could not be found.',
    }
  }
}

export default async function BlogPostPage(props: Props) {
  try {
    const post = await getPostBySlug(props.params.slug)
    const processedContent = await remark()
      .use(html)
      .process(post.content)
    const contentHtml = processedContent.toString()
    const readingTime = calculateReadingTime(post.content)

    // Track page view with properly typed parameters
    track('post_view', {
      title: post.title,
      slug: props.params.slug,
      author: post.author,
      tags: post.tags.join(',') // Convert array to string
    })

    return (
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
    )
  } catch {
    notFound()
  }
} 