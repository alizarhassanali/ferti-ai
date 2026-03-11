
## Add Description to Consent Popup Setting

Add the requested description text under the "Consent popup" label to explain what the setting does.

### Changes to `src/components/settings/PrivacySettings.tsx`

Update the Consent Settings container layout from a single-row flex to a layout that accommodates the description:

| Current | New |
|---------|-----|
| Single row with label left, switch right | Label + description stacked on left, switch aligned to the right |
| No description | Add: "Display a consent script before transcription starts so the patient can provide verbal consent." |

**Implementation approach:**
- Restructure the consent popup container to use flex layout where the left side is a vertical stack (label + muted description) and the right side has the switch
- Keep the muted text styling consistent with other description text in the app (`text-sm text-muted-foreground`)
- Maintain the existing minimal bordered container design

