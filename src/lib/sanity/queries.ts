import { groq } from 'next-sanity'

// Get all sectors
export const allSectorsQuery = groq`
  *[_type == "sector"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    order
  }
`

// Get all projects
export const allProjectsQuery = groq`
  *[_type == "project"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    sectors[]->{
      _id,
      name,
      "slug": slug.current
    },
    summary,
    status,
    featured,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    }
  }
`

// Get featured projects
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    sectors[]->{
      _id,
      name,
      "slug": slug.current
    },
    summary,
    status,
    featured,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    }
  }
`

// Get project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    location,
    sectors[]->{
      _id,
      name,
      "slug": slug.current
    },
    summary,
    status,
    featured,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      caption
    }
  }
`

// Get all project slugs (for static generation)
export const projectSlugsQuery = groq`
  *[_type == "project"] {
    "slug": slug.current
  }
`

// Get current projects
export const currentProjectsQuery = groq`
  *[_type == "project" && status == "current"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    sectors[]->{
      _id,
      name,
      "slug": slug.current
    },
    summary,
    status,
    featured,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    }
  }
`

// Get previous projects
export const previousProjectsQuery = groq`
  *[_type == "project" && status == "previous"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    sectors[]->{
      _id,
      name,
      "slug": slug.current
    },
    summary,
    status,
    featured,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    }
  }
`
