

## Add Chat Support Floating Button

**File:** `src/components/layout/AppLayout.tsx`

Add a circular chat support button (using `MessageCircle` from lucide-react) positioned just above the footer, right-aligned. Since the footer is part of the flex column layout, the button will sit in a container between the scrollable content and the footer — not overlapping.

### Approach

Add the chat button as a `position: absolute` element within the main content column, anchored to `bottom-0 right-0` but with enough bottom offset to clear the footer. Alternatively, simply place a small row with the button right-justified between `{children}` and `<AppFooter />`.

Simpler approach: Place the button in the flex column between content and footer:

```tsx
<div className="flex-1 flex flex-col overflow-hidden">
  <div className="flex-1 overflow-y-auto">
    {children}
  </div>
  <div className="flex justify-end px-6 pb-1 -mb-1">
    <button className="w-12 h-12 rounded-full bg-brand text-white shadow-lg flex items-center justify-center hover:bg-brand/90 transition-colors">
      <MessageCircle className="h-6 w-6" />
    </button>
  </div>
  <AppFooter />
</div>
```

This keeps the button visually floating above the footer without overlapping. Uses the existing `brand` color (salmon) matching the screenshot.

