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

async function migrateProjectFields() {
  console.log('🚀 Adding new fields to existing projects...\n')

  try {
    // Fetch all projects
    const projects = await client.fetch('*[_type == "project"]')
    console.log(`Found ${projects.length} projects to update\n`)

    if (projects.length === 0) {
      console.log('⚠️  No projects found to migrate')
      return
    }

    let updated = 0
    let skipped = 0

    for (const project of projects) {
      // Check if fields already exist
      if (
        project.order !== undefined &&
        project.showInvestmentHighlights !== undefined
      ) {
        console.log(`⏭️  ${project.name} - already has new fields, skipping`)
        skipped++
        continue
      }

      try {
        // Update project with new fields
        await client
          .patch(project._id)
          .set({
            // Set order to 0 by default - can be manually adjusted later
            order: project.order !== undefined ? project.order : 0,
            // Enable investment highlights by default
            showInvestmentHighlights:
              project.showInvestmentHighlights !== undefined
                ? project.showInvestmentHighlights
                : true,
          })
          .commit()

        console.log(`✅ ${project.name} - added order and showInvestmentHighlights fields`)
        updated++
      } catch (error) {
        console.error(`❌ Failed to update ${project.name}:`, error)
      }
    }

    console.log(`\n✅ Migration complete!`)
    console.log(`   Updated: ${updated}`)
    console.log(`   Skipped: ${skipped}`)
    console.log(`   Total: ${projects.length}`)

    if (updated > 0) {
      console.log(
        '\n💡 Tip: You can now manually adjust the order values in Sanity Studio to control project display order'
      )
    }
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateProjectFields()
