import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { deployTool } from './sanity/tools/deploy'

export default defineConfig({
  name: 'default',
  title: 'Raphael Capital',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool(), visionTool(), deployTool()],

  schema: {
    types: schemaTypes,
  },
})
