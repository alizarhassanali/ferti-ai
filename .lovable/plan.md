

## Fix Save Changes Button & Remove Divider

Apologies for the unnecessary changes. Two quick fixes:

**File: `src/components/settings/ProfileSettings.tsx`**

1. **Line 268**: Remove `border-t border-border` from the button container div — changing `"flex items-center gap-3 pt-6 border-t border-border"` to `"flex items-center gap-3 pt-6"`

2. **Line 269**: Revert the Save Changes button to use the default variant (no custom className) — just use `<Button onClick={handleSave} ...>` without the `className="bg-primary..."` override, so it uses the default salmon/brand color from the button variants.

