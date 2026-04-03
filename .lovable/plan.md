

## Add Doctor's Note for Letters

### Summary
When a doctor clicks "Send to Letters", a popup dialog appears where they can optionally type a note for the nurse/care coordinator. The note is stored on the letter and displayed as an inline callout in the Letter Detail pane.

### Changes

**1. `src/types/letter.ts`**
- Add `doctorNote?: string` to `Letter` interface
- Add `doctorNote?: string` to `LetterFormData` interface

**2. `src/contexts/LettersContext.tsx`**
- Pass `doctorNote` through in `createLetter`
- Add demo `doctorNote` on one letter for visibility

**3. New: `src/components/newSession/SendToLettersDialog.tsx`**
- Dialog triggered by "Send to Letters" button
- Shows letter summary (patient name, template type)
- Optional textarea: "Add a note for the reviewer (optional)"
- Footer: Cancel + "Send to Letters" (primary)
- On confirm, calls `createLetter` with the optional `doctorNote`

**4. `src/components/newSession/RightColumnPanel.tsx`**
- Replace direct `handleApproveAndSendToLetters` call with opening the dialog
- Add state for dialog open/close
- Import and render `SendToLettersDialog`

**5. `src/components/newSession/NoteTab.tsx`**
- Same change as RightColumnPanel — open dialog instead of direct send

**6. `src/components/letters/LetterDetail.tsx`**
- Between header and rich text toolbar, render an inline callout when `letter.doctorNote` exists
- Style: info-style alert box with a `MessageSquare` icon, "Doctor's Note" label, and the note text
- Non-editable, view-only for the nurse/coordinator

### Files to create/change
| File | Action |
|------|--------|
| `src/types/letter.ts` | Add `doctorNote` field |
| `src/contexts/LettersContext.tsx` | Pass through `doctorNote` |
| `src/components/newSession/SendToLettersDialog.tsx` | Create — dialog with optional note textarea |
| `src/components/newSession/RightColumnPanel.tsx` | Open dialog instead of direct send |
| `src/components/newSession/NoteTab.tsx` | Open dialog instead of direct send |
| `src/components/letters/LetterDetail.tsx` | Show doctor's note callout |

