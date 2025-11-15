import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City/area and country (e.g., "Belgravia, London")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectors',
      title: 'Sectors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sector' }] }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Select one or more sectors for this project',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
              {
                name: 'fileLink',
                type: 'object',
                title: 'File Download',
                fields: [
                  {
                    name: 'file',
                    type: 'file',
                    title: 'File',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: 'label',
                    type: 'string',
                    title: 'Download Label',
                    description: 'Optional custom text for the download link',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Brief description with formatting: paragraphs, bold, italic, bullet points, hyperlinks, and file downloads (single files only)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Current', value: 'current' },
          { title: 'Previous', value: 'previous' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Higher numbers appear first. Use 0 for default position. Example: 10 appears before 5 appears before 0',
      validation: (Rule) => Rule.required().integer().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'heroImage',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      return {
        title: title,
        subtitle: `${subtitle} • ${status}`,
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
    {
      title: 'Name, Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
  ],
})
