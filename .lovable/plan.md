

## Remove Red/Salmon Focus Ring Borders Globally

This plan will remove the salmon-colored focus ring borders that appear around form elements, dropdown items, and buttons throughout the application.

### Root Cause

The red borders are caused by:
1. **Global CSS rule** in `src/index.css` (lines 204-212) that applies `ring-2 ring-brand` to all `:focus-visible` elements
2. The `--brand` CSS variable is set to salmon (#FF887C), creating the red appearance
3. Individual component styles also add their own focus ring classes

### Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Remove global focus-visible ring rules |
| `src/components/ui/input.tsx` | Remove ring focus styles |
| `src/components/ui/textarea.tsx` | Remove ring focus styles |
| `src/components/ui/button.tsx` | Remove ring focus styles |
| `src/components/ui/select.tsx` | Remove ring focus styles from trigger |
| `src/components/ui/checkbox.tsx` | Remove ring focus styles |
| `src/components/ui/radio-group.tsx` | Remove ring focus styles |
| `src/components/ui/switch.tsx` | Remove ring focus styles |

### Implementation Steps

1. **Update `src/index.css`** (lines 204-212)
   - Remove or comment out the global focus-visible ring styles:
   ```css
   /* Before */
   *:focus-visible {
     @apply outline-none ring-2 ring-brand ring-offset-2 ring-offset-background;
   }
   
   /* After - Remove ring styles, keep outline-none */
   *:focus-visible {
     @apply outline-none;
   }
   ```

2. **Update `src/components/ui/input.tsx`**
   - Remove `focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary`
   - Keep only `focus-visible:outline-none`

3. **Update `src/components/ui/textarea.tsx`**
   - Remove `focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary`
   - Keep only `focus-visible:outline-none`

4. **Update `src/components/ui/button.tsx`**
   - Remove `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` from `buttonVariants`
   - Keep only `focus-visible:outline-none`

5. **Update `src/components/ui/select.tsx`**
   - Remove `focus:ring-2 focus:ring-primary focus:border-primary` from SelectTrigger
   - Keep only `focus:outline-none`

6. **Update `src/components/ui/checkbox.tsx`**
   - Remove `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
   - Keep only `focus-visible:outline-none`

7. **Update `src/components/ui/radio-group.tsx`**
   - Remove `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
   - Keep only `focus:outline-none`

8. **Update `src/components/ui/switch.tsx`**
   - Remove `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`
   - Keep only `focus-visible:outline-none`

### Accessibility Consideration

Removing focus rings reduces visibility for keyboard navigation. The implementation keeps `outline-none` to prevent browser default outlines. If keyboard accessibility becomes a concern later, a subtle focus indicator (like a slight shadow or border color change) can be re-added as a more visually subtle alternative.

