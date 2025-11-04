# Sectors as Dynamic Documents

The website now uses Sanity to manage sectors as separate documents, making them fully editable through the CMS.

## What Changed

### Before
- Sectors were hardcoded in the code as a dropdown list
- Filter buttons on the track-record page were static

### After
- Sectors are managed as documents in Sanity
- Each sector has a name, slug, and display order
- Projects reference sectors (instead of storing sector names as strings)
- Filter buttons are dynamically generated from Sanity sectors

## Setup Instructions

### 1. Run the Sector Migration

First, migrate the existing sectors to Sanity:

```bash
npm run migrate:sectors
```

This will create 6 sector documents:
- Retail (order: 0)
- Office (order: 1)
- Industrial (order: 2)
- Mixed Use (order: 3)
- Residential (order: 4)
- Development (order: 5)

### 2. Update Existing Projects

After migrating sectors, you need to update your existing projects to reference the sector documents instead of using string values.

**In Sanity Studio:**
1. Go to `/studio`
2. Click on each project
3. In the "Sector" field, you'll now see a dropdown to select from the sector documents
4. Select the appropriate sector for each project
5. Click "Publish" to save

**Important:** You'll need to do this for all existing projects, otherwise they won't display correctly on the frontend.

## Managing Sectors

### Adding a New Sector

1. Go to `/studio`
2. Click "Sector" in the sidebar
3. Click "Create new Sector"
4. Fill in:
   - **Sector Name**: The display name (e.g., "Healthcare")
   - **Slug**: Auto-generated from name
   - **Display Order**: Number indicating where it appears in filters (0 = first, 1 = second, etc.)
5. Click "Publish"

The new sector will automatically appear in:
- Project creation/editing (sector selection dropdown)
- Track record page filter buttons

### Editing a Sector

1. Go to `/studio`
2. Click "Sector" in the sidebar
3. Select the sector to edit
4. Update the name or display order
5. Click "Publish"

**Note:** Changing a sector name will update it everywhere it's referenced (all projects using that sector).

### Changing Filter Button Order

To reorder how sectors appear in the filter buttons:

1. Go to `/studio`
2. Click "Sector" in the sidebar
3. Update the "Display Order" field for each sector
   - Lower numbers appear first (0, 1, 2, ...)
   - Higher numbers appear last
4. Click "Publish"

The filter buttons will automatically reorder based on this value.

### Deleting a Sector

**⚠️ Warning:** You cannot delete a sector that is referenced by any projects. You must first:

1. Find all projects using that sector
2. Change them to use a different sector
3. Then you can delete the sector

To delete:
1. Go to `/studio`
2. Click "Sector" in the sidebar
3. Select the sector
4. Click the three dots menu → "Delete"
5. Confirm deletion

## How It Works on the Frontend

### Track Record Page
- Fetches all sectors from Sanity
- Generates filter buttons dynamically
- Sorts sectors by their `order` field
- Filters projects based on selected sector

### Project Cards
- Display the sector name from the referenced sector document
- Compatible with both old (string) and new (reference) formats for backward compatibility

### Project Detail Page
- Shows the sector name from the referenced sector document
- Includes sector in JSON-LD structured data for SEO

## Fallback Behavior

If Sanity is unavailable or the fetch fails:
- The site falls back to hardcoded sectors:
  - Retail, Office, Industrial, Mixed Use, Residential, Development
- Filter buttons still work with static data
- Projects display their sector information from the fallback data

## Developer Notes

### TypeScript Types

```typescript
// New Sector interface
export interface Sector {
  _id: string
  name: string
  slug: string
  order: number
}

// Project sector field is now a Sector reference
export interface Project {
  // ... other fields
  sector: Sector  // Changed from string to Sector object
}
```

### GROQ Queries

Projects now fetch sectors with the `->` dereferencing operator:

```groq
*[_type == "project"] {
  // ... other fields
  sector->{
    _id,
    name,
    "slug": slug.current
  }
}
```

### Backward Compatibility

All components check if `sector` is a string or object:

```typescript
const sectorName = typeof project.sector === 'string'
  ? project.sector
  : project.sector.name
```

This ensures the site works with both old and new data formats during migration.
