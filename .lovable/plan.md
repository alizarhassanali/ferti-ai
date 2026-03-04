

## Remove Active-State Orange Highlight from Filter Pills

**File:** `src/components/templates/hub/TemplateFilters.tsx`

**Problem:** When a filter value other than the default is selected, the pill turns orange (`bg-brand text-brand-foreground border-brand`). It should always remain the same white/default style regardless of selection.

**Change:** In the `FilterPill` component, remove the `hasActiveFilter` conditional and always use the inactive style for the button:

```tsx
// Before (lines ~39-46)
hasActiveFilter
  ? "bg-brand text-brand-foreground border-brand hover:bg-brand/90"
  : "bg-white text-foreground border-primary hover:bg-muted"

// After — always use the default style
"bg-white text-foreground border-primary hover:bg-muted"
```

Remove the `hasActiveFilter` variable as it's no longer needed.

