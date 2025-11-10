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

async function migrateGlobalContent() {
  console.log('🚀 Starting global content migration...\n')

  try {
    // 1. Create Site Settings
    console.log('📝 Creating site settings...')
    const siteSettings = await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      companyName: 'Raphael Capital',
      companyDescription:
        'A private investment house specialising in prime UK real estate. We structure, acquire and steward assets with quiet conviction for family offices and institutional partners.',
      defaultSeoTitle: 'Raphael Capital | Private Property Investment & Development',
      defaultSeoDescription:
        'Raphael Capital is a privately owned UK property investment company acquiring and repositioning assets across retail, mixed-use, residential, office and industrial sectors.',
    })
    console.log('✅ Site settings created')

    // 2. Create Footer Content
    console.log('📝 Creating footer content...')
    const footerContent = await client.createOrReplace({
      _id: 'footerContent',
      _type: 'footerContent',
      tagline: 'Private investment house specialising in prime UK real estate',
      quickLinksText: 'Quick Links',
      quickLinks: [
        { text: 'About', href: '/about' },
        { text: 'Projects', href: '/track-record' },
        { text: 'Requirements', href: '/requirements' },
        { text: 'Contact', href: '/contact' },
      ],
      copyrightText: '© 2025 Raphael Capital Limited. All rights reserved.',
      copyrightTagline: 'Regulated by the Financial Conduct Authority',
    })
    console.log('✅ Footer content created')

    // 3. Create Contact Info
    console.log('📝 Creating contact info...')
    const contactInfo = await client.createOrReplace({
      _id: 'contactInfo',
      _type: 'contactInfo',
      companyLegalName: 'Raphael Capital Limited',
      addressLine1: '25 Grosvenor Street',
      addressLine2: 'Mayfair',
      city: 'London',
      postcode: 'W1K 4QN',
      country: 'United Kingdom',
      mapLatitude: 51.512,
      mapLongitude: -0.148,
    })
    console.log('✅ Contact info created')

    // 4. Create Investment Highlights
    console.log('📝 Creating investment highlights...')
    const investmentHighlights = await client.createOrReplace({
      _id: 'investmentHighlights',
      _type: 'investmentHighlights',
      sectionHeadline: 'Investment highlights',
      introParagraphs: [
        'Raphael Capital pursues value-add opportunities across the UK real estate market, partnering with family offices and institutional investors to deploy generational capital.',
        'Our approach combines forensic due diligence, discreet execution and active stewardship to unlock embedded value and deliver reliable income.',
      ],
      highlights: [
        {
          title: 'Track record',
          description:
            '25 years of investment activity across retail, office, mixed-use, residential, industrial and development sectors.',
        },
        {
          title: 'Conviction',
          description:
            'We invest our own balance sheet alongside every mandate, ensuring complete alignment of interest.',
        },
        {
          title: 'Discretion',
          description:
            'Private, off-market transactions executed with speed and certainty for partners who value confidentiality.',
        },
        {
          title: 'Stewardship',
          description:
            'Patient capital approach focused on long-term value creation rather than opportunistic exits.',
        },
      ],
    })
    console.log('✅ Investment highlights created')

    // 5. Create Team Members
    console.log('📝 Creating team members...')
    const teamMembers = [
      {
        _id: 'teamMember-victor-levy',
        _type: 'teamMember',
        name: 'Victor Levy',
        role: 'Managing Partner',
        email: 'victor.levy@raphaelcapital.co.uk',
        phone: '07831 583428',
        bio: [
          'Victor founded Raphael Capital in 1999 and has overseen more than £2 billion of investment activity across the UK real estate market.',
          'He specialises in complex, off-market opportunities requiring discretion and certainty of execution. His experience spans retail, office, residential, mixed-use and development sectors, with a focus on repositioning heritage assets and unlocking embedded value.',
          "Victor maintains close relationships with family offices, institutional co-investors and property advisers across the UK. He is a Fellow of the Royal Institution of Chartered Surveyors and holds an MBA from London Business School.",
        ],
        order: 0,
      },
      {
        _id: 'teamMember-samuel-levy',
        _type: 'teamMember',
        name: 'Samuel Levy',
        role: 'Partner',
        email: 'samuel.levy@raphaelcapital.co.uk',
        phone: '07936 494317',
        bio: [
          'Samuel joined Raphael Capital in 2015 and leads asset management, development oversight and institutional partner relations.',
          'He has managed the repositioning of prime retail frontages, workplace headquarters and urban logistics hubs. Samuel brings a disciplined approach to portfolio performance, ensuring ESG compliance and operational excellence across all holdings.',
          'Prior to Raphael Capital, Samuel worked in investment banking at Goldman Sachs. He holds a First Class degree in Economics from the University of Cambridge.',
        ],
        order: 1,
      },
    ]

    for (const member of teamMembers) {
      await client.createOrReplace(member)
      console.log(`   ✅ ${member.name} created`)
    }
    console.log('✅ Team members created')

    // 6. Create Brand Logos (Note: This will create placeholders - images need to be uploaded manually)
    console.log('📝 Creating brand logo placeholders...')
    const brands = [
      "B&M",
      "Bank of Scotland",
      "Bill's",
      "Boots",
      "Costa",
      "Dune",
      "Greggs",
      "Hotel Chocolat",
      "JoJo Maman Bébé",
      "Marks & Spencer",
      "McDonald's",
      "Optical Express",
      "Rohan",
      "Santander",
      "Space NK",
      "Taco Bell",
      "Wendy's",
      "WHSmith",
    ]

    for (let i = 0; i < brands.length; i++) {
      const brandId = `brandLogo-${brands[i].toLowerCase().replace(/[^a-z0-9]/g, '-')}`
      await client.createIfNotExists({
        _id: brandId,
        _type: 'brandLogo',
        name: brands[i],
        order: i,
        active: true,
        // Note: Logo images need to be uploaded manually in Sanity Studio
      })
      console.log(`   📋 ${brands[i]} placeholder created`)
    }
    console.log('⚠️  Brand logos created as placeholders - please upload images in Sanity Studio')

    console.log('\n✅ Global content migration complete!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateGlobalContent()
