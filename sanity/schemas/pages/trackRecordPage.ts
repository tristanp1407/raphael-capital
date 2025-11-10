import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export default defineType({
  name: 'trackRecordPage',
  title: 'Track Record Page',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Current and previous projects across sectors',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      initialValue:
        'Our portfolio spans prime retail frontages, headquarters offices, urban logistics and mixed-use regeneration. Each project is structured to protect capital, unlock hidden value and deliver dependable income.',
    }),

    // Filter Labels
    defineField({
      name: 'filterAllLabel',
      title: 'Filter "All" Label',
      type: 'string',
      initialValue: 'All',
    }),
    defineField({
      name: 'filterCurrentLabel',
      title: 'Filter "Current" Label',
      type: 'string',
      initialValue: 'Current',
    }),
    defineField({
      name: 'filterPreviousLabel',
      title: 'Filter "Previous" Label',
      type: 'string',
      initialValue: 'Previous',
    }),
    defineField({
      name: 'showMoreButtonText',
      title: 'Show More Button Text',
      type: 'string',
      initialValue: 'Show more properties',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      initialValue: 'Projects | Raphael Capital',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      initialValue:
        "Review Raphael Capital's current and previous UK property projects across retail, office, industrial, residential, mixed-use and development sectors.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Track Record Page',
      }
    },
  },
})
