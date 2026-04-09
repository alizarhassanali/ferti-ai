

## Simplify Sort to Ascending/Descending Only

### Summary
Remove the "Sort By" radio group from the Sessions sort panel and replace it with just two clean toggle buttons (Ascending / Descending). Apply the same design to the Letters sort panel, replacing the placeholder stub.

### Changes

**`src/components/sessions/SessionSort.tsx`**
- Remove the "Sort By" radio group section entirely (date created, date updated, name, status)
- Keep only the Ascending/Descending toggle buttons
- Clean up the design: remove the outer border/bg-muted container, use a compact inline style matching the toolbar aesthetic — two small pill-style buttons side by side with icons

**`src/components/letters/LettersList.tsx`**
- Replace the sort stub ("Sort options coming soon...") with the same two Ascending/Descending toggle buttons inline
- Use identical styling to the Sessions sort for consistency

### Design
Both panels will show a simple inline row:

```text
[ ↑ Ascending ] [ ↓ Descending ]
```

Compact, no labels/headers, active state uses the default button variant, inactive uses outline. Matches the small toolbar aesthetic already in place.

