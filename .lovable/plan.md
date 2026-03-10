

## Filter Clearing UX for Template Hub

### The Problem
When a user has selected specific values on one or more filter pills, there's no obvious way to clear them — either individually or all at once.

### Proposed Approach

**1. Individual filter clearing — X button on active pills**
When a filter pill has a non-default value (not "All"), show a small `X` icon on the right side of the pill. Clicking the X resets that filter to "All" (or "Most Popular" for Sort). This is intuitive — the brand-colored pill already signals it's active, and the X gives a clear affordance to dismiss it.

The X click should stop propagation so it doesn't open the dropdown.

**2. "Clear all" button — shown only when 2+ filters are active**
A subtle text button labeled "Clear all" appears at the end of the filter row when 2 or more non-default filters are active. Clicking it resets all filters (Clinic, Specialty, Category) back to "All" and Sort back to "Most Popular".

Showing it at 2+ active filters avoids clutter when only one is set (the X on that pill is sufficient).

### Changes

**`src/components/templates/hub/TemplateFilters.tsx`**
- Add `X` import from lucide-react
- In `FilterPill`: when value is not default, render a small X button after the chevron. On click, call `onChange('All')` (with `stopPropagation`)
- In `TemplateFilters`: add an `onClearAll` prop. Count active filters (non-default values). When count >= 2, render a "Clear all" text button at the end of the row

**`src/components/templates/TemplateCommunity.tsx`**
- Add a `clearAllFilters` handler that resets sort/location/specialty/category to defaults
- Pass it to `TemplateFilters` as `onClearAll`

### Visual Behavior
- Active pill: `[🔍 Cardiology  ✕  ▾]` — brand-colored, X appears before chevron
- Inactive pill: `[🔍 Specialty  ▾]` — no X shown
- Clear all: appears as a ghost-style text link `Clear all` after the last pill

