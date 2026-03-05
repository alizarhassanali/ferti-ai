

## Fix Profile Settings Layout

**File: `src/components/settings/ProfileSettings.tsx`**

Two changes:

1. **Account section (lines 111-114)**: Put "Email" label and email value on the same line using a flex row instead of stacked layout:
```tsx
<div className="flex items-center gap-2">
  <Label className="text-sm font-medium">Email</Label>
  <p className="text-sm text-muted-foreground">{user.email}</p>
</div>
```

2. **Fix spacing between Phone Number and Display Language (lines 233-236)**: The phone number section has `mb-6` and the language section has `pt-6`, creating double spacing. Remove `pt-6` from the language div (line 236) to make spacing consistent with the gap between Title/Specialty rows (which use the parent `space-y` or `mb-4`). Change `mb-6` on phone number div to `mb-4` to match other field spacing.

