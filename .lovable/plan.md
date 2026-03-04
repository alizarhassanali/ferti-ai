

## Truncate Selected Specialty Value in Filter Pills

**File:** `src/components/templates/hub/TemplateFilters.tsx`

**Change:** Add a max-width and truncate class to the value `<span>` inside `FilterPill` so long specialty names get truncated with an ellipsis, keeping the pill a consistent size.

```tsx
// Before (line ~48)
<span className="text-xs">{value}</span>

// After
<span className="text-xs max-w-[80px] truncate inline-block">{value}</span>
```

This ensures pills like "Reproductive Endocrinologist And Infertility" won't stretch the pill — they'll show as "Reproductive E…" instead.

