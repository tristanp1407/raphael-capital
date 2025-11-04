# Sanity CMS Setup Guide

This guide will help you set up and configure Sanity CMS for the Raphael Capital website.

## Prerequisites

- Node.js installed
- A Sanity account (sign up at https://www.sanity.io/)

## Step 1: Configure Environment Variables

1. Open `.env.local` in the root directory
2. Add your Sanity project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

To find your project ID:
- Go to https://www.sanity.io/manage
- Select your project or create a new one
- Copy the Project ID

3. Create an API token for the migration script:
   - Go to https://www.sanity.io/manage
   - Navigate to your project → API → Tokens
   - Click "Add API token"
   - Give it a name (e.g., "Migration Script")
   - Set permissions to **Editor**
   - Copy the token and add it to `.env.local`:
   ```
   SANITY_API_TOKEN=your-api-token-here
   ```

## Step 2: Run the Migration Script

Migrate your existing project data to Sanity:

```bash
npm run migrate
```

This will:
- Connect to your Sanity project
- Import all 14 projects from `src/lib/data.ts`
- Create documents with all fields (name, location, year, sector, summary, status, featured)

**Note:** Images are not included in the migration. You'll need to upload real project images in Step 4.

## Step 3: Access Sanity Studio

Start the development server:

```bash
npm run dev
```

Then navigate to:
```
http://localhost:3000/studio
```

You'll be prompted to log in with your Sanity account.

## Step 4: Upload Project Images

For each project in Sanity Studio:

1. Click on a project to edit it
2. Scroll to the "Hero Image" field
3. Click "Upload" to add the main project image
4. Fill in the "Alternative text" field for SEO
5. Optionally, add more images to the "Image Gallery" field
6. Click "Publish" to save changes

Repeat for all projects.

## Step 5: Verify Frontend Integration

The website will now fetch content from Sanity:

- **Homepage** (`/`) - Shows featured projects
- **Track Record** (`/track-record`) - Lists all projects
- **Project Details** (`/track-record/[slug]`) - Shows individual project pages

The site includes fallback logic, so if Sanity is unavailable, it will use the static data from `src/lib/data.ts`.

## Project Schema

The project schema includes:

- **Name** - Project title
- **Slug** - URL-friendly identifier (auto-generated from name)
- **Location** - City/area and country
- **Year** - Completion year
- **Sector** - Dropdown: Retail, Office, Industrial, Mixed Use, Residential, Development
- **Summary** - Brief description (max 500 characters)
- **Status** - Radio: Current or Previous
- **Featured** - Boolean to display on homepage
- **Hero Image** - Main project image with alt text
- **Gallery** - Array of additional images with captions

## Content Management

### Adding a New Project

1. Go to `/studio`
2. Click "Project" in the left sidebar
3. Click "Create new Project"
4. Fill in all fields
5. Upload a hero image
6. Check "Featured" if you want it on the homepage
7. Click "Publish"

### Editing a Project

1. Go to `/studio`
2. Click "Project" in the left sidebar
3. Select the project to edit
4. Make your changes
5. Click "Publish"

### Deleting a Project

1. Go to `/studio`
2. Click "Project" in the left sidebar
3. Select the project
4. Click the three dots menu → "Delete"
5. Confirm deletion

## Deployment Considerations

When deploying to production:

1. **Environment Variables**: Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set in your hosting environment (Vercel, Netlify, etc.)

2. **API Token**: The `SANITY_API_TOKEN` is only needed for the migration script. You don't need it in production unless you're doing server-side writes.

3. **Studio Access**: The studio at `/studio` will be publicly accessible but requires Sanity login credentials. To restrict access further, you can:
   - Deploy Studio separately
   - Add authentication middleware
   - Use Sanity's built-in CORS and allowed origins settings

4. **Revalidation**: Consider adding on-demand revalidation or ISR (Incremental Static Regeneration) to keep content fresh without full rebuilds.

## Troubleshooting

### "Project ID not found" error
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env.local`
- Restart the dev server after changing environment variables

### Migration script fails
- Verify `SANITY_API_TOKEN` has Editor permissions
- Check that the token hasn't expired
- Ensure your Sanity project dataset is set to "production"

### Images not displaying
- Verify images are uploaded in Sanity Studio
- Check that the `heroImage` field is populated
- Ensure the image has an alt text (required field)

### Content not updating on frontend
- Clear your browser cache
- Check the browser console for fetch errors
- Verify the Sanity query is correct in `src/lib/sanity/queries.ts`

## Next Steps

You can now expand the CMS by adding schemas for:
- Team members
- Brand logos
- Company history milestones
- Site settings (global configuration)
- Blog posts or news articles

See the initial research in the planning phase for suggested schema structures.

## Support

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Community: https://www.sanity.io/community
