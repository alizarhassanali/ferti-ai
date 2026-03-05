

## Match New Session Page to Screenshot

Three changes needed:

### 1. Remove "Ex: pt..." hint line and its divider
**File: `src/components/newSession/RightColumnPanel.tsx`**
- Lines 520-523: Remove the example hint paragraph (`Ex: pt 35yoM...`)
- Lines 526: Remove the `border-t border-border` from the file attachment area div (remove `pt-4 border-t border-border` classes, keep `mt-4`)

### 2. Remove white background from transcript/left pane
**File: `src/components/newSession/TwoColumnLayout.tsx`**
- Line 87: Remove `bg-white` from the Textarea className
- Line 58: Remove `bg-muted/30` from the left pane header div (looking at screenshot, no tinted header background)

### 3. Remove white background from context panel
**File: `src/components/newSession/RightColumnPanel.tsx`**
- Line 517: Remove `bg-white` from the context Textarea className
- Line 318: Remove `bg-muted/30` from the right pane header div to match screenshot

Both panes should use the default `bg-background` instead of explicit white backgrounds, matching the screenshot's appearance.

