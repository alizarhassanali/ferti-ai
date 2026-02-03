

## Fix Avatar Initials Opacity in Sidebar

The avatar currently shows the initials ("DSS") appearing faded because the semi-transparent background (`bg-session-action/50`) allows the sidebar to show through, making the text visually appear less prominent.

### Solution

Change the AvatarFallback to use a layered approach:
1. Use a pseudo-element or wrapper for the semi-transparent background
2. Keep the initials text as a separate layer with full opacity

### Implementation

**File: `src/components/settings/LeftPane.tsx`**

Update both AvatarFallback instances (expanded and collapsed states) to use `relative` positioning with a background overlay:

```tsx
// Before
<AvatarFallback className="bg-session-action/50 text-session-action-foreground font-semibold text-sm">
  {getInitials(user.name)}
</AvatarFallback>

// After - using relative positioning with a background div
<AvatarFallback className="relative text-session-action-foreground font-semibold text-sm">
  <div className="absolute inset-0 bg-session-action/50 rounded-full" />
  <span className="relative z-10">{getInitials(user.name)}</span>
</AvatarFallback>
```

This creates two layers:
- **Background layer**: The `div` with `absolute inset-0` fills the avatar with the semi-transparent navy blue
- **Text layer**: The `span` with `relative z-10` ensures the initials sit on top at full opacity

### Files to Modify

| File | Change |
|------|--------|
| `src/components/settings/LeftPane.tsx` | Update both AvatarFallback components (lines 160-162 and 188-190) to use layered structure |

