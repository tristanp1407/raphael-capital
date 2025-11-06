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

async function migrateSectorsToArray() {
  console.log('Starting migration: Converting single sector to sectors array...\n')

  // Fetch all projects
  const projects = await client.fetch<{ _id: string; name: string; sector?: any; sectors?: any[] }[]>(
    `*[_type == "project"] { _id, name, sector, sectors }`
  )

  if (projects.length === 0) {
    console.log('No projects found.')
    return
  }

  console.log(`Found ${projects.length} projects\n`)

  const results = {
    updated: [] as string[],
    skipped: [] as string[],
    alreadyMigrated: [] as string[],
    errors: [] as { id: string; name: string; error: string }[],
  }

  for (const project of projects) {
    try {
      // Check if already has sectors array (already migrated)
      if (Array.isArray(project.sectors) && project.sectors.length > 0) {
        console.log(`⊙ Already migrated: "${project.name}" - has sectors array`)
        results.alreadyMigrated.push(project.name)
        continue
      }

      // Check if has old sector field (needs migration)
      if (project.sector && typeof project.sector === 'object' && project.sector._ref) {
        const sectorRef = project.sector._ref

        // Create sectors array with the single sector reference
        await client
          .patch(project._id)
          .set({
            sectors: [
              {
                _type: 'reference',
                _ref: sectorRef,
                _key: sectorRef, // Use the ref as the key for uniqueness
              },
            ],
          })
          .unset(['sector']) // Remove the old sector field
          .commit()

        console.log(`✓ Migrated "${project.name}": Single sector → sectors array`)
        results.updated.push(project.name)
      } else if (!project.sector && (!project.sectors || project.sectors.length === 0)) {
        console.log(`⚠ Skipped "${project.name}": No sector data`)
        results.skipped.push(project.name)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`✗ Failed to migrate "${project.name}": ${errorMessage}`)
      results.errors.push({ id: project._id, name: project.name, error: errorMessage })
    }
  }

  console.log('\n=== Migration Summary ===')
  console.log(`✓ Migrated: ${results.updated.length} projects`)
  console.log(`⊙ Already migrated: ${results.alreadyMigrated.length} projects`)
  console.log(`⊘ Skipped: ${results.skipped.length} projects (no sector data)`)
  console.log(`✗ Errors: ${results.errors.length} projects`)

  if (results.updated.length > 0) {
    console.log('\n Migrated projects:')
    results.updated.forEach((name) => console.log(`  - ${name}`))
  }

  if (results.errors.length > 0) {
    console.log('\nProjects with errors:')
    results.errors.forEach(({ name, error }) => {
      console.log(`  - ${name}: ${error}`)
    })
  }

  return results
}

migrateSectorsToArray()
  .then(() => {
    console.log('\n✓ Migration completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n✗ Migration failed:', error)
    process.exit(1)
  })
