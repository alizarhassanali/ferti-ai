

## Add Grey Background to Inactive Tab Pills

### Problem
In both the Letters and View Sessions middle panes, the inactive tab pill has `bg-transparent`. The screenshot shows inactive pills should have a light grey background.

### Fix
Change `bg-transparent` to `bg-muted` (which maps to `#EAF4FB` / light sky) on the inactive state of the tab pills in both files. This gives the unselected pill a visible grey fill.

### Files Changed

1. **`src/components/sessions/SessionList.tsx`** (lines 227, 233) — change `bg-transparent` to `bg-muted` in both TabsTrigger classNames
2. **`src/components/letters/LettersList.tsx`** (lines 145, 156) — change `bg-transparent` to `bg-muted` in both TabsTrigger classNames

