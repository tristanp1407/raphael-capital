import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Raphael Capital',
    }),
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 3,
      description: 'Short description of the company for SEO and general use',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Fallback title for pages without specific SEO settings',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      description: 'Fallback description for pages without specific SEO settings',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph Image',
      type: 'image',
      description: 'Default social media share image (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
