

## Fix Glitchy Send to Letters Dialog

### Problem
The dialog's middle content (textarea, label, helper text) is rendered as a bare `<div>` instead of using the standardized `DialogBody` component. Every other dialog in the app uses `DialogHeader` → `DialogBody` → `DialogFooter`, which provides proper padding, scrolling, and flex layout. Without `DialogBody`, the content doesn't integrate with the dialog's flex-column structure, causing visual glitches.

### Fix: `src/components/newSession/SendToLettersDialog.tsx`
- Import `DialogBody` from the dialog component
- Replace the bare `<div className="space-y-2 py-2">` wrapper with `<DialogBody className="space-y-2">`
- This aligns it with every other dialog in the app (PatientSelector, ConsentPopup, NewMemberModal, etc.)

### Files to change
| File | Change |
|------|--------|
| `src/components/newSession/SendToLettersDialog.tsx` | Wrap content in `DialogBody` instead of bare `div` |

