
## Fix Toast Auto-Dismiss and Position

### Problem
1. The Radix toast (`useToast` from `use-toast.ts`) never auto-dismisses — the `toast()` function creates the toast but never calls `dismiss()` on a timer.
2. The toast viewport overlaps the browser scrollbar because it's pinned to `right-0`.

### Changes

**1. `src/hooks/use-toast.ts`** — Add auto-dismiss timer
In the `toast()` function, after dispatching `ADD_TOAST`, add a `setTimeout` that calls `dismiss()` after 2000ms:

```ts
// After the dispatch ADD_TOAST block, add:
setTimeout(() => {
  dismiss();
}, TOAST_REMOVE_DELAY);
```

**2. `src/components/ui/toast.tsx`** — Move viewport left of scrollbar
Change `ToastViewport` classes from `right-0` to `right-4` so it sits inside the app content area, away from the scrollbar:

```
"fixed top-0 right-4 z-[100] flex max-h-screen w-full flex-col p-4 md:max-w-[320px]"
```

**3. `src/components/ui/sonner.tsx`** — Adjust Sonner offset too
Add `offset` prop or adjust the `style` to pull Sonner toasts slightly left as well, ensuring consistency. Add `style={{ right: '16px' }}` or use the `offset` prop.
