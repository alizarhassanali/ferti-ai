

## Add Version Buckets to Release Notes

### Data Changes — `src/data/seedReleaseNotes.ts`

Add a `version` field to the `ReleaseNote` interface and expand seed data to ~15 notes across 3 versions:

- **v2.3.0** (March 2026) — 4-5 notes (e.g., AI Memory, Multi-language support, Patient timeline)
- **v2.2.0** (February 2026) — 5 existing notes (already there, just add `version: '2.2.0'`)
- **v2.1.0** (January 2026) — 4-5 notes (e.g., Team collaboration, Dark mode, Keyboard shortcuts, Export improvements)

### List Component Changes — `src/components/releaseNotes/ReleaseNotesList.tsx`

- Group notes by `version` field
- Render each group with a sticky version header (e.g., "v2.3.0 — March 2026") styled as a small section divider
- Notes within each version listed chronologically (newest first)

### Hook Changes — `src/hooks/useReleaseNotes.ts`

- No structural changes needed; the hook already returns all notes sorted by date. The grouping logic will live in the list component.

### Detail Component — `src/components/releaseNotes/ReleaseNoteDetail.tsx`

- Show the version badge alongside the date and tag in the detail header.

