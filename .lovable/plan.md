

## Highlight Active Filter Pills

### Problem
When a filter is applied (value !== "All"), the pill looks identical to unselected pills — no visual distinction.

### Fix
In `src/components/templates/hub/TemplateFilters.tsx`, update the FilterPill button className to conditionally apply a highlighted style when a non-default value is selected:

- **Active (filter applied)**: `bg-brand/10 text-brand border-brand/30` — light brand background with brand-colored text and border
- **Inactive (default "All")**: Keep current `bg-white text-foreground border-border`

Change line 42-46 to use `isDefault` to toggle between these two style sets.

### Files Changed
- `src/components/templates/hub/TemplateFilters.tsx` — lines 42-46: conditional styling based on `isDefault`

