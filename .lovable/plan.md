
## Fix Toast Design Inconsistency for Attachment Limit

### Issue
`src/hooks/useDocumentOCR.ts` calls `toast.error()` directly from Sonner (lines 84, 90) instead of using the standardized `showErrorToast()` helper from `src/lib/toast.ts`. This bypasses consistent styling, positioning, and duration settings defined in the global toast system.

### Solution
**File: `src/hooks/useDocumentOCR.ts`**
1. Import `showErrorToast` from `@/lib/toast` 
2. Replace the two `toast.error("You can add 15 attachments at most.")` calls (lines 84, 90) with `showErrorToast("You can add 15 attachments at most.")`

This ensures the attachment limit toast uses the same design tokens (py-2 px-3, text-xs, bg-destructive/10, text-destructive, border-destructive/20, top-right position, 2000ms duration) as all other error toasts in the application.

**Files to change:**
- `src/hooks/useDocumentOCR.ts` (2 lines modified)
