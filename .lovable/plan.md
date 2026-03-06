

## Unify Specialty Options Across Three Components

### The canonical list (from `hubTemplates.ts`)
25 specialties: Admin Assistant, Andrologist, Endocrinologist, Fellow, General Practitioner, Lab Director, Medical Director, Medical Office Admin, Medical Office Assistant, Nurse, Nurse Manager, Nurse Office Assistant, Obstetrician-Gynecologist, Obstetrics and Gynecology Specialist, Patient Care Coordinator, Physician, Physician Assistant, Physician Dispensary Coordinator, Referral Coordinator, Reproductive Endocrinologist And Infertility, Reproductive Endocrinologist and Fertility, Resource Nurse, Senior Embryologist, Urologist.

### Changes

1. **`src/components/onboarding/NewUserOnboardingModal.tsx`** — Replace the 6-item specialty `<Select>` with the full list imported from `hubTemplates.ts` (excluding 'All').

2. **`src/components/settings/ProfileSettings.tsx`** — Same change: replace the hardcoded 6-item specialty dropdown with the full list from `hubTemplates.ts` (excluding 'All').

Both files will import `specialtyOptions` from `@/data/hubTemplates` and map over them (skipping 'All') to render `<SelectItem>` entries.

