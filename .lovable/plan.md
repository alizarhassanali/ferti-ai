

## Update Step 1 onboarding field placeholders and checkbox text

Make the Step 1 form fields more concise and clean up the placeholder text per requirements.

### Changes to `src/components/onboarding/OnboardingStepOne.tsx`

| Field | Current | New |
|-------|---------|-----|
| Preferred name placeholder | "How would you like to be called?" | "The name you prefer to go by" |
| First name placeholder | "First name" | Remove (no placeholder) |
| Last name placeholder | "Last name" | Remove (no placeholder) |
| Specialty placeholder | "Select your specialty" | "Select speciality" |
| Phone number placeholder | "Phone number" | "Enter phone number" |
| Display language | No placeholder shown | Add placeholder="English" (already defaults to English in state) |
| Terms checkbox text | "I have read and agree to abide by the Usage Policy, Privacy Policy and Terms of Use" | "I agree to the Privacy Policy and Terms of Use" |

