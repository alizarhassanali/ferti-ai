

## Fix Switch App Popover

**File:** `src/components/sidebar/SwitchAppPopover.tsx`

Three changes:

1. **Remove truncate** from the app name `<span>` (line 62) — allow text to wrap naturally
2. **Change Fertiwise initials** from `'FF'` to `'FW'` (line 11)
3. **"Onboarding Platform"** will naturally wrap to two lines once truncate is removed — "Onboarding" on top, "Platform" below — since the grid cell is narrow enough.

```tsx
// Line 11: Change FF → FW
{ id: 'fertiwise', name: 'Fertiwise', initials: 'FW', color: 'bg-[#263F6A]' },

// Line 62: Remove truncate, allow wrap
<span className="text-[11px] text-foreground/80 font-medium text-center w-full">
```

