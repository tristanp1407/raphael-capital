import { StructureBuilder } from 'sanity/structure'
import {
  CogIcon,
  ComposeIcon,
  DocumentsIcon,
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PinIcon,
  BulbOutlineIcon,
  UserIcon,
  ImageIcon,
  ThListIcon,
  TagIcon,
} from '@sanity/icons'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages Section
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .icon(UsersIcon)
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Track Record Page')
                .icon(DocumentsIcon)
                .child(
                  S.document().schemaType('trackRecordPage').documentId('trackRecordPage')
                ),
              S.listItem()
                .title('Requirements Page')
                .icon(DocumentTextIcon)
                .child(
                  S.document().schemaType('requirementsPage').documentId('requirementsPage')
                ),
              S.listItem()
                .title('Contact Page')
                .icon(EnvelopeIcon)
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ])
        ),

      S.divider(),

      // Projects & Sectors Section
      S.listItem()
        .title('Projects')
        .icon(ThListIcon)
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Sectors')
        .icon(TagIcon)
        .child(S.documentTypeList('sector').title('Sectors')),

      S.divider(),

      // Team & Brands Section
      S.listItem()
        .title('Team Members')
        .icon(UserIcon)
        .child(S.documentTypeList('teamMember').title('Team Members')),
      S.listItem()
        .title('Brand Logos')
        .icon(ImageIcon)
        .child(S.documentTypeList('brandLogo').title('Brand Logos')),

      S.divider(),

      // Site Settings Section
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('General Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Footer Content')
                .icon(ComposeIcon)
                .child(
                  S.document().schemaType('footerContent').documentId('footerContent')
                ),
              S.listItem()
                .title('Contact Information')
                .icon(PinIcon)
                .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
              S.listItem()
                .title('Investment Highlights')
                .icon(BulbOutlineIcon)
                .child(
                  S.document()
                    .schemaType('investmentHighlights')
                    .documentId('investmentHighlights')
                ),
            ])
        ),
    ])

export default structure
