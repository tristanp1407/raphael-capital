import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Twenty-five years of investment with certainty and discretion.',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      initialValue:
        'A private investment house specialising in prime UK real estate. We structure, acquire and steward assets with quiet conviction for family offices and institutional partners.',
    }),
    defineField({
      name: 'heroCta1Text',
      title: 'Hero CTA 1 Text',
      type: 'string',
      initialValue: 'View Projects',
    }),
    defineField({
      name: 'heroCta1Href',
      title: 'Hero CTA 1 Link',
      type: 'string',
      initialValue: '/track-record',
    }),
    defineField({
      name: 'heroCta2Text',
      title: 'Hero CTA 2 Text',
      type: 'string',
      initialValue: 'Requirements',
    }),
    defineField({
      name: 'heroCta2Href',
      title: 'Hero CTA 2 Link',
      type: 'string',
      initialValue: '/requirements',
    }),

    // Featured Properties Section
    defineField({
      name: 'featuredHeadline',
      title: 'Featured Properties Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Selected mandates',
    }),
    defineField({
      name: 'featuredBodyText',
      title: 'Featured Properties Body Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      initialValue:
        'We structure and steward complex, off-market transactions on behalf of family offices and institutional co-investors. Each mandate is underpinned by forensic due diligence, discreet execution and long-term value creation.',
    }),

    // About Overview Section
    defineField({
      name: 'aboutHeadline',
      title: 'About Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'A discreet partner for generational capital',
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Section Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: 'aboutLinkText',
      title: 'About Section Link Text',
      type: 'string',
      initialValue: 'About us →',
    }),

    // CTA Banner
    defineField({
      name: 'ctaBannerHeadline',
      title: 'CTA Banner Headline',
      type: 'string',
      initialValue: 'Explore our previous and current projects',
    }),
    defineField({
      name: 'ctaBannerSubheadline',
      title: 'CTA Banner Subheadline',
      type: 'string',
      initialValue: 'View Projects →',
    }),
    defineField({
      name: 'ctaBannerHref',
      title: 'CTA Banner Link',
      type: 'string',
      initialValue: '/track-record',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      initialValue: 'Raphael Capital | Private Property Investment & Development',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      initialValue:
        'Raphael Capital is a privately owned UK property investment company acquiring and repositioning assets across retail, mixed-use, residential, office and industrial sectors.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
