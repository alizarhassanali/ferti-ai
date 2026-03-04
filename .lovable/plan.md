

## Match User Management Filters to Pill Style

**File:** `src/components/settings/UserManagement/UserManagementList.tsx`

### Problem
The "All Status" and "All Roles" filter buttons use `Button variant="outline"` which applies `border border-primary` — a bold dark Ocean blue border. They also use the default `rounded-lg` shape instead of the circular pill style.

### Changes

Replace both filter `<Button variant="outline">` with custom styled `<button>` elements matching the Template Hub pill style:

```tsx
// Lines 136 and 155: Replace Button with pill-style button
<button
  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all border bg-white text-foreground border-border hover:bg-muted"
>
  {label}
  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
</button>
```

This gives them:
- `rounded-full` — circular pill shape
- `border-border` — light gray border instead of bold primary
- Same padding/font as Template Hub pills

Both the Status and Roles dropdowns get this treatment. The `Button` import can stay since it's still used for "Add New Member".

