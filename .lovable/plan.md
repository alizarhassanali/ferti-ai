

## Fix: Red Dot Badge Not Showing

**Root Cause:** The `useUnseenReleases` hook calls `supabase.auth.getUser()` which can throw or return an error when there's no active session, causing the React Query to fail silently. When the query errors, `data` is `undefined` (falsy), so the badge never renders.

### Changes

**`src/hooks/useUnseenReleases.ts`**
- Wrap the `supabase.auth.getUser()` call in a try-catch
- If it errors, fall through to the localStorage-based check (same as no-user path)
- This ensures unauthenticated users always see the badge on first visit

**`src/components/settings/LeftPane.tsx`**
- No changes needed — the rendering logic is correct, the issue is purely in the data hook

### Technical Detail

```typescript
// Current (can fail silently):
const { data: { user } } = await supabase.auth.getUser();

// Fix: handle auth errors gracefully
let user = null;
try {
  const { data } = await supabase.auth.getUser();
  user = data?.user ?? null;
} catch {
  user = null;
}
```

This ensures the localStorage fallback path is always reached for unauthenticated users, making the red dot badge visible.

