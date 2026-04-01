

## Rearrange Profile Fields & Add Preferred Name

### Current layout (lines 174–229)
- **Row 1**: Specialty | Clinic Name | Role (3-col grid)
- **Row 2**: Phone number (full width)
- **Row 3**: Display language

### New layout
- **Row 1**: Preferred Name | Specialty | Role (3-col grid)
- **Row 2**: Clinic Name | Phone number (2-col grid, clinic on left, phone on right)
- **Row 3**: Display language

### Changes to `src/components/settings/ProfileSettings.tsx`

1. Add `preferredName: string` to `ProfileFormState` interface, initialized to `''`
2. Replace the current 3-col row (Specialty, Clinic Name, Role) with: **Preferred Name** (input, placeholder "The name you prefer to go by"), **Specialty** (select, moved here from first position), **Role** (stays)
3. Replace the phone number section with a 2-col grid: left column is **Clinic Name** (input), right column is **Phone Number** (country code select + input)

