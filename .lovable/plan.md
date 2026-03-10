

## Fix: Add review disclaimer to the correct component

The banner was added to `src/components/newSession/NoteTab.tsx`, but the `/new-session` page actually renders `RightColumnPanel.tsx` (via `TwoColumnLayout`). That's why you don't see it.

### Change

**`src/components/newSession/RightColumnPanel.tsx`** — Add the same always-visible disclaimer banner inside the Note view section, right after the textarea (around line 350), before the letter actions block:

```tsx
{/* Review disclaimer - always visible */}
<div className="flex items-center gap-2 px-3 py-2 mt-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md text-sm text-amber-800 dark:text-amber-200">
  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
  <span>Review your note before use to ensure it accurately represents the visit</span>
</div>
```

- Import `AlertTriangle` from `lucide-react` (already has many icons imported on line 2)
- Place it inside the note panel section, after the textarea and before the letter actions — rendered unconditionally so it's always visible regardless of generation state
- Keep the existing one in `NoteTab.tsx` as well since `MainTabsContainer` also imports it

