

## Remove H1/H2/H3 and Bullet List from Onboarding Signature Toolbar

### Approach
Add an optional `exclude` prop to `RichTextToolbar` that accepts an array of tool labels to hide. Then pass the relevant exclusions from `OnboardingStepTwo`.

### Changes

**`src/components/letters/RichTextToolbar.tsx`**
- Add optional `exclude?: string[]` prop to `RichTextToolbarProps`
- Filter out tools whose `label` is in the exclude list (and clean up orphaned separators)

**`src/components/onboarding/OnboardingStepTwo.tsx`**
- Pass `exclude={['Heading 1', 'Heading 2', 'Heading 3', 'Bullet list']}` to `RichTextToolbar`

This keeps the full toolbar available in Settings and Letters while making it compact for the onboarding popup.

