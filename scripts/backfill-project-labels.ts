/**
 * Idempotent backfill: ensures the siteSettings singleton has values for
 *   - projectLabelPlural   (default: "Projects")
 *   - projectLabelSingular (default: "Project")
 *
 * Only sets a field if it is currently missing or blank — won't overwrite
 * anything an editor has already typed.
 *
 * Run: npx tsx scripts/backfill-project-labels.ts
 */
import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

type SiteSettingsDoc = {
  _id: string
  projectLabelPlural?: string
  projectLabelSingular?: string
}

async function main() {
  console.log('Fetching siteSettings…')
  const docs = await client.fetch<SiteSettingsDoc[]>(
    `*[_type == "siteSettings"] { _id, projectLabelPlural, projectLabelSingular }`,
  )

  if (docs.length === 0) {
    console.error('❌ No siteSettings document found. Open the studio and create one first.')
    process.exit(1)
  }

  for (const doc of docs) {
    const patch: Record<string, string> = {}
    if (!doc.projectLabelPlural || !doc.projectLabelPlural.trim()) {
      patch.projectLabelPlural = 'Projects'
    }
    if (!doc.projectLabelSingular || !doc.projectLabelSingular.trim()) {
      patch.projectLabelSingular = 'Project'
    }

    if (Object.keys(patch).length === 0) {
      console.log(`✓ ${doc._id} — already populated, skipping.`)
      continue
    }

    console.log(`→ ${doc._id} — patching:`, patch)
    await client.patch(doc._id).set(patch).commit()
    console.log(`✓ ${doc._id} — done.`)
  }

  console.log('\nAll set.')
}

main().catch((err) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
