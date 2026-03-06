

## Fix Continue Button Color

**File:** `src/components/onboarding/NewUserOnboardingModal.tsx`

Change the Continue button from `className="w-full bg-primary hover:bg-primary/90"` to use the default button variant (which applies the brand/salmon color automatically). Simply remove the custom className overrides and keep `variant="default"` (already the default).

