import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

/**
 * Convert Portable Text to plain text and truncate
 * Handles backward compatibility with plain text strings
 */
export function truncatePortableText(
  blocks: PortableTextBlock[] | string,
  maxLength: number = 150
): string {
  // Handle backward compatibility: if it's already a string, use it
  if (typeof blocks === 'string') {
    return truncateString(blocks, maxLength)
  }

  // Convert Portable Text to plain text
  const plainText = toPlainText(blocks)
  return truncateString(plainText, maxLength)
}

/**
 * Convert Portable Text blocks to plain text
 * Handles backward compatibility with plain text strings
 */
export function portableTextToPlainText(blocks: PortableTextBlock[] | string): string {
  // Handle backward compatibility
  if (typeof blocks === 'string') {
    return blocks
  }

  return toPlainText(blocks)
}

/**
 * Truncate string at word boundary
 */
function truncateString(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
}
