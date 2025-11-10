import { execSync } from 'child_process'
import path from 'path'

const scriptsDir = path.resolve(__dirname)

console.log('🚀 Running complete CMS content migration...\n')
console.log('═'.repeat(60))

const migrations = [
  {
    name: 'Global Content',
    script: 'migrate-global-content.ts',
    description: 'Site settings, footer, contact info, investment highlights, team, brands',
  },
  {
    name: 'Brand Logo Upload',
    script: 'upload-brand-logos.ts',
    description: 'Upload brand logo images from public/logos/',
  },
  {
    name: 'Page Content',
    script: 'migrate-page-content.ts',
    description: 'Home, About, Track Record, Requirements, Contact pages',
  },
  {
    name: 'Project Fields',
    script: 'migrate-project-fields.ts',
    description: 'Add order and showInvestmentHighlights to existing projects',
  },
]

let completed = 0
let failed = 0

for (let i = 0; i < migrations.length; i++) {
  const migration = migrations[i]
  console.log(`\n[${i + 1}/${migrations.length}] ${migration.name}`)
  console.log(`    ${migration.description}`)
  console.log('─'.repeat(60))

  try {
    execSync(`npx tsx ${path.join(scriptsDir, migration.script)}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
    completed++
    console.log(`\n✅ ${migration.name} completed`)
  } catch (error) {
    failed++
    console.error(`\n❌ ${migration.name} failed`)
  }

  if (i < migrations.length - 1) {
    console.log('\n' + '═'.repeat(60))
  }
}

console.log('\n' + '═'.repeat(60))
console.log('\n📊 Migration Summary:')
console.log(`   ✅ Completed: ${completed}/${migrations.length}`)
console.log(`   ❌ Failed: ${failed}/${migrations.length}`)

if (completed === migrations.length) {
  console.log('\n🎉 All migrations completed successfully!')
  console.log('\n📝 Optional next steps:')
  console.log('   1. Open Sanity Studio: npm run dev (navigate to /admin)')
  console.log('   2. Navigate to the Team Members section')
  console.log('   3. Upload photos for Victor and Samuel')
  console.log('   4. Adjust project order values if needed')
  console.log('   5. Review and edit any content as needed')
} else {
  console.log('\n⚠️  Some migrations failed. Please check the errors above.')
  process.exit(1)
}
