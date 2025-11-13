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

/**
 * Convert plain text string to Portable Text blocks
 * Handles multi-paragraph text by splitting on double newlines
 */
function textToPortableText(text: string) {
  if (!text) {
    return [
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: '',
            marks: [],
          },
        ],
        markDefs: [],
      },
    ]
  }

  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim())

  // If no paragraphs found, treat as single block
  if (paragraphs.length === 0) {
    return [
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: text.trim(),
            marks: [],
          },
        ],
        markDefs: [],
      },
    ]
  }

  // Create a block for each paragraph
  return paragraphs.map((paragraph) => ({
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: generateKey(),
        text: paragraph.trim(),
        marks: [],
      },
    ],
    markDefs: [],
  }))
}

/**
 * Generate a random key for Sanity blocks
 */
function generateKey() {
  return Math.random().toString(36).substring(2, 11)
}

async function migrateSummaries() {
  console.log('🔄 Migrating project summaries from plain text to Portable Text...\n')

  try {
    // Fetch all projects - we'll check types client-side
    const projects = await client.fetch<any[]>(
      `*[_type == "project"]{ _id, name, summary }`
    )

    console.log(`Found ${projects.length} projects\n`)

    if (projects.length === 0) {
      console.log('✅ No projects found. Nothing to migrate.')
      return
    }

    // Filter projects that have string summaries
    const projectsToMigrate = projects.filter(
      (p) => typeof p.summary === 'string'
    )

    if (projectsToMigrate.length === 0) {
      console.log('✅ All projects already have Portable Text summaries!')
      return
    }

    console.log(
      `Found ${projectsToMigrate.length} projects with plain text summaries:\n`
    )
    projectsToMigrate.forEach((p: any) => {
      const preview =
        p.summary.length > 60 ? p.summary.substring(0, 60) + '...' : p.summary
      console.log(`   - ${p.name}`)
      console.log(`     Current: "${preview}"`)
    })
    console.log('')

    // Migrate each project
    for (const project of projectsToMigrate) {
      const portableText = textToPortableText(project.summary)

      await client
        .patch(project._id)
        .set({ summary: portableText })
        .commit()

      console.log(`✅ Migrated: ${project.name}`)
    }

    console.log(
      `\n✅ Successfully migrated ${projectsToMigrate.length} projects!`
    )
  } catch (error) {
    console.error('❌ Failed to migrate summaries:', error)
    process.exit(1)
  }
}

migrateSummaries()
