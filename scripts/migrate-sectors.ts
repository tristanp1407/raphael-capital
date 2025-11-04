import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const sectors = [
  { name: 'Retail', order: 0 },
  { name: 'Office', order: 1 },
  { name: 'Industrial', order: 2 },
  { name: 'Mixed Use', order: 3 },
  { name: 'Residential', order: 4 },
  { name: 'Development', order: 5 },
]

async function migrateSectors() {
  console.log('Starting migration of sectors to Sanity...')
  console.log(`Total sectors to migrate: ${sectors.length}`)

  const results = {
    success: [] as string[],
    errors: [] as { name: string; error: string }[],
  }

  for (const sector of sectors) {
    try {
      const doc = {
        _type: 'sector',
        name: sector.name,
        slug: {
          _type: 'slug',
          current: sector.name.toLowerCase().replace(/\s+/g, '-'),
        },
        order: sector.order,
      }

      await client.create(doc)
      results.success.push(sector.name)
      console.log(`✓ Migrated: ${sector.name}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      results.errors.push({ name: sector.name, error: errorMessage })
      console.error(`✗ Failed to migrate ${sector.name}: ${errorMessage}`)
    }
  }

  console.log('\n=== Migration Summary ===')
  console.log(`Successfully migrated: ${results.success.length} sectors`)
  console.log(`Failed: ${results.errors.length} sectors`)

  if (results.errors.length > 0) {
    console.log('\nErrors:')
    results.errors.forEach(({ name, error }) => {
      console.log(`  - ${name}: ${error}`)
    })
  }

  return results
}

migrateSectors()
  .then(() => {
    console.log('\n✓ Sector migration completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n✗ Sector migration failed:', error)
    process.exit(1)
  })
