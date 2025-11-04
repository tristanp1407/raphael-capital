import { createClient } from '@sanity/client'
import { allProperties } from '../../src/lib/data'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function migrateProjects() {
  console.log('Starting migration of projects to Sanity...')
  console.log(`Total projects to migrate: ${allProperties.length}`)

  const results = {
    success: [] as string[],
    errors: [] as { id: string; error: string }[],
  }

  for (const property of allProperties) {
    try {
      const doc = {
        _type: 'project',
        name: property.name,
        slug: {
          _type: 'slug',
          current: property.id,
        },
        location: property.location,
        sector: property.sector,
        summary: property.summary,
        status: property.status,
        featured: property.featured || false,
      }

      await client.create(doc)
      results.success.push(property.id)
      console.log(`✓ Migrated: ${property.name} (${property.id})`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      results.errors.push({ id: property.id, error: errorMessage })
      console.error(`✗ Failed to migrate ${property.id}: ${errorMessage}`)
    }
  }

  console.log('\n=== Migration Summary ===')
  console.log(`Successfully migrated: ${results.success.length} projects`)
  console.log(`Failed: ${results.errors.length} projects`)

  if (results.errors.length > 0) {
    console.log('\nErrors:')
    results.errors.forEach(({ id, error }) => {
      console.log(`  - ${id}: ${error}`)
    })
  }

  return results
}

// Allow running this file directly
if (require.main === module) {
  migrateProjects()
    .then(() => {
      console.log('\nMigration completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Migration failed:', error)
      process.exit(1)
    })
}
