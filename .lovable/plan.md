

## Fix: X button on filter pills opening the dropdown

The X button already calls `stopPropagation()`, but since it's inside the Radix `DropdownMenuTrigger`, that alone isn't sufficient — Radix uses `pointerdown`/`click` internally. Adding `e.preventDefault()` will prevent the dropdown from opening.

### Change

**`src/components/templates/hub/TemplateFilters.tsx`** (line 59)
- Change the X click handler from:
  `(e) => { e.stopPropagation(); onChange(defaultValue); }`
- To:
  `(e) => { e.stopPropagation(); e.preventDefault(); onChange(defaultValue); }`

One line change.

