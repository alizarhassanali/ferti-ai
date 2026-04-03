

## Fix Sessions Panel Collapse Animation

### Problem
The sessions panel in `AppLayout.tsx` uses conditional rendering (`{showSessionsPanel && <div>...`). When the panel is hidden, the DOM element is immediately removed — so no exit/collapse animation ever plays. Only the enter animation (`animate-slide-in-left`) works.

### Solution
Instead of conditionally rendering the panel, **always render it** but animate its width between `w-80` (320px) and `w-0` using a CSS transition. This allows both expand and collapse to animate smoothly.

### Changes: `src/components/layout/AppLayout.tsx`

1. **Always render** the sessions panel wrapper div (remove the `{showSessionsPanel && ...}` conditional)
2. Use inline style + transition classes to animate width:
   - When visible: `width: 320px` with `overflow: hidden`
   - When hidden: `width: 0px` with `overflow: hidden`
   - Add `transition-all duration-200 ease-in-out` for smooth animation
3. Remove the `animate-slide-in-left` class (no longer needed — the width transition handles both directions)
4. Only render the `<GlobalSessionsPanel />` content when `shouldShowGlobalSessionsPanel` is true (to avoid unnecessary component mounting on routes that never show it)

### Result
```text
Before: Panel mounts with slide-in → Panel unmounts instantly (no animation)
After:  Panel width transitions 0→320px → Panel width transitions 320px→0 (smooth both ways)
```

### Files to change
| File | Change |
|------|--------|
| `src/components/layout/AppLayout.tsx` | Replace conditional render with width transition |

