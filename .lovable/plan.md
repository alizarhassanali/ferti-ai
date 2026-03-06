

## New User Onboarding Modal on `/new-user-screen`

### Approach
Create a `/new-user-screen` route that renders the New Session page with an onboarding modal popup overlaid on top. The modal collects core profile info from first-time users. When they click "Continue", their `user_profiles` record is updated with `profile_completed = true`, and they are redirected to `/new-session`.

### Fields to collect (modal form)
- Profile image (optional upload)
- Title (Dr., Mr., Mrs., etc.)
- First name (required)
- Last name (required)
- Preferred name (optional)
- Specialty (required, dropdown)
- Phone number with country code
- Display language (dropdown)
- Terms/policy agreement checkbox (required)

### Design
- Centered card modal with Otto logo at top, matching the screenshot style
- "Tell us about yourself" heading + "Let's get your account set up." subtitle
- Form fields laid out cleanly (2-col for first/last name, single col for rest)
- "Continue" button at bottom, disabled until required fields + terms are filled
- Terms text: "I have read and agree to abide by the Usage Policy, Privacy Policy and Terms of Use" with links

### Files to create/change

1. **`src/pages/NewUserScreen.tsx`** — New page component that renders the `<NewSession />` content in the background with a `<NewUserOnboardingModal />` overlaid on top

2. **`src/components/onboarding/NewUserOnboardingModal.tsx`** — The modal component with:
   - Otto logo, heading, subtitle
   - Profile image upload (avatar + upload button)
   - Title, First name, Last name fields
   - Preferred name field
   - Specialty dropdown (reuse options from ProfileSettings)
   - Phone number with country code selector
   - Display language dropdown
   - Terms checkbox with policy links
   - "Continue" button → calls `update-user-profile` edge function with all fields + `profile_completed: true`, then navigates to `/new-session`

3. **`src/App.tsx`** — Add route: `<Route path="/new-user-screen" element={<NewUserScreen />} />`

### Backend
No DB changes needed — `user_profiles` already has all required columns (`first_name`, `last_name`, `signature_preferred_name`, `signature_title`, `signature_specialty`, `phone_country_code`, `phone_number`, `language`, `profile_completed`). The existing `update-user-profile` edge function handles all these fields.

