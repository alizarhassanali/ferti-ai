

## Remove close button from onboarding modal

The `DialogContent` component in `src/components/ui/dialog.tsx` always renders an X close button (line 41-44). The onboarding modal already prevents overlay click and Escape key dismiss, but the X button is still visible.

### Approach

**`src/components/ui/dialog.tsx`** — Add an optional `hideCloseButton` prop to `DialogContent`. When `true`, the X button is not rendered.

**`src/components/onboarding/NewUserOnboardingModal.tsx`** — Pass `hideCloseButton` to `DialogContent`.

### Technical detail

```tsx
// dialog.tsx - DialogContent
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideCloseButton?: boolean;
}

// Conditionally render the close button
{!hideCloseButton && (
  <DialogPrimitive.Close className="absolute right-4 top-4 ...">
    <X className="h-4 w-4" />
  </DialogPrimitive.Close>
)}
```

```tsx
// NewUserOnboardingModal.tsx
<DialogContent
  className="max-w-md max-h-[90vh] p-0 gap-0 overflow-hidden"
  hideCloseButton
  onPointerDownOutside={(e) => e.preventDefault()}
  onEscapeKeyDown={(e) => e.preventDefault()}
>
```

This ensures the onboarding modal has no way to be dismissed — no X button, no overlay click, no Escape key.

