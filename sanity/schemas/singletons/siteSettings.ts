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
      name: 'projectLabelPlural',
      title: 'Projects label (plural)',
      type: 'string',
      initialValue: 'Projects',
      description:
        'Used in nav, breadcrumbs, default CTAs and auto-generated SEO titles. Free-text fields elsewhere (homepage, footer) need to be edited separately.',
    }),
    defineField({
      name: 'projectLabelSingular',
      title: 'Project label (singular)',
      type: 'string',
      initialValue: 'Project',
      description: 'Used in singular contexts (e.g. "Project not found", individual page titles).',
    }),
    defineField({
      name: 'showNewsNav',
      title: 'Show "News" link in nav and footer',
      type: 'boolean',
      description:
        'Hides or reveals the News tab in the main navigation and the footer Quick Links. Leave off until you have news posts to publish.',
      initialValue: false,
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
