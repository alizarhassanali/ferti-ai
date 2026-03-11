

## Update Avatar Upload Module

The current implementation already has the clickable avatar with hover overlay and upload icon. Minor refinements needed:

### Changes to `src/components/settings/ProfileSettings.tsx` (lines 122–143)

1. **Add Camera icon** instead of Upload icon in the hover overlay
2. **Add "Change photo" text** in the overlay on hover
3. **Add "Change photo" label** below the avatar, above the format helper text
4. Structure becomes:

```
[Avatar with hover overlay showing Camera icon + "Change photo"]
"Change photo" (clickable text label)
"JPG, PNG, GIF, WebP · Max 5 MB"
```

Only the profile image block (lines 122–144) is touched. No other fields or styling modified. Import `Camera` from lucide-react instead of (or alongside) `Upload`.

