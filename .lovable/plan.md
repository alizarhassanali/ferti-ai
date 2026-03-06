

## Add Signature Step to New User Onboarding Flow

### Overview
After the user completes the profile form and clicks "Continue", instead of navigating away immediately, show a second step within the same modal for signature setup + demo booking option.

### Changes

**`src/components/onboarding/NewUserOnboardingModal.tsx`**
- Add a `step` state (`1 | 2`) to control which view is shown
- **Step 1** (current profile form): On "Continue" click, save profile data to backend as before, then advance to step 2 instead of navigating
- **Step 2** (new signature + demo step):
  - "Back" link at top-left to go back to step 1
  - Same logo + "Set up your signature" heading
  - Compact Tiptap rich text editor (reuse `RichTextToolbar`, smaller `min-h-[100px]`) pre-populated with user's title + name from step 1
  - Two toggle switches: "Enable signature" and "Append to AI-generated letters" (compact, no card wrapper)
  - Separator
  - Checkbox: "Book a 1-1 demo with an Otto Notes expert"
  - When checked, reveal a required "Reason for demo" text input (e.g. placeholder "e.g. Exploring for my practice, evaluating AI tools...")
  - "Continue" button at bottom — saves signature to localStorage (same key as settings), then navigates to `/new-session`
  - Continue is disabled if demo checkbox is checked but reason field is empty

### Technical details
- Signature saved to `localStorage` under `medical-scribe-signature-settings` key (same format as `SignatureSettings` component)
- Demo booking preference stored in localStorage for now (could be sent to backend later)
- Tiptap extensions: StarterKit, Underline, TextAlign (already installed)
- Import `RichTextToolbar` from `@/components/letters/RichTextToolbar`

