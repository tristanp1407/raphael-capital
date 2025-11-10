import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function migratePageContent() {
  console.log('🚀 Starting page content migration...\n')

  try {
    // 1. Create Home Page
    console.log('📝 Creating home page content...')
    await client.createOrReplace({
      _id: 'homePage',
      _type: 'homePage',
      heroHeading: 'Twenty-five years of investment with certainty and discretion.',
      heroSubheading:
        'A private investment house specialising in prime UK real estate. We structure, acquire and steward assets with quiet conviction for family offices and institutional partners.',
      heroCta1Text: 'View Projects',
      heroCta1Href: '/track-record',
      heroCta2Text: 'Requirements',
      heroCta2Href: '/requirements',
      featuredHeadline: 'Selected mandates',
      featuredBodyText:
        'We structure and steward complex, off-market transactions on behalf of family offices and institutional co-investors. Each mandate is underpinned by forensic due diligence, discreet execution and long-term value creation.',
      aboutHeadline: 'A discreet partner for generational capital',
      aboutParagraphs: [
        'Raphael Capital was founded in 1999 to deploy private family capital into prime UK real estate. Over 25 years, we have structured and stewarded more than £2 billion of investment activity across retail, office, residential, mixed-use and development sectors.',
        'We maintain a deliberately small team, low public profile and complete discretion in all transactions. Our approach is characterised by forensic due diligence, patient capital and active asset management.',
        'We invest our own balance sheet alongside every mandate, ensuring complete alignment of interest with our family office and institutional partners.',
      ],
      aboutLinkText: 'About us →',
      ctaBannerHeadline: 'Explore our previous and current projects',
      ctaBannerSubheadline: 'View Projects →',
      ctaBannerHref: '/track-record',
      seoTitle: 'Raphael Capital | Private Property Investment & Development',
      seoDescription:
        'Raphael Capital is a privately owned UK property investment company acquiring and repositioning assets across retail, mixed-use, residential, office and industrial sectors.',
    })
    console.log('✅ Home page created')

    // 2. Create About Page
    console.log('📝 Creating about page content...')
    await client.createOrReplace({
      _id: 'aboutPage',
      _type: 'aboutPage',
      introHeadline: 'Heritage stewardship, institutional discipline',
      introParagraphs: [
        'Raphael Capital was founded in 1999 to deploy private family capital into prime UK real estate. Over 25 years, we have structured and stewarded more than £2 billion of investment activity across retail, office, residential, mixed-use and development sectors.',
        'Our approach is characterised by forensic due diligence, discreet execution and patient capital. We maintain a deliberately small team and low public profile, prioritising long-term value creation over short-term opportunism.',
        'We invest our own balance sheet alongside every mandate, ensuring complete alignment of interest with our family office and institutional partners. This co-investment model has delivered consistent, risk-adjusted returns across multiple property cycles.',
        'We specialise in complex, off-market transactions requiring speed, certainty and absolute confidentiality. Our track record includes heritage repositioning, mixed-use regeneration, prime retail frontages and headquarters office refurbishment.',
      ],
      teamHeadline: 'The Team',
      brandsHeadline: 'Trusted by leading brands',
      seoTitle: 'About Raphael Capital | UK Property Investment & Development',
      seoDescription:
        'Learn how Raphael Capital acquires and develops UK real estate with private capital, delivering discreet transactions across retail, office, mixed-use and residential sectors.',
    })
    console.log('✅ About page created')

    // 3. Create Track Record Page
    console.log('📝 Creating track record page content...')
    await client.createOrReplace({
      _id: 'trackRecordPage',
      _type: 'trackRecordPage',
      headline: 'Current and previous projects across sectors',
      introText:
        'Our portfolio spans prime retail frontages, headquarters offices, urban logistics and mixed-use regeneration. Each project is structured to protect capital, unlock hidden value and deliver dependable income.',
      filterAllLabel: 'All',
      filterCurrentLabel: 'Current',
      filterPreviousLabel: 'Previous',
      showMoreButtonText: 'Show more properties',
      seoTitle: 'Projects | Raphael Capital',
      seoDescription:
        "Review Raphael Capital's current and previous UK property projects across retail, office, industrial, residential, mixed-use and development sectors.",
    })
    console.log('✅ Track record page created')

    // 4. Create Requirements Page
    console.log('📝 Creating requirements page content...')
    await client.createOrReplace({
      _id: 'requirementsPage',
      _type: 'requirementsPage',
      introHeadline: 'Off-market equity & debt opportunities',
      introBodyText:
        'We structure complex off-market opportunities on behalf of family offices and institutional partners. Our track record spans retail, office, residential, mixed-use and logistics across prime UK locations. If you have an opportunity that requires discretion, forensic diligence and patient capital, we would welcome an introduction.',
      assetProfilesSubheadline: 'Asset profiles',
      assetProfilesIntro:
        'We prioritise opportunities that align with our core competencies and investment thesis. Indicative criteria include:',
      requirements: [
        { label: 'Mixed-use', value: 'Mixed-use blocks with retail and residential components' },
        { label: 'Retail', value: 'Retail units and uppers in strong trading locations' },
        {
          label: 'Offices',
          value: 'Offices suited to repositioning or active asset management',
        },
        { label: 'Industrial', value: 'Industrial warehouses including urban logistics' },
        { label: 'Shopping centres', value: 'Shopping centres with value-add potential' },
        {
          label: 'Care homes',
          value: 'Retirement and care homes with resilient income profiles',
        },
        {
          label: 'Development land',
          value: 'Development land with or without planning consent',
        },
        {
          label: 'Redevelopment',
          value: 'Vacant or redundant buildings for redevelopment',
        },
        {
          label: 'Portfolios',
          value: 'Portfolios of income-producing or value-add assets',
        },
        {
          label: 'Distressed',
          value: 'Administration or receivership disposals requiring swift execution',
        },
      ],
      ctaBannerHeadline: 'Have an opportunity?',
      ctaBannerSubheadline: 'Contact us →',
      ctaBannerHref: '/contact',
      seoTitle: 'Acquisition Requirements | Raphael Capital',
      seoDescription:
        'Raphael Capital seeks off-market UK property investments across retail, office, mixed-use and residential sectors for family office and institutional partners.',
    })
    console.log('✅ Requirements page created')

    // 5. Create Contact Page
    console.log('📝 Creating contact page content...')
    await client.createOrReplace({
      _id: 'contactPage',
      _type: 'contactPage',
      mainHeadline: 'Speak with the partnership',
      leadershipSectionHeading: 'Leadership team',
      officeSectionHeading: 'Office',
      formHeadline: 'Send us a message',
      formNameLabel: 'Name',
      formEmailLabel: 'Email',
      formSubjectLabel: 'Subject',
      formMessageLabel: 'Message',
      formSubmitButtonText: 'Send Message',
      formSubmittingText: 'Sending...',
      formSuccessText: '✓ Message Sent',
      formErrorMessage:
        'There was an error sending your message. Please try again or contact us directly.',
      seoTitle: 'Contact Raphael Capital | UK Property Investment',
      seoDescription:
        'Get in touch with Raphael Capital to discuss discreet property investment opportunities across retail, office, residential and mixed-use sectors in the UK.',
    })
    console.log('✅ Contact page created')

    console.log('\n✅ Page content migration complete!')
    console.log('\n📝 Next steps:')
    console.log('   1. Upload brand logos in Sanity Studio')
    console.log('   2. Upload team member photos in Sanity Studio')
    console.log('   3. Run project migration to add order and showInvestmentHighlights fields')
    console.log('   4. Update frontend components to fetch from CMS')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migratePageContent()
