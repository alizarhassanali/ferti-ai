

## Make Toast Notifications Smaller, Tighter, and Faster

Two toast systems are in use: **Sonner** (primary, used via `src/lib/toast.ts`) and **Radix Toast** (legacy `src/components/ui/toast.tsx`). Both need updates.

### Changes

**1. `src/components/ui/sonner.tsx`** — Sonner toaster config
- Change `duration` from `3000` to `2000`
- Add compact padding and smaller text: `group-[.toaster]:py-2 group-[.toaster]:px-3 group-[.toaster]:text-xs group-[.toaster]:shadow-sm group-[.toaster]:rounded-lg group-[.toaster]:gap-1.5`
- Reduce shadow from `shadow-lg` to `shadow-sm`

**2. `src/lib/toast.ts`** — Toast helper functions
- Change all `duration: 3000` to `duration: 2000`

**3. `src/components/ui/toast.tsx`** — Radix toast (fallback)
- In `toastVariants`, change padding from `p-6 pr-8` to `p-3 pr-6`
- Change `space-x-4` to `space-x-2`
- Change `shadow-lg` to `shadow-sm`
- Change `rounded-md` to `rounded-lg`
- Reduce max-width in ToastViewport from `md:max-w-[420px]` to `md:max-w-[320px]`

This makes all notification popups compact, minimal, and auto-dismiss in 2 seconds.

