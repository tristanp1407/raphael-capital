import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkOrders() {
  const projects = await client.fetch(`*[_type == "project"] | order(order asc) { name, order, featured }`)
  console.log('\nProjects ordered by "order" field (asc):')
  console.log('─'.repeat(60))
  projects.forEach((p: any, i: number) => {
    const orderDisplay = p.order !== null && p.order !== undefined ? p.order : 'null'
    console.log(`${String(i + 1).padStart(2)}. ${p.name.padEnd(40)} order=${String(orderDisplay).padEnd(6)} featured=${p.featured}`)
  })
  console.log('─'.repeat(60))
}

checkOrders()
