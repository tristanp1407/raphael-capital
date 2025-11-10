import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Map of filenames to brand names
const filenameToBrand: Record<string, string> = {
  'b&m.png': 'B&M',
  'bank of scotland.png': 'Bank of Scotland',
  'bills.png': "Bill's",
  'boots.png': 'Boots',
  'costa.png': 'Costa',
  'dune.png': 'Dune',
  'greggs.png': 'Greggs',
  'hotelchocolat.png': 'Hotel Chocolat',
  'jojomama.png': 'JoJo Maman Bébé',
  'm&s.png': 'Marks & Spencer',
  'mcdonalds.png': "McDonald's",
  'opticalexpress.png': 'Optical Express',
  'rohan.png': 'Rohan',
  'santander.png': 'Santander',
  'spaceuk.png': 'Space NK',
  'tacobell.png': 'Taco Bell',
  'wendy.png': "Wendy's",
  'whsmith.png': 'WHSmith',
}

async function uploadBrandLogos() {
  console.log('🖼️  Starting brand logo upload...\n')

  const logosDir = path.resolve(process.cwd(), 'public/logos')

  // Check if directory exists
  if (!fs.existsSync(logosDir)) {
    console.error('❌ Logos directory not found:', logosDir)
    process.exit(1)
  }

  const files = fs.readdirSync(logosDir).filter(file => file.endsWith('.png'))
  console.log(`📁 Found ${files.length} PNG files in public/logos/\n`)

  let uploaded = 0
  let updated = 0
  let skipped = 0

  for (const filename of files) {
    const brandName = filenameToBrand[filename]

    if (!brandName) {
      console.log(`⏭️  Skipping ${filename} - no brand mapping found`)
      skipped++
      continue
    }

    try {
      console.log(`📤 Processing ${brandName}...`)

      // Read the file
      const filePath = path.join(logosDir, filename)
      const fileBuffer = fs.readFileSync(filePath)

      // Upload to Sanity as an asset
      const asset = await client.assets.upload('image', fileBuffer, {
        filename: filename,
        contentType: 'image/png',
      })
      console.log(`   ✅ Image uploaded (${asset._id})`)
      uploaded++

      // Find the brand logo document
      const brandId = `brandLogo-${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`

      // Update the brand logo document with the image reference
      await client
        .patch(brandId)
        .set({
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: `${brandName} logo`,
          },
        })
        .commit()

      console.log(`   ✅ Brand logo document updated\n`)
      updated++

    } catch (error) {
      console.error(`   ❌ Failed to process ${brandName}:`, error)
    }
  }

  console.log('\n📊 Upload Summary:')
  console.log(`   ✅ Images uploaded: ${uploaded}`)
  console.log(`   ✅ Documents updated: ${updated}`)
  if (skipped > 0) {
    console.log(`   ⏭️  Files skipped: ${skipped}`)
  }

  console.log('\n✅ Brand logo upload complete!')
}

uploadBrandLogos()
