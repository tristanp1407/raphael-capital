"use client"

import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

// Custom components for rendering Portable Text
const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const { href, blank } = value
      const target = blank ? '_blank' : undefined
      const rel = blank ? 'noopener noreferrer' : undefined

      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className="text-rc-navy underline hover:text-rc-indigo transition-colors"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2 last:mb-0">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
  },
}

interface PortableTextRendererProps {
  value: PortableTextBlock[] | string
  className?: string
}

export function PortableTextRenderer({
  value,
  className,
}: PortableTextRendererProps) {
  // Handle backward compatibility with plain text strings
  if (typeof value === 'string') {
    return <p className={className}>{value}</p>
  }

  // Handle empty or invalid values
  if (!value || value.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}
