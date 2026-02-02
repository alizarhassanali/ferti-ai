

## Template Hub Page Consistency Update

This plan will update the Template Hub page to match the visual structure and layout of the My Templates page for a consistent user experience.

### Current Differences Identified

| Element | My Templates | Template Hub |
|---------|-------------|--------------|
| Container padding | `px-10 lg:px-14 py-10` | `px-8 lg:px-16 py-6` |
| Icon | FileText icon next to title | No icon |
| Title size | `text-[32px]` | `text-3xl lg:text-4xl` |
| Subtitle | "Library" below title | None |
| Search bar position | Separate row, left-aligned | Inline with title, right-aligned |
| Filters position | N/A | Centered below header |
| Section spacing | `mb-8` | `mb-6`, `mb-10` |

### Layout Changes

The new layout structure will be:

```text
+--------------------------------------------------+
| [Globe Icon] Template Hub                        |
|              Community                           |
+--------------------------------------------------+
| [Search Bar.............]     [Filter] [Filter]  |
+--------------------------------------------------+
| Template Grid                                    |
+--------------------------------------------------+
```

### Implementation Steps

1. **Update container padding** - Match `px-10 lg:px-14 py-10` from My Templates

2. **Add Globe icon to header** - Add `Globe` icon (h-7 w-7) next to "Template Hub" title, matching the FileText icon style in My Templates

3. **Fix title font size** - Change from `text-3xl lg:text-4xl` to `text-[32px]` to match My Templates

4. **Add subtitle** - Add "Community" subtitle below the title with `text-sm text-muted-foreground ml-10` styling

5. **Reorganize search and filters row** - Create a single row with:
   - Search bar on the left (matching My Templates styling with `max-w-md`)
   - Filters on the right (justified to end)

6. **Standardize spacing** - Use `mb-8` for consistent vertical rhythm

### Technical Details

**File to modify:** `src/components/templates/TemplateCommunity.tsx`

The header section will be restructured from:
```tsx
// Current: Title + search inline, filters centered below
<div className="flex ... justify-between ...">
  <h1>Template Hub</h1>
  <input ... />
</div>
<div className="flex justify-center ...">
  <TemplateFilters ... />
</div>
```

To:
```tsx
// New: Icon + title with subtitle, then search + filters inline
<div className="mb-8">
  <div className="flex items-center gap-3 mb-2">
    <Globe className="h-7 w-7 text-foreground" />
    <h1 className="font-sans text-[32px] font-semibold text-foreground tracking-tight">
      Template Hub
    </h1>
  </div>
  <p className="text-sm text-muted-foreground ml-10">Community</p>
</div>

<div className="flex items-center justify-between gap-4 mb-8">
  <div className="relative flex-1 max-w-md">
    <!-- Search input -->
  </div>
  <TemplateFilters ... />
</div>
```

**TemplateFilters component update:** `src/components/templates/hub/TemplateFilters.tsx`
- Remove `justify-center` from the parent container since alignment will be handled by the parent
- Keep filter pills as-is

