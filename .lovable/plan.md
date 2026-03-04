

## Polish Switch App Popover

### Changes — `src/components/sidebar/SwitchAppPopover.tsx`

**1. Update app list** (remove Otto Notes since it's the current app):
- Onboarding Platform (CNP)
- Fertiwise (FF)
- SOP AI (SOP)
- Otto Pulse (OP)

**2. Uniform styling:**
- All icons use the same dark navy `bg-[#263F6A]` color
- Shrink icons from `w-10 h-10` to `w-9 h-9`, keep `rounded-full`
- Remove `current` app logic and indicator dot (current app no longer in list)

**3. Keep existing popover container styling** (`p-3`, `rounded-2xl`, `bg-card`, etc.)

