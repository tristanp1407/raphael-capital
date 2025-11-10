import { defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export default defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      description: 'Main tagline displayed in the footer',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Quietly originating, developing and managing institutional-grade projects across the United Kingdom since 1999.',
    }),
    defineField({
      name: 'quickLinksText',
      title: 'Quick Links Section Title',
      type: 'string',
      initialValue: 'Quick Links',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright line (year will be automatically added)',
      initialValue: 'Raphael Capital. All rights reserved.',
    }),
    defineField({
      name: 'copyrightTagline',
      title: 'Copyright Tagline',
      type: 'string',
      description: 'Secondary line below copyright',
      initialValue: 'Stewarding discreet UK real estate projects for partners.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Content',
      }
    },
  },
})
