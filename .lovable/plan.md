

## Fix Three-Dot Menu Disappearing on Open

### Problem
The three-dot menu button uses `opacity-0 group-hover:opacity-100`. When the `DropdownMenu` opens, focus/pointer moves to the dropdown content (rendered in a portal outside the card), so `group-hover` no longer applies and the button becomes invisible, collapsing the menu.

### Solution: `src/components/letters/LetterCard.tsx`

- Add local state `const [menuOpen, setMenuOpen] = useState(false)` to track whether the dropdown is open
- Pass `open={menuOpen}` and `onOpenChange={setMenuOpen}` to the `DropdownMenu`
- Change the button className from `opacity-0 group-hover:opacity-100` to conditionally always show when menu is open: `${menuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`

This ensures the trigger button stays visible while the dropdown is open, regardless of hover state.

### Files to change
| File | Change |
|------|--------|
| `src/components/letters/LetterCard.tsx` | Add `menuOpen` state, controlled `DropdownMenu`, conditional opacity class |

