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

async function removeDisplayFields() {
  console.log('🧹 Removing display toggle fields from team members...\n')

  try {
    // Fetch all team members
    const teamMembers = await client.fetch(`*[_type == "teamMember"]{ _id }`)

    console.log(`Found ${teamMembers.length} team members\n`)

    for (const member of teamMembers) {
      await client
        .patch(member._id)
        .unset(['displayOnAboutPage', 'displayInFooter'])
        .commit()

      console.log(`✅ Updated ${member._id}`)
    }

    console.log('\n✅ All team members updated!')
  } catch (error) {
    console.error('❌ Failed to update team members:', error)
    process.exit(1)
  }
}

removeDisplayFields()
