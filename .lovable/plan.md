

## Make Onboarding Demo Accessible Without Login

The issue is that the published URL (`preview--otto-notes.lovable.app`) requires Lovable authentication. The **published** URL (`otto-notes.lovable.app`) does not require Lovable login — it's your public app.

So sharing `https://otto-notes.lovable.app/new-user-screen` should work without any Lovable login.

However, the onboarding modal currently calls `supabase.functions.invoke('update-user-profile')` on step 1 continue, which will fail without a backend session. To make it work cleanly as a demo:

### Changes

**`src/components/onboarding/NewUserOnboardingModal.tsx`**
- Add a `demoMode` prop (optional, defaults to `false`)
- When `demoMode` is true, skip the Supabase profile update call in `handleStepOneContinue` — just advance to step 2
- On finish in demo mode, navigate to `/` instead of `/new-session`

**`src/pages/NewUserScreen.tsx`**
- Pass `demoMode` prop based on whether there's an active auth session, or simply always run in demo mode on this route (since real onboarding would be triggered by the auth flow)
- Simplest approach: detect if no session exists and pass `demoMode={true}` automatically

This way, anyone visiting `https://otto-notes.lovable.app/new-user-screen` sees the full onboarding UI and can click through both steps without errors — no login required.

