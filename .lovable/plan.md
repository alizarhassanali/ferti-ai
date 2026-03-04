

## Update Specialty Filter Options in Template Hub

### Changes

**1. `src/data/hubTemplates.ts`** — Replace `specialtyOptions` array with the full list from the screenshots:

```ts
export const specialtyOptions = [
  'All',
  'Admin Assistant',
  'Andrologist',
  'Endocrinologist',
  'Fellow',
  'General Practitioner',
  'Lab Director',
  'Medical Director',
  'Medical Office Admin',
  'Nurse',
  'Nurse Manager',
  'Nurse Office Assistant',
  'Obstetrician-Gynecologist',
  'Obstetrics and Gynecology Specialist',
  'Patient Care Coordinator',
  'Physician',
  'Physician Assistant',
  'Physician Dispensary Coordinator',
  'Referral Coordinator',
  'Medical Office Assistant',
  'Reproductive Endocrinologist And Infertility',
  'Reproductive Endocrinologist and Fertility',
  'Resource Nurse',
  'Senior Embryologist',
  'Urologist',
] as const;
```

**2. `src/components/templates/hub/TemplateFilters.tsx`** — Widen the specialty dropdown content so long names fit on one line. Add a `minWidth` override specifically for the specialty filter, e.g. `min-w-[320px]` on the `DropdownMenuContent`. This can be done by passing an optional `dropdownClassName` prop to `FilterPill` and applying it only for the Specialty pill.

