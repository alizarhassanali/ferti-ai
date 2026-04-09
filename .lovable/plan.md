

## Fix Sort Functionality in Sessions and Letters

### Problem
- **Sessions**: `SessionSort` manages sort state internally but never passes it up to `SessionList`, so the sorted order is never applied to the actual session list.
- **Letters**: Sort buttons are static — no state, no click handlers, no sorting logic.

### Solution

**`src/components/sessions/SessionSort.tsx`**
- Accept `sortOrder` and `onSortOrderChange` as props instead of using internal state
- Parent controls the state

**`src/components/sessions/SessionList.tsx`**
- Add `sortOrder` state (`'asc' | 'desc'`, default `'desc'`)
- Pass `sortOrder` and `setSortOrder` to `SessionSort`
- Sort `groupedDraftSessions` and `groupedCompletedSessions` date keys by `sortOrder` before rendering

**`src/components/letters/LettersList.tsx`**
- Add `sortOrder` state (`'asc' | 'desc'`, default `'desc'`)
- Wire sort buttons with `onClick` handlers and active variant styling
- Sort the `groupByDate` output keys by `sortOrder` before rendering in both tabs

### Sorting logic (same for both)
Sort the date group keys alphabetically (they're `yyyy-MM-dd` format, so string sort works). Ascending = oldest first, Descending = newest first.

### Files to change

| File | Change |
|------|--------|
| `src/components/sessions/SessionSort.tsx` | Accept props instead of internal state |
| `src/components/sessions/SessionList.tsx` | Add sort state, pass to `SessionSort`, apply sort to date groups |
| `src/components/letters/LettersList.tsx` | Add sort state, wire buttons, apply sort to date groups |

