

## Make Version Buckets Collapsible

### Change: `src/components/releaseNotes/ReleaseNotesList.tsx`

- Import `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` from `@/components/ui/collapsible` and `ChevronDown` icon
- Add `useState` to track open versions, initialized with the first (latest) version open
- Wrap each version group in a `Collapsible` component with `open` controlled by state
- Make the version header a `CollapsibleTrigger` with a chevron icon that rotates when expanded
- Wrap the notes `<ul>` in `CollapsibleContent`
- Latest version (index 0) defaults to open; all others default to closed

