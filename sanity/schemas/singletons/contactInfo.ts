import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'companyLegalName',
      title: 'Company Legal Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Raphael Property Investment Co. Ltd.',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: "18 Jacob's Well Mews",
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'London',
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'W1U 3DR',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'United Kingdom',
    }),
    defineField({
      name: 'mapLatitude',
      title: 'Map Latitude',
      type: 'number',
      description: 'Latitude for Google Maps',
      initialValue: 51.5213,
    }),
    defineField({
      name: 'mapLongitude',
      title: 'Map Longitude',
      type: 'number',
      description: 'Longitude for Google Maps',
      initialValue: -0.1568,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
      }
    },
  },
})
