

## Fix Dialog Slide-in Bug

### Root Cause

The `DialogContent` is centered using Tailwind classes `translate-x-[-50%] translate-y-[-50%]` combined with `left-[50%] top-[50%]`. However, the `scale-in` keyframe sets:

```css
transform: scale(0.95) /* at 0% */
transform: scale(1)    /* at 100% */
```

This **completely replaces** the translate values during animation, so the dialog starts un-centered (bottom-right) and snaps to center when the animation ends and the Tailwind translate classes take effect again.

### Fix

**`tailwind.config.ts`** — Update `scale-in` and `scale-out` keyframes to include the translate centering:

```ts
"scale-in": {
  "0%": { opacity: "0", transform: "translate(-50%, -50%) scale(0.95)" },
  "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
},
"scale-out": {
  "0%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
  "100%": { opacity: "0", transform: "translate(-50%, -50%) scale(0.95)" },
},
```

This preserves the centering throughout the animation so the dialog fades/scales smoothly in place.

### Scope
- Only `tailwind.config.ts` needs to change (2 keyframe objects)
- All dialogs using `animate-scale-in`/`animate-scale-out` will benefit

