

## Polish Switch App Popover — Keep 2x2 Grid, Modernize

### Changes — `src/components/sidebar/SwitchAppPopover.tsx`

**1. Fix app data:**
- Rename "Ferti AI" → "Otto Notes", initials "SN" → "ON"

**2. Polish the 2x2 grid tiles:**
- Shrink avatar circles from `w-14 h-14` (56px) to `w-10 h-10` (40px) — less bulky, still readable
- Change circles from `rounded-full` to `rounded-xl` to match the app's rounded-square language used throughout the sidebar
- Use `bg-card` popover background instead of hardcoded `bg-white` for theme consistency
- Add a "SWITCH TO" header in `text-[10px] uppercase tracking-wider text-muted-foreground` matching the sidebar's "TEMPLATES" section header style
- Add `border border-transparent hover:border-border` on each tile for a subtle hover effect consistent with sidebar nav items
- Mark "Otto Notes" as current app with a small dot indicator or subtle `bg-muted` background
- Reduce initials font from `text-[11px]` to `text-[10px]` to fit the smaller circles

**3. Popover container:**
- Change `p-5` to `p-3` for tighter padding
- Keep `rounded-2xl shadow-xl border-border/50` — already matches

