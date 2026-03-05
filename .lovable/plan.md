

## Limit Attachments to 15 & Fix Scrolling for Attachment Pills

### Changes

**File 1: `src/hooks/useDocumentOCR.ts`** — Add 15-file limit to `addFiles`
- Before adding files, check if `current files + new files > 15`
- If over limit, show toast: `"You can add 15 attachments at most."` using `toast.error` from sonner
- Only add files up to the remaining capacity (e.g., if 12 exist and user drops 5, add only 3)

**File 2: `src/components/newSession/ContextTab.tsx`** — Cap the attachment pills area to 2 rows with scroll
- Replace the `flex flex-wrap gap-2` container (line 99) with a `max-h` constrained div + `overflow-y-auto`
- Each pill is ~32px tall + 8px gap, so 2 rows ≈ 72px → use `max-h-[72px] overflow-y-auto`
- This prevents the textarea from shrinking as more files are added

