

## Lighten Filter Pill Borders & Label Updates

**File:** `src/components/templates/hub/TemplateFilters.tsx`

### Changes

1. **Soften the border** — Change `border-primary` to `border-border` on the filter pill button. This gives a light gray border matching the screenshot instead of the bold dark blue.

2. **Remove `shadow-sm` and `hover:shadow-md`** — The screenshot shows flat pills with no shadow.

3. **Show "Sort" label** — The screenshot shows "Sort" text visible alongside the value. Remove `hideLabel` from the Sort pill so both label and value display.

4. **Rename "Location" to "Clinic"** — The screenshot shows "Clinic" as the label.

```tsx
// Button classes change:
"border shadow-sm hover:shadow-md",
"bg-white text-foreground border-primary hover:bg-muted"
// becomes:
"border",
"bg-white text-foreground border-border hover:bg-muted"

// Sort pill: remove hideLabel prop
// Location pill: change label="Location" to label="Clinic"
```

