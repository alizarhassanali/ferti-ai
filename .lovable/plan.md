

## Remove Gray Box from Filter Pills

**File:** `src/components/templates/hub/TemplateFilters.tsx`

**Change:** Lines 48-55 — remove the `bg-muted`, `rounded-md`, and `px-1.5 py-0.5` styling from the value `<span>`, replacing it with plain inline text that inherits the pill's text color.

```tsx
// Before
<span className={cn(
  "text-xs px-1.5 py-0.5 rounded-md",
  hasActiveFilter ? "bg-white/20 text-brand-foreground" : "bg-muted text-muted-foreground"
)}>
  {value}
</span>

// After
<span className="text-xs">{value}</span>
```

