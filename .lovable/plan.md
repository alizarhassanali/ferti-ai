

## Fix Attachment Limit Toast to Match "Recording Started" Design

### Problem
The app has two toast systems:
1. **Radix/shadcn toast** (`useToast` from `@/hooks/use-toast`) — produces the clean white card style seen in "Recording started / Transcribing..." (screenshot 2, the correct design)
2. **Sonner toast** (`showErrorToast` from `@/lib/toast`) — produces a red-tinted background toast (screenshot 1, the incorrect design)

The attachment limit message currently uses Sonner via `showErrorToast`, which doesn't match.

### Solution
**File: `src/hooks/useDocumentOCR.ts`**
- The hook can't use React hooks (`useToast`) directly since it's already a hook, but it can't call hooks conditionally. Instead, we have two options:

**Option A (Recommended):** Have `useDocumentOCR` accept an `onError` callback, and call it from `ContextTab.tsx` (or wherever it's consumed) using the Radix toast system. This keeps the hook UI-agnostic.

**Option B:** Import and use the Radix `toast` function (the standalone version from `@/hooks/use-toast`) directly in the hook — this function can be called outside components.

Going with **Option B** for minimal changes:

**`src/hooks/useDocumentOCR.ts`**:
- Replace `import { showErrorToast } from '@/lib/toast'` with `import { toast } from '@/hooks/use-toast'`
- Replace `showErrorToast("You can add 15 attachments at most.")` with:
  ```ts
  toast({ title: "You can add 15 attachments at most." })
  ```

This makes the attachment limit toast render identically to the "Recording started" toast — same white card, same typography, same position.

### Files changed
- `src/hooks/useDocumentOCR.ts` (2 lines)

