'use client'

import { Tag as TagIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface TagFilterProps {
  tags: string[]
}

export function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex flex-wrap gap-2">
      {Array.from(new Set(tags)).map((tag) => (
        <button
          key={tag}
          onClick={() => {
            router.push(`/blog?${createQueryString('tag', tag)}`)
          }}
          className={`inline-flex items-center text-sm px-3 py-1 rounded-full transition-colors
            ${
              activeTag === tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
        >
          <TagIcon className="mr-1 h-3 w-3" />
          {tag}
        </button>
      ))}
    </div>
  )
} 