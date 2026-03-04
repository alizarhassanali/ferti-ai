

## Convert File Attachments from List to Tile View

### Problem
Attached files display as a vertical list, each taking a full row. With 3-4+ files, the context text area shrinks to nothing.

### Changes

**1. `src/components/newSession/FileProcessingItem.tsx`** — Redesign as a compact tile
- Change from full-width row to a small fixed-size tile (~140px wide)
- Show a file icon, truncated filename (max ~12 chars visible), and an X button in the top-right corner
- Add `title={file.name}` on the container so full name shows on hover
- For processing state, show a small spinner overlay instead of a progress bar
- For error state, show red border with retry on click

**2. `src/components/newSession/ContextTab.tsx`** — Change files container to horizontal flex-wrap
- Replace `<div className="mt-3 space-y-2">` with `<div className="mt-3 flex flex-wrap gap-2">`
- Files flow left-to-right and wrap, taking minimal vertical space

