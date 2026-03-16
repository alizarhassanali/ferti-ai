

## Remove Descriptions from Release Notes List

### Change: `src/components/releaseNotes/ReleaseNotesList.tsx`

Remove the summary/description line (`line-clamp-2`) from each note item in the list, keeping only the date, tag badge, and title. This will make each list item more compact.

Remove this line:
```tsx
<div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{note.summary}</div>
```

