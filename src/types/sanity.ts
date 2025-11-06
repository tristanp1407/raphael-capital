import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type ProjectStatus = 'current' | 'previous'

export interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata: {
      lqip: string
      dimensions: {
        width: number
        height: number
        aspectRatio: number
      }
    }
  }
  alt: string
  caption?: string
}

export interface Sector {
  _id: string
  name: string
  slug: string
  order: number
}

export interface Project {
  _id: string
  name: string
  slug: string
  location: string
  sectors: Sector[]
  summary: string
  status: ProjectStatus
  featured: boolean
  heroImage?: SanityImage
  gallery?: SanityImage[]
}

export interface ProjectSlug {
  slug: string
}
