

## Polish the profile image upload button

### What changes

In `src/components/onboarding/OnboardingStepOne.tsx` (lines 58-78), replace the current basic upload section with a more polished design:

- Replace the `outline` button with a subtle, rounded upload area that feels more modern
- Add a camera/edit overlay on the avatar itself so users can click the avatar directly to upload
- Use a soft hover state with a semi-transparent overlay and camera icon on the avatar
- Remove the separate "Upload" button and helper text — consolidate into the avatar interaction
- Keep the hidden file input and existing upload logic

The new layout will be a centered avatar with a small camera badge icon in the bottom-right corner. Clicking anywhere on the avatar triggers the file input. On hover, the avatar gets a slight overlay with an upload hint.

```text
     ┌──────┐
     │  DR  │  ← Avatar with initials/image
     │  📷  │  ← Small camera badge bottom-right
     └──────┘
   Click to upload
```

### File: `src/components/onboarding/OnboardingStepOne.tsx`
- Replace lines 58-78 (profile image section) with a centered, clickable avatar that has a camera overlay badge
- Import `Camera` icon from lucide-react instead of `Upload`
- The avatar wrapper becomes a `label` element linked to the file input, with `cursor-pointer` and hover overlay styles
- Add a small absolute-positioned camera icon badge (bg-primary, rounded-full) at the bottom-right of the avatar
- Below the avatar, add subtle text "Click to upload photo" in `text-xs text-muted-foreground`

