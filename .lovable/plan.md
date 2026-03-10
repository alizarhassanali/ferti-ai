

## Move Review Disclaimer into the Note Tab

### What
Remove the review warning from the global page footer area and place it as a permanent, always-visible banner inside the Note tab — positioned directly below the template toolbar and above the note content.

### Changes

**`src/components/newSession/NoteTab.tsx`**
- After the toolbar `div` (line 483, closing `</div>` of the toolbar) and before the loading/content states, add a subtle warning banner:
  ```
  ⚠ Review your note before use to ensure it accurately represents the visit
  ```
- Style: `AlertTriangle` icon (amber), small text, muted background (e.g. `bg-amber-50 border border-amber-200 rounded px-3 py-2`), always rendered regardless of note state.

**`src/components/layout/AppFooter.tsx`** (or wherever the current global warning lives)
- Remove the existing review disclaimer from the footer/page-level component so it only appears in the Note tab.

### Why this placement
- Directly contextual — it appears right where the AI-generated content is shown
- Always visible without scrolling past note content
- Doesn't interfere with the action buttons at the bottom

