

## Move review disclaimer inline with action buttons

Currently the disclaimer banner sits as a separate block above the action buttons. The idea is to integrate it into the same row as the "Reviewed" and "Send to Letters" buttons, making it more compact and contextually placed.

### Change

**`src/components/newSession/RightColumnPanel.tsx`**

1. **Remove** the standalone disclaimer block (lines 593-597).
2. **Move** the disclaimer text inline into the letter actions area (lines 600-626). It will sit in the same row as the buttons, pushed to the right (or left) using flex layout:

```
┌─────────────────────────────────────────────────────┐
│ ⚠ Review your note before use...  [Reviewed] [Send] │
└─────────────────────────────────────────────────────┘
```

- The disclaimer becomes part of the `mt-4 pt-4 border-t` section
- Use `flex items-center gap-2` with the warning icon + text on the left, buttons on the right via `ml-auto`
- Show the disclaimer **always** when there's generated content (same condition as the buttons)
- When no generated content exists, keep it as a standalone subtle line below the textarea so it's still always visible

This keeps the legal notice visible at all times while reducing vertical space usage.

