

## Fix: X button still opening dropdown

The issue is that Radix UI's `DropdownMenuTrigger` listens on `pointerdown`, not just `click`. Adding `stopPropagation`/`preventDefault` on `onClick` alone doesn't intercept the pointer event that Radix uses to open the menu.

### Change

**`src/components/templates/hub/TemplateFilters.tsx`** (lines 56-62)

Add an `onPointerDown` handler to the X span that stops propagation and prevents default, which will block Radix from seeing the event:

```tsx
<span
  role="button"
  className="ml-0.5 rounded-full hover:bg-brand/20 p-0.5 transition-colors"
  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
  onClick={(e) => { e.stopPropagation(); e.preventDefault(); onChange(defaultValue); }}
>
  <X className="h-3 w-3" />
</span>
```

The key addition is the `onPointerDown` handler — this intercepts the event before Radix's trigger can process it.

