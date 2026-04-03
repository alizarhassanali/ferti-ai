

## Add Delete Functionality for "To be sent" Letters

### Summary
Add delete capability in **both** the letter detail header and the letter list card, restricted to "To be sent" letters only. In production, this would be gated behind Doctor/Administrator roles.

### Changes

**1. `src/contexts/LettersContext.tsx`**
- Add `deleteLetter(id: string)` to the context interface and provider
- Removes the letter from state; clears `selectedLetterId` if the deleted letter was selected

**2. `src/components/letters/LetterDetail.tsx`**
- Add a `Trash2` icon button (ghost, destructive red) to the left of Copy/PDF in the action buttons row — only visible when `status === 'to_be_sent'`
- Clicking opens an `AlertDialog` confirmation: "Delete this letter? This action cannot be undone."
- On confirm, calls `deleteLetter`, shows a toast

**3. `src/components/letters/LetterCard.tsx`**
- Add a three-dot (`MoreHorizontal`) menu button that appears on hover, positioned at the top-right of the card
- Uses `DropdownMenu` with a single "Delete" item (red text, Trash2 icon) — only shown for `to_be_sent` letters
- Clicking "Delete" opens the same `AlertDialog` confirmation before deleting
- The menu button uses `e.stopPropagation()` to avoid triggering the card click

**4. Role restriction**
- Since the app currently uses demo data with no live auth, delete is shown by default (current user is assumed to be a doctor/admin)
- Code comments will mark where `has_role()` checks should be added when auth is wired up

### Files to change
| File | Change |
|------|--------|
| `src/contexts/LettersContext.tsx` | Add `deleteLetter` function |
| `src/components/letters/LetterDetail.tsx` | Add delete button + AlertDialog |
| `src/components/letters/LetterCard.tsx` | Add hover three-dot menu with delete option + AlertDialog |

