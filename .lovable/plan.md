## Goal
Make the active state for the footer items (Switch App, What's New, Help Center) visually clear by adding a thin Salmon (#FF887C / `primary`) vertical accent bar on the left edge of the active button, plus the existing color/weight shift. Keeps these visually distinct from the main nav (which uses background fill + white-bordered icon).

## Changes

### `src/components/settings/LeftPane.tsx`
- For What's New and Help Center buttons (both expanded and collapsed states):
  - Wrap the button in a `relative` container so we can absolutely position the bar.
  - When `isActive` (route match), render a 3px-wide, ~60% height, rounded `bg-primary` bar pinned to the left edge, vertically centered (`absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[3px] rounded-r-full bg-primary`).
  - Keep the existing `text-foreground font-semibold` + `strokeWidth=2.5` shift on icon and label.
- In collapsed mode the bar sits at the left edge of the icon button just the same.

### `src/components/sidebar/SwitchAppPopover.tsx`
- Treat `open` as the active condition.
- Add the same left accent bar inside the trigger button (button becomes `relative`).
- Keep the color/weight shift already in place.

## Visual spec
- Bar: `w-[3px] h-[60%] rounded-r-full bg-primary` (Salmon).
- Position: `absolute left-0 top-1/2 -translate-y-1/2`.
- Bar shows only when active; smooth via existing `transition-all duration-200` on the button.

## Out of scope
- No changes to main nav active styling.
- No background fills, dots, or icon-wrapper changes for footer items.
