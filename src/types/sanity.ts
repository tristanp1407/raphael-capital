import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'

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
  summary: PortableTextBlock[] | string // Portable Text or plain text (backward compatibility)
  status: ProjectStatus
  featured: boolean
  order: number
  heroImage?: SanityImage
  gallery?: SanityImage[]
}

export interface ProjectSlug {
  slug: string
}

// Global Singletons
export interface SiteSettings {
  companyName: string
  companyDescription: string
  defaultSeoTitle: string
  defaultSeoDescription: string
  defaultOgImage?: SanityImage
}

export interface FooterContent {
  tagline: string
  quickLinksText: string
  quickLinks: Array<{
    text: string
    href: string
  }>
  copyrightText: string
  copyrightTagline: string
}

export interface ContactInfo {
  companyLegalName: string
  addressLine1: string
  addressLine2?: string
  city: string
  postcode: string
  country: string
  mapLatitude: number
  mapLongitude: number
}

// Collections
export interface TeamMember {
  _id: string
  name: string
  role: string
  email: string
  phone?: string
  bio?: string[]
  photo?: SanityImage
  order: number
}

export interface BrandLogo {
  _id: string
  name: string
  logo: SanityImage
  order: number
  active: boolean
}

// Page Singletons
export interface HomePage {
  heroHeading: string
  heroSubheading: string
  heroCta1Text: string
  heroCta1Href: string
  heroCta2Text: string
  heroCta2Href: string
  featuredHeadline: string
  featuredBodyText: string
  aboutHeadline: string
  aboutParagraphs: string[]
  aboutLinkText: string
  ctaBannerHeadline: string
  ctaBannerSubheadline: string
  ctaBannerHref: string
  seoTitle: string
  seoDescription: string
}

export interface AboutPage {
  introHeadline: string
  introParagraphs: string[]
  teamHeadline: string
  brandsHeadline: string
  seoTitle: string
  seoDescription: string
}

export interface TrackRecordPage {
  headline: string
  introText: string
  filterAllLabel: string
  filterCurrentLabel: string
  filterPreviousLabel: string
  showMoreButtonText: string
  seoTitle: string
  seoDescription: string
}

export interface RequirementsPage {
  introHeadline: string
  introBodyText: string
  assetProfilesSubheadline: string
  assetProfilesIntro: string
  requirements: Array<{
    label: string
    value: string
  }>
  ctaBannerHeadline: string
  ctaBannerSubheadline: string
  ctaBannerHref: string
  seoTitle: string
  seoDescription: string
}

export interface ContactPage {
  mainHeadline: string
  leadershipSectionHeading: string
  officeSectionHeading: string
  formHeadline: string
  formNameLabel: string
  formEmailLabel: string
  formSubjectLabel: string
  formMessageLabel: string
  formSubmitButtonText: string
  formSubmittingText: string
  formSuccessText: string
  formErrorMessage: string
  seoTitle: string
  seoDescription: string
}
