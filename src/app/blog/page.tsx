import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { CalendarDays, Tag, User, Clock } from 'lucide-react'
import { SearchBar } from '@/components/SearchBar'
import { TagFilter } from '@/components/TagFilter'
import { calculateReadingTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { [key: string]: string | undefined }
}

export default async function BlogPage({ searchParams }: PageProps) {
  const posts = await getAllPosts()
  
  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))
  
  // Filter posts based on search and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchParams.search || 
      post.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      post.description.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      post.content.toLowerCase().includes(searchParams.search.toLowerCase())
    
    const matchesTag = !searchParams.tag || post.tags.includes(searchParams.tag)
    
    return matchesSearch && matchesTag
  })

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-8 mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Blog Posts
            </h1>
            <SearchBar />
            <TagFilter tags={allTags} />
          </div>
          
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-lg border bg-card p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-foreground hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground">{post.description}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                      {calculateReadingTime(post.content)} min read
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
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center text-muted-foreground mt-12">
              No posts found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 