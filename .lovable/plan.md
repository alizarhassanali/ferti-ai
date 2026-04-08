

## Phone Number Field — Flag-Based Country Selector

### Summary
Replace the current plain text country code dropdown (`+1`, `+44`, etc.) with a flag-based country selector that shows the country flag emoji and dial code inline, matching the reference screenshots. The input will display as a single unified field with a small flag+chevron dropdown on the left and the phone number input on the right.

### Design (from reference images)

```text
┌──────────────────────────────────┐
│ 🇨🇦 ▾ │ +1 416 831 7293          │
└──────────────────────────────────┘
```

- Flag emoji + chevron as a button/trigger on the left inside the input border
- Country dropdown shows flag + country name, scrollable list
- Selected country auto-sets the dial code prefix
- Phone number input shares the same visual border as the flag selector

### Changes

**New component: `src/components/ui/phone-input.tsx`**
- Reusable phone input component
- Contains a list of countries with name, ISO code, dial code, and flag emoji
- Left side: clickable flag button that opens a Popover with a scrollable, searchable country list
- Right side: standard text input for the phone number
- Props: `value`, `onChange`, `countryCode`, `onCountryCodeChange`
- Unified border styling so flag selector and input appear as one field

**`src/components/settings/ProfileSettings.tsx`**
- Replace the current `Select` + `Input` combo in the phone number section with the new `PhoneInput` component
- Update `phoneCountryCode` state to store the ISO country code (e.g. `"CA"`) instead of the dial code string

**`src/components/onboarding/OnboardingStepOne.tsx`**
- If phone number field exists in onboarding, apply the same `PhoneInput` component (check if it's present there)

### Country data (subset)
The component will include common countries: Canada, US, UK, France, Germany, Australia, Brazil, India, etc. — a comprehensive list similar to the reference screenshot showing all countries alphabetically.

