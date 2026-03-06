

## Remove Four Onboarding/Invite Routes

### Routes to Remove
- `/invite` → `SetPassword`
- `/complete-profile` → `CompleteProfile`
- `/onboarding/create-password` → `CreatePasswordPage`
- `/onboarding/complete-profile` → `CompleteProfilePage`

### Changes

1. **`src/App.tsx`** — Remove the 4 route entries and their imports (`SetPassword`, `CompleteProfile`, `CreatePasswordPage`, `CompleteProfilePage`)

2. **Delete files:**
   - `src/pages/onboarding/SetPassword.tsx`
   - `src/pages/onboarding/CompleteProfile.tsx`
   - `src/pages/onboarding/CreatePasswordPage.tsx`
   - `src/pages/onboarding/CompleteProfilePage.tsx`

