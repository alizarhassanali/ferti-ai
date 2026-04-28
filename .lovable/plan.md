## Goal
Make Switch App, What's New, and Help Center indicate active state via a **color shift only** (no background, no border, no icon wrapper change). Icons and labels switch from muted to full foreground and gain `font-semibold`, matching the rest of the muted footer styling at rest.

## Changes

### `src/components/settings/LeftPane.tsx`
- Determine active state for the two route-based items:
  - What's New → active when `location.pathname === '/whats-new'`
  - Help Center → active when `location.pathname === '/resource-center'`
- When active:
  - Icon `className`: swap `text-muted-foreground` → `text-foreground`
  - Label `className`: swap `text-muted-foreground font-medium` → `text-foreground font-semibold`
- Leave background, padding, borders, and icon wrappers untouched (no `bg-sidebar-accent`, no white-bordered icon).
- Apply the same logic to both expanded and collapsed states (collapsed = icon-only color shift).

### `src/components/sidebar/SwitchAppPopover.tsx`
- Convert `Popover` to controlled with local `open` state.
- Pass `open` down to the trigger button so it applies the same color-shift active treatment (icon + label → `text-foreground`, label → `font-semibold`) while the popover is visible. No background/border change.

## Out of scope
- No changes to the main nav items.
- No background fills, accent bars, dots, or icon wrapper styling for the footer items.
