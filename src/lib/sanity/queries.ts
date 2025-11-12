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
  *[_type == "project"] | order(coalesce(order, -1) desc) {
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
    order,
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
  *[_type == "project" && featured == true] | order(coalesce(order, -1) desc) {
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
    order,
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
    order,
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
  *[_type == "project" && status == "current"] | order(order asc) {
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
    order,
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
  *[_type == "project" && status == "previous"] | order(order asc) {
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
    order,
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

// ========== GLOBAL SINGLETONS ==========

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    companyDescription,
    defaultSeoTitle,
    defaultSeoDescription,
    defaultOgImage {
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

// Get footer content
export const footerContentQuery = groq`
  *[_type == "footerContent"][0] {
    tagline,
    quickLinksText,
    quickLinks[] {
      text,
      href
    },
    copyrightText,
    copyrightTagline
  }
`

// Get contact info
export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    companyLegalName,
    addressLine1,
    addressLine2,
    city,
    postcode,
    country,
    mapLatitude,
    mapLongitude
  }
`

// ========== COLLECTIONS ==========

// Get all team members
export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    email,
    phone,
    bio,
    photo {
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
    order
  }
`

// Get team members for about page
export const aboutTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    email,
    phone,
    bio,
    photo {
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
    order
  }
`

// Get team members for footer/contact
export const footerTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    email,
    phone,
    order
  }
`

// Get all brand logos
export const allBrandLogosQuery = groq`
  *[_type == "brandLogo" && active == true] | order(order asc) {
    _id,
    name,
    logo {
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
    order
  }
`

// ========== PAGE SINGLETONS ==========

// Get home page content
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeading,
    heroSubheading,
    heroCta1Text,
    heroCta1Href,
    heroCta2Text,
    heroCta2Href,
    featuredHeadline,
    featuredBodyText,
    aboutHeadline,
    aboutParagraphs,
    aboutLinkText,
    ctaBannerHeadline,
    ctaBannerSubheadline,
    ctaBannerHref,
    seoTitle,
    seoDescription
  }
`

// Get about page content
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    introHeadline,
    introParagraphs,
    teamHeadline,
    brandsHeadline,
    seoTitle,
    seoDescription
  }
`

// Get track record page content
export const trackRecordPageQuery = groq`
  *[_type == "trackRecordPage"][0] {
    headline,
    introText,
    filterAllLabel,
    filterCurrentLabel,
    filterPreviousLabel,
    showMoreButtonText,
    seoTitle,
    seoDescription
  }
`

// Get requirements page content
export const requirementsPageQuery = groq`
  *[_type == "requirementsPage"][0] {
    introHeadline,
    introBodyText,
    assetProfilesSubheadline,
    assetProfilesIntro,
    requirements[] {
      label,
      value
    },
    ctaBannerHeadline,
    ctaBannerSubheadline,
    ctaBannerHref,
    seoTitle,
    seoDescription
  }
`

// Get contact page content
export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    mainHeadline,
    leadershipSectionHeading,
    officeSectionHeading,
    formHeadline,
    formNameLabel,
    formEmailLabel,
    formSubjectLabel,
    formMessageLabel,
    formSubmitButtonText,
    formSubmittingText,
    formSuccessText,
    formErrorMessage,
    seoTitle,
    seoDescription
  }
`
