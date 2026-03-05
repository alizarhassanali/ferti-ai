

## Make Profile Settings Match Screenshot

### Changes to `src/components/settings/ProfileSettings.tsx`:

1. **Add "Account" card** at the top (separate bordered card) showing the user's email: `Email: {user.email}`

2. **Update image upload description** text from "Upload a JPG or PNG image up to 5MB." to "Upload a JPG, PNG, GIF, or WebP image up to 5MB."

3. **Add "Senior Embryologist"** to the specialty dropdown options

4. **Remove "Language & time" subsection header and description** — keep just the "Display language" and "Date format" fields directly without the `h4` heading and `p` description text

5. **Add a separator/divider line** before the Save/Cancel buttons (using `border-t border-border`)

6. **Style "Save Changes" button** with coral/primary color: add `className="bg-[#E8755A] hover:bg-[#d4664d] text-white"`

### Changes to `src/components/settings/MiddlePane.tsx`:

7. **Add "Privacy" and "Signature" tabs** to the settings categories list (Privacy with Lock icon already exists; add Signature with `PenLine` icon between Privacy and AI Settings)

Reorder categories to match screenshot: Profile, Privacy, Signature, AI Settings, User management, Security.

