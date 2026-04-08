

## Add Primary Location Field

### Summary
Add a "Primary location" dropdown with options Victoria, Vancouver, Kelowna, and Surrey to both the onboarding flow (Step 1) and the Settings Profile tab. Persist the value in the `user_profiles` table via a new `primary_location` column.

### Database
Add `primary_location` (text, nullable) column to `user_profiles` table. Update the `update-user-profile` edge function to accept and validate this field.

### Onboarding (OnboardingStepOne.tsx)
- Add `primaryLocation` to `OnboardingFormState` in `NewUserOnboardingModal.tsx`
- Add a "Primary location" Select dropdown after the Specialty field with options: Victoria, Vancouver, Kelowna, Surrey
- Pass `primary_location` in the profile save call

### Settings Profile (ProfileSettings.tsx)
- Add `primaryLocation` to `ProfileFormState`
- Add a "Primary location" Select in the Clinic name / Phone number row, making it a 3-column grid: Clinic name, Primary location, Phone number

### Edge Function (update-user-profile/index.ts)
- Add `"primary_location"` to `ALLOWED_FIELDS`
- Validate as a string with max length, sanitize like other string fields

### Files to change

| File | Change |
|------|--------|
| Migration | Add `primary_location` text column to `user_profiles` |
| `src/components/onboarding/NewUserOnboardingModal.tsx` | Add `primaryLocation` to form state, pass to save |
| `src/components/onboarding/OnboardingStepOne.tsx` | Add Primary location dropdown after Specialty |
| `src/components/settings/ProfileSettings.tsx` | Add Primary location dropdown in profile form |
| `supabase/functions/update-user-profile/index.ts` | Allow `primary_location` field |

