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

async function removeInvestmentHighlightsField() {
  console.log('🧹 Removing showInvestmentHighlights field from all projects...\n')

  try {
    // Fetch all projects
    const projects = await client.fetch(`*[_type == "project"]{ _id, name, showInvestmentHighlights }`)

    console.log(`Found ${projects.length} projects\n`)

    if (projects.length === 0) {
      console.log('✅ No projects found. Nothing to update.')
      return
    }

    // Filter projects that have the field
    const projectsWithField = projects.filter((p: any) => 'showInvestmentHighlights' in p)

    if (projectsWithField.length === 0) {
      console.log('✅ No projects have the showInvestmentHighlights field. Nothing to update.')
      return
    }

    console.log(`Found ${projectsWithField.length} projects with showInvestmentHighlights field:\n`)
    projectsWithField.forEach((p: any) => {
      console.log(`   - ${p.name} (${p._id})`)
    })
    console.log('')

    for (const project of projectsWithField) {
      await client
        .patch(project._id)
        .unset(['showInvestmentHighlights'])
        .commit()

      console.log(`✅ Updated ${project.name}`)
    }

    console.log(`\n✅ Successfully removed showInvestmentHighlights from ${projectsWithField.length} projects!`)
  } catch (error) {
    console.error('❌ Failed to update projects:', error)
    process.exit(1)
  }
}

removeInvestmentHighlightsField()
