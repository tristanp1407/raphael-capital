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

async function fixProjectSectors() {
  console.log('Fetching all sectors...')

  // Get all sectors
  const sectors = await client.fetch<{ _id: string; name: string }[]>(
    `*[_type == "sector"] { _id, name }`
  )

  if (sectors.length === 0) {
    console.error('❌ No sectors found! Please run: npm run migrate:sectors')
    process.exit(1)
  }

  console.log(`Found ${sectors.length} sectors:`)
  sectors.forEach((s) => console.log(`  - ${s.name} (${s._id})`))

  // Create a map of sector names to IDs
  const sectorMap = new Map(sectors.map((s) => [s.name, s._id]))

  console.log('\nFetching all projects...')

  // Get all projects with their current sector values
  const projects = await client.fetch<{ _id: string; name: string; sector: any }[]>(
    `*[_type == "project"] { _id, name, sector }`
  )

  if (projects.length === 0) {
    console.log('No projects found.')
    process.exit(0)
  }

  console.log(`Found ${projects.length} projects\n`)

  const results = {
    updated: [] as string[],
    skipped: [] as string[],
    errors: [] as { id: string; error: string }[],
  }

  for (const project of projects) {
    try {
      // Check if sector is already a reference
      if (project.sector && typeof project.sector === 'object' && project.sector._ref) {
        console.log(`⊘ Skipping "${project.name}" - already has sector reference`)
        results.skipped.push(project.name)
        continue
      }

      // If sector is a string, find the matching sector document
      if (typeof project.sector === 'string') {
        const sectorId = sectorMap.get(project.sector)

        if (!sectorId) {
          console.log(`⚠ Warning: "${project.name}" has unknown sector: "${project.sector}"`)
          results.errors.push({ id: project._id, error: `Unknown sector: ${project.sector}` })
          continue
        }

        // Update the project with a reference to the sector
        await client
          .patch(project._id)
          .set({
            sector: {
              _type: 'reference',
              _ref: sectorId,
            },
          })
          .commit()

        console.log(`✓ Updated "${project.name}": ${project.sector} → sector reference`)
        results.updated.push(project.name)
      } else if (!project.sector) {
        console.log(`⚠ Warning: "${project.name}" has no sector`)
        results.errors.push({ id: project._id, error: 'No sector value' })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`✗ Failed to update "${project.name}": ${errorMessage}`)
      results.errors.push({ id: project._id, error: errorMessage })
    }
  }

  console.log('\n=== Migration Summary ===')
  console.log(`Updated: ${results.updated.length} projects`)
  console.log(`Skipped: ${results.skipped.length} projects (already migrated)`)
  console.log(`Errors: ${results.errors.length} projects`)

  if (results.errors.length > 0) {
    console.log('\nProjects with errors:')
    results.errors.forEach(({ id, error }) => {
      console.log(`  - ${id}: ${error}`)
    })
  }

  return results
}

fixProjectSectors()
  .then(() => {
    console.log('\n✓ Project sector fix completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n✗ Project sector fix failed:', error)
    process.exit(1)
  })
