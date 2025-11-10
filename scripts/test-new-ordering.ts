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

async function testOrdering() {
  console.log('\n📊 Testing new ordering with coalesce...\n')

  const projects = await client.fetch(`*[_type == "project"] | order(coalesce(order, 999999) asc) { name, order, featured }`)

  console.log('All Projects (with coalesce):')
  console.log('─'.repeat(70))
  projects.forEach((p: any, i: number) => {
    const orderDisplay = p.order !== null && p.order !== undefined ? p.order : 'null→999999'
    console.log(`${String(i + 1).padStart(2)}. ${p.name.padEnd(45)} order=${String(orderDisplay).padEnd(12)} featured=${p.featured}`)
  })

  console.log('\n')
  const featured = await client.fetch(`*[_type == "project" && featured == true] | order(coalesce(order, 999999) asc) { name, order }`)

  console.log('Featured Projects (with coalesce):')
  console.log('─'.repeat(70))
  featured.forEach((p: any, i: number) => {
    const orderDisplay = p.order !== null && p.order !== undefined ? p.order : 'null→999999'
    console.log(`${String(i + 1).padStart(2)}. ${p.name.padEnd(45)} order=${String(orderDisplay)}`)
  })
  console.log('─'.repeat(70))
}

testOrdering()
