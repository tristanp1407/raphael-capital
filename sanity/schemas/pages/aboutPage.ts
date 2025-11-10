import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    // Intro Section
    defineField({
      name: 'introHeadline',
      title: 'Intro Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Heritage stewardship, institutional discipline',
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Intro Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),

    // Team Section
    defineField({
      name: 'teamHeadline',
      title: 'Team Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'The Team',
    }),

    // Brands Section
    defineField({
      name: 'brandsHeadline',
      title: 'Brands Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Trusted by leading brands',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      initialValue: 'About Raphael Capital | UK Property Investment & Development',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      initialValue:
        'Learn how Raphael Capital acquires and develops UK real estate with private capital, delivering discreet transactions across retail, office, mixed-use and residential sectors.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
