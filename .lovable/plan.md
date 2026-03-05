

## Fix Button Styles in Restart Confirmation Dialog

### Problem
In `src/pages/NewSession.tsx` (lines 385-391):
1. **Cancel** button uses `AlertDialogCancel` which inherits `buttonVariants({ variant: "outline" })` — this adds a border.
2. **Keep & Continue** uses `bg-secondary` which maps to white (`--secondary: 0 0% 100%`), causing the white background issue.

### Fix (single file: `src/pages/NewSession.tsx`)

- **Cancel**: Add `className="border-0"` to `AlertDialogCancel` to remove the border, or use `variant="ghost"` styling.
- **Keep & Continue**: Change from `bg-secondary text-secondary-foreground` to `bg-muted text-foreground hover:bg-muted/80` so it gets the light sky blue tint instead of plain white.

