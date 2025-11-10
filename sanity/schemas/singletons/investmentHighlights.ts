import { defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'investmentHighlights',
  title: 'Investment Highlights',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'sectionHeadline',
      title: 'Section Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Investment highlights',
    }),
    defineField({
      name: 'introParagraphs',
      title: 'Introduction Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      description: 'Introductory text before the highlights (uses project name and location dynamically)',
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlight Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
      description: 'These highlights will be displayed on all project pages that have highlights enabled',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Investment Highlights (Global)',
      }
    },
  },
})
