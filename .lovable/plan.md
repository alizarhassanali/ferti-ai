

## Conditional Label Visibility in Filter Pills

**File:** `src/components/templates/hub/TemplateFilters.tsx`

### Changes

**1. Sort pill — remove the "Sort" label entirely**, only show icon + value + chevron. Add a `hideLabel` prop or handle it inline.

**2. Location/Specialty/Category pills — conditionally hide label** based on whether the value is "All":
- When value is "All" → show label (e.g., "Location"), hide the value text
- When a specific item is selected → hide the label, show only icon + truncated value

### Implementation

Update the `FilterPill` component to accept a `hideLabel` boolean prop. Then adjust the rendering:

```tsx
interface FilterPillProps {
  // ...existing props
  hideLabel?: boolean;  // Sort pill always hides label
}

const FilterPill = ({ icon, label, value, options, onChange, isActive, dropdownClassName, hideLabel }: FilterPillProps) => {
  const isDefault = value === 'All';
  const showLabel = !hideLabel && isDefault;
  const showValue = hideLabel || !isDefault;

  return (
    // ...
    <button ...>
      {icon}
      {showLabel && <span>{label}</span>}
      {showValue && <span className="text-xs max-w-[80px] truncate inline-block">{value}</span>}
      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
    </button>
    // ...
  );
};
```

Then pass `hideLabel` to the Sort pill:
```tsx
<FilterPill
  icon={<ArrowUpDown className="h-4 w-4" />}
  label="Sort"
  value={sortBy}
  options={sortOptions}
  onChange={onSortChange}
  hideLabel
/>
```

The other three pills keep their current usage unchanged — the logic is automatic based on whether the value is "All".

