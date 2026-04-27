## Reorganize Profile settings layout

### Changes to `src/components/settings/ProfileSettings.tsx`

**1. Remove the standalone "Account" card**
- Delete the entire top card that currently shows the email on its own.

**2. Move email into the "About you" card, under the profile image**
- Directly beneath the 64x64 avatar, add a subtle muted row:
  - Small "Email" label (muted, `text-xs`) followed by the email value (`text-sm text-muted-foreground`).
  - No input — purely read-only display.
- This keeps the avatar as the visual anchor and makes the email feel like part of the user's identity block without adding a fourth row.

**3. Restructure the form rows inside "About you"**

Row 1 (unchanged) — `[Title 120px | First name | Last name]`

Row 2 (changed) — `[Phone number | Specialty | Your role]`
- Remove the "Preferred name" field entirely (also remove `preferredName` from form state).
- Phone number takes the leftmost slot in a 3-column grid.

Row 3 (changed) — `[Clinic name (read-only) | Primary location | Display language]`
- Clinic name becomes non-editable: render as a disabled `Input` (greyed but visually consistent with other fields) showing `user.clinicName || user.clinic`.
- Remove it from `formData` state since it can no longer change.
- Primary location dropdown moves into slot 2.
- Display language dropdown moves into slot 3.

Row 4 — **removed entirely** (display language is now in row 3).

### Result
- One consolidated "About you" card (no separate Account card).
- Email shown as a subtle, non-editable line under the profile image.
- Three clean rows of fields, no preferred name, clinic name visibly locked.
