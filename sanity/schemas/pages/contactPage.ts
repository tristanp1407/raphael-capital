import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // Main Content
    defineField({
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Speak with the partnership',
    }),

    // Leadership Section
    defineField({
      name: 'leadershipSectionHeading',
      title: 'Leadership Section Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Leadership team',
    }),

    // Office Section
    defineField({
      name: 'officeSectionHeading',
      title: 'Office Section Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Office',
    }),

    // Contact Form Labels
    defineField({
      name: 'formHeadline',
      title: 'Contact Form Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Send us a message',
    }),
    defineField({
      name: 'formNameLabel',
      title: 'Form Name Field Label',
      type: 'string',
      initialValue: 'Name',
    }),
    defineField({
      name: 'formEmailLabel',
      title: 'Form Email Field Label',
      type: 'string',
      initialValue: 'Email',
    }),
    defineField({
      name: 'formSubjectLabel',
      title: 'Form Subject Field Label',
      type: 'string',
      initialValue: 'Subject',
    }),
    defineField({
      name: 'formMessageLabel',
      title: 'Form Message Field Label',
      type: 'string',
      initialValue: 'Message',
    }),
    defineField({
      name: 'formSubmitButtonText',
      title: 'Form Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'formSubmittingText',
      title: 'Form Submitting Text',
      type: 'string',
      initialValue: 'Sending...',
    }),
    defineField({
      name: 'formSuccessText',
      title: 'Form Success Text',
      type: 'string',
      initialValue: '✓ Message Sent',
    }),
    defineField({
      name: 'formErrorMessage',
      title: 'Form Error Message',
      type: 'text',
      rows: 2,
      initialValue: 'There was an error sending your message. Please try again or contact us directly.',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
      initialValue: 'Contact Raphael Capital | UK Property Investment',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      initialValue:
        'Get in touch with Raphael Capital to discuss discreet property investment opportunities across retail, office, residential and mixed-use sectors in the UK.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
      }
    },
  },
})
