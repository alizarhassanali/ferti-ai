

## Make file-type error toast match global toast style

### Problem
The unsupported file type toast uses `sonner` (`toast.error(...)`) which renders with a red-tinted Sonner style. The rest of the app uses the Radix-based `useToast` from `@/hooks/use-toast`, which shows clean white card toasts.

### Fix

**`src/components/newSession/RightColumnPanel.tsx`**
- Remove `import { toast as sonnerToast } from 'sonner'`
- Import `import { useToast } from '@/hooks/use-toast'`
- Call `const { toast } = useToast()` inside the component
- Replace both `sonnerToast.error(...)` calls with:
  ```ts
  toast({ title: "Unsupported file type", description: "Only PDF, DOCX, DOC, PNG, and JPEG are allowed.", variant: "destructive" })
  ```

**`src/components/newSession/ContextTab.tsx`**
- Same change: replace `import { toast } from 'sonner'` with `useToast` and update the two toast calls to match.

### Result
The error notification will render as the same clean white/destructive card toast used everywhere else in the app.

