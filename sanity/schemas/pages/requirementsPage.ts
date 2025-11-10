import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'requirementsPage',
  title: 'Requirements Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    // Intro Section
    defineField({
      name: 'introHeadline',
      title: 'Intro Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Off-market equity & debt opportunities',
    }),
    defineField({
      name: 'introBodyText',
      title: 'Intro Body Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      initialValue:
        'We structure complex off-market opportunities on behalf of family offices and institutional partners. Our track record spans retail, office, residential, mixed-use and logistics across prime UK locations. If you have an opportunity that requires discretion, forensic diligence and patient capital, we would welcome an introduction.',
    }),

    // Asset Profiles Section
    defineField({
      name: 'assetProfilesSubheadline',
      title: 'Asset Profiles Subheadline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Asset profiles',
    }),
    defineField({
      name: 'assetProfilesIntro',
      title: 'Asset Profiles Intro',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      initialValue:
        'We prioritise opportunities that align with our core competencies and investment thesis. Indicative criteria include:',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // CTA Banner
    defineField({
      name: 'ctaBannerHeadline',
      title: 'CTA Banner Headline',
      type: 'string',
      initialValue: 'Have an opportunity?',
    }),
    defineField({
      name: 'ctaBannerSubheadline',
      title: 'CTA Banner Subheadline',
      type: 'string',
      initialValue: 'Contact us →',
    }),
    defineField({
      name: 'ctaBannerHref',
      title: 'CTA Banner Link',
      type: 'string',
      initialValue: '/contact',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      initialValue: 'Acquisition Requirements | Raphael Capital',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      initialValue:
        'Raphael Capital seeks off-market UK property investments across retail, office, mixed-use and residential sectors for family office and institutional partners.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Requirements Page',
      }
    },
  },
})
