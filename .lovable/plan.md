

## Release Notes System — Implementation Plan

### Overview
Add a Release Notes ("What's New") system with a bell icon in the sidebar footer, a side panel for browsing releases, an unread badge indicator, and a database-backed data layer seeded with initial entries.

### 1. Database Setup

Create a `release_notes` table:
- `id` (uuid, PK), `title` (text), `summary` (text), `description` (text, optional long-form markdown), `release_date` (date), `tag` (enum: new/improvement/fix), `image_url` (text, optional), `created_at` (timestamptz)
- RLS: public SELECT for authenticated users, service_role for INSERT/UPDATE/DELETE
- Seed with 4-5 demo entries (mix of New, Improvement, Fix tags)

Create a `release_notes_dismissed` table to track per-user dismissal:
- `id` (uuid, PK), `user_id` (uuid), `last_seen_at` (timestamptz)
- RLS: users can read/upsert their own row

### 2. Sidebar Bell Icon

In `LeftPane.tsx` footer section (next to Help):
- Add a **Sparkles** (or Bell) icon button labeled "What's New"
- Show a small red dot badge when there are unseen releases (compare `release_notes.release_date` > `release_notes_dismissed.last_seen_at`)
- Clicking opens a right-side Sheet panel (similar to HelpPanel pattern)
- Respects collapsed sidebar (tooltip mode)

### 3. Release Notes Side Panel

New component `src/components/releaseNotes/ReleaseNotesPanel.tsx`:
- Right-side Sheet (same pattern as HelpPanel)
- Header: "What's New" title + close button
- Body: Simple list layout — each entry is a compact row:
  - Release date (small muted text)
  - Title (semibold)
  - Tag badge (colored: green=New, blue=Improvement, orange=Fix)
  - Summary text (1-2 lines, muted)
  - Click to expand inline for full description (accordion-style)
- On open: upsert `last_seen_at` to clear the badge
- Data fetched via React Query from the `release_notes` table, ordered by `release_date DESC`

### 4. Data Layer

- `src/data/seedReleaseNotes.ts` — static seed data array with 4-5 entries
- `src/hooks/useReleaseNotes.ts` — React Query hook to fetch from DB, fallback to seed data if empty
- `src/hooks/useUnseenReleases.ts` — hook to check if badge should show (compares latest release date vs last_seen_at)

### 5. Files to Create/Modify

| Action | File |
|--------|------|
| Create | `supabase/migrations/...release_notes.sql` |
| Create | `src/components/releaseNotes/ReleaseNotesPanel.tsx` |
| Create | `src/data/seedReleaseNotes.ts` |
| Create | `src/hooks/useReleaseNotes.ts` |
| Modify | `src/components/settings/LeftPane.tsx` — add bell icon + badge + panel trigger |

### 6. Not Included (Future)

- Email communication (weekly digest)
- "Coming Soon" teasers section
- Search/filter functionality
- Admin UI for managing release notes

