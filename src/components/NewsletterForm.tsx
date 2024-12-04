'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      console.log('Submitting email:', email)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      console.log('Subscription response:', { status: response.status, data })

      if (!response.ok) throw new Error(data.message || 'Something went wrong')

      setStatus('success')
      setMessage(data.message || 'Thanks for subscribing! Please check your email to confirm.')
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to subscribe. Please try again later.'
      )
    }
  }

  return (
    <div className={cn(
      "w-full rounded-lg border bg-card p-8 shadow-sm",
      status === 'success' && "bg-green-50 dark:bg-green-900/10"
    )}>
      <h3 className="text-2xl font-bold tracking-tight">Subscribe to my newsletter</h3>
      <p className="mt-2 text-muted-foreground">
        Get notified when I publish new blog posts. No spam, unsubscribe at any time.
      </p>
      {status !== 'success' ? (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-md border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span className="inline-flex items-center gap-1">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Subscribing...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </span>
            )}
          </button>
        </form>
      ) : null}
      {message && (
        <p
          className={cn(
            "mt-4 text-sm",
            status === 'error' ? "text-red-500" : "text-green-500"
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
} 