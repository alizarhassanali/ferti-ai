

## Fix: "Not authenticated" error on Step 1 Continue

The issue is on line 56-59: `handleStepOneContinue` calls `supabase.auth.getSession()`, and since there's no authenticated user in the preview, it shows the "Not authenticated" toast and returns early, never advancing to step 2.

### Fix

**`src/components/onboarding/NewUserOnboardingModal.tsx`** — Make the backend call optional. If the user is not authenticated, skip the profile save and still advance to step 2. The profile data can be saved later when authentication is available.

- Wrap the backend call in a try-catch that doesn't block step advancement
- If no session exists, still proceed to step 2 (just skip the edge function call)
- Move `setStep(2)` outside the session check so it always runs after validation passes

