

## Update Profile Settings UI — Layout & Interaction Improvements

### Changes to `src/components/settings/ProfileSettings.tsx`

**1. Avatar as upload trigger**
- Wrap the Avatar in a `<label>` linked to the hidden file input
- Add a hover overlay (`absolute inset-0`) with `Camera` icon + "Change photo" text, shown via `group-hover` on the avatar container
- Remove the separate "Upload image" button and its wrapper
- Keep helper text below avatar: `"JPG, PNG, GIF, or WebP · Max 5 MB"`

**2. Remove heavy section borders**
- Replace `border border-border rounded-lg p-6 bg-card` containers with borderless layout
- Use `Separator` component (or `border-b border-border`) between Account and About You sections
- Keep section titles ("Account", "About you") with existing typography
- Use vertical spacing (`space-y-6`, `pt-6`) for visual separation

**3. Clinic name → read-only display**
- Replace the `<Input>` for clinic name with a plain `<p>` styled as `text-sm text-muted-foreground`
- Keep the label above it

**4. Title / Name grid already correct**
- Already uses `grid-cols-[120px_1fr_1fr]` — no change needed

**5. Action buttons spacing**
- Increase top padding from `pt-6` to `pt-10` on the buttons row
- Button text: "Save changes" (lowercase 'c') — currently "Save Changes"

All other fields (Specialty, Role, Phone, Display language) remain untouched.

