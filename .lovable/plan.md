

## Fix Double Scrollbar on Settings/Profile Page

### Problem

There are two nested scrollable containers creating a double-scroll issue:

1. **AppLayout** (line 37): `<div className="flex-1 overflow-y-auto">` — wraps all children with scroll
2. **RightPane** (line 29): `<div className="flex-1 h-screen overflow-y-auto">` — also has its own scroll

The `SettingsContent` div also has no height constraint, so it expands naturally within the AppLayout scroller, while RightPane independently sets `h-screen overflow-y-auto`, creating a second scroll context.

### Fix

**File: `src/components/settings/RightPane.tsx`** (line 29)
- Change `h-screen overflow-y-auto` to `h-full overflow-y-auto` so it fills its parent instead of forcing viewport height

**File: `src/pages/Settings.tsx`** (line 12)
- Change `<div className="flex flex-1 min-w-0">` to `<div className="flex flex-1 min-w-0 h-full overflow-hidden">` so the settings content fills the AppLayout scroll area and lets only the RightPane scroll internally

**File: `src/components/layout/AppLayout.tsx`** (line 37)
- Change `overflow-y-auto` to `overflow-hidden` on the children wrapper so it doesn't create its own scrollbar — the RightPane handles scrolling itself

This ensures only one scroll context: the RightPane.

