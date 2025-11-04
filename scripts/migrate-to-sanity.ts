import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

// Import and run migration
import('../sanity/lib/migrate').then(({ migrateProjects }) => {
  migrateProjects()
    .then(() => {
      console.log('\n✓ Migration completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n✗ Migration failed:', error)
      process.exit(1)
    })
})
