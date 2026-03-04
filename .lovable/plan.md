

## Update Location Filter to Use Clinic Names

The location filter currently has generic country options. It needs to be updated to show the clinic names from the screenshots, and behave like the specialty filter (scrollable dropdown, wider menu, truncated pill value).

### Changes

**1. `src/data/hubTemplates.ts`** — Replace `locationOptions` with the clinic names from the screenshots:
```ts
export const locationOptions = [
  'All',
  'Generation Fertility',
  'Generation Fertility', // appears twice in screenshot — will deduplicate
  'Grace Fertility',
  'Olive Fertility Centre',
  'Ottawa Fertility Centre',
  'Repromed',
  'Repromed', // appears twice — will deduplicate
  'The Fertility Partners',
  'The Reproductive Care Centre',
] as const;
```
Deduplicated final list: All, Generation Fertility, Grace Fertility, Olive Fertility Centre, Ottawa Fertility Centre, Repromed, The Fertility Partners, The Reproductive Care Centre.

**2. `src/components/templates/hub/TemplateFilters.tsx`** — Add `dropdownClassName="min-w-[340px]"` to the Location `FilterPill` (same as specialty) so long clinic names display on a single line.

