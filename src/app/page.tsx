import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { calculateReadingTime } from "@/lib/utils"
import { NewsletterForm } from "@/components/NewsletterForm"
import { Suspense } from "react"

export default async function Home() {
  const allPosts = await getAllPosts()
  // Get the latest 3 posts
  const featuredPosts = allPosts.slice(0, 3)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Grow with JP
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Exploring personal growth, technology, and life lessons. Join me on this journey of continuous learning and development.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Read Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 bg-background border-t border-b">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-[600px]">
            <Suspense fallback={<div className="w-full rounded-lg border bg-card p-8 shadow-sm animate-pulse" />}>
              <NewsletterForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Posts Preview */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Featured Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative rounded-lg border bg-background p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <article className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.date}>{post.date}</time>
                    <span>•</span>
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs bg-secondary px-2.5 py-0.5 rounded-full text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center text-sm font-medium text-primary hover:text-primary/90"
            >
              View all posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
