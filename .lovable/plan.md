
## Update Letters Middle Pane Card Styling

Update the LetterCard component to match the View Sessions card styling while removing the template type and keeping doctor names visible.

### Changes Overview

| Current LetterCard | New LetterCard |
|---|---|
| White background with border | Transparent background, no border |
| Status badge (amber/green) | No status badge (tabs indicate status) |
| Template type displayed | Removed |
| Doctor name with "From:" prefix | Doctor name visible (simplified) |
| Hover: subtle border change | Hover: white bg, border, shadow |
| Active: ring effect | Active: light orange bg with subtle border |

### Implementation

**File: `src/components/letters/LetterCard.tsx`**

1. Remove the `getStatusBadge` function entirely
2. Remove the Badge import and status icons (Clock, CheckCircle)
3. Update the card container styling to match SessionCard:
   - Default: `bg-transparent border-transparent`
   - Hover: `hover:bg-white hover:border-[hsl(216_20%_90%)] hover:shadow-md`
   - Active: `bg-[hsl(5_85%_92%)] border-brand/30 shadow-sm`
4. Simplify layout:
   - Patient name on the left
   - Doctor name below patient name (no "From:" prefix, smaller text)
   - Time on the right (using session date/time formatting)
5. Remove the template type line completely

### Updated Component Structure

```
┌─────────────────────────────────────┐
│ Patient Name                  Time  │
│ Dr. Shahid Saya                     │
└─────────────────────────────────────┘
```

### Files to Modify

| File | Change |
|------|--------|
| `src/components/letters/LetterCard.tsx` | Update styling to match SessionCard, remove template type and status badges |
