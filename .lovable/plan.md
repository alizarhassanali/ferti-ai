

## Fix Consent Popup Animation and Divider

### Problems
1. **Slide-in animation**: The `DialogOverlay` uses `animate-fade-in` which includes a `translateY(-8px)` transform — this can cause a visual shift. The content uses `animate-scale-in`/`animate-scale-out` which are centered scale animations and should be fine, but the overlay shift may give a "sliding" feel.
2. **Divider line**: `DialogFooter` in `dialog.tsx` includes `border-t border-border` — this adds the unwanted divider between body and buttons.
3. **Footer background tint**: `DialogFooter` has `bg-muted/30` which adds a subtle background that differs from the screenshot.

### Fix in `src/components/newSession/ConsentPopupDialog.tsx`

Override the `DialogFooter` className to remove the border and background:

```tsx
<DialogFooter className="flex flex-col gap-2 sm:flex-col border-0 bg-transparent">
```

This keeps the global `DialogFooter` styling intact for other dialogs while making the consent popup match the screenshot (no divider, no background tint on footer).

The animation issue is minor — the `scale-in` animation on `DialogContent` is a standard center-scale popup. If it still feels like a slide, we can also ensure the overlay `animate-fade-in` doesn't include the `translateY` shift by overriding the overlay animation class, but this is likely acceptable as-is since the content itself scales from center.

