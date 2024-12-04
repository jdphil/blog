import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
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

      {/* Featured Posts Preview */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Featured Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* We'll add featured posts here later */}
            <div className="group relative rounded-lg border bg-background p-6 shadow-md transition-shadow hover:shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">Stay tuned for upcoming blog posts...</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
