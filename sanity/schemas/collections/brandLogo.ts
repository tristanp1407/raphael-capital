import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'brandLogo',
  title: 'Brand Logo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      description: 'SVG or PNG logo (transparent background recommended)',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().integer().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only active logos will be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      active: 'active',
    },
    prepare(selection) {
      const { title, media, active } = selection
      return {
        title: title,
        subtitle: active ? 'Active' : 'Inactive',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
