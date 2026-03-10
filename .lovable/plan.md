

## Add Review Disclaimer Banner to NoteTab

### What
Add a persistent warning banner at the bottom of the NoteTab content area with a caution icon and the text: *"Review your note before use to ensure it accurately represents the visit"*. This is always visible — not conditional on generation state — serving as a legal disclaimer that the user must review AI-generated content.

### Where
**`src/components/newSession/NoteTab.tsx`** — Add a banner just above the letter actions section (or at the bottom of the content area if no actions are shown). It sits between the textarea and the action buttons, always rendered regardless of state.

```tsx
{/* Review disclaimer - always visible */}
<div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
  <span>Review your note before use to ensure it accurately represents the visit</span>
</div>
```

- Import `AlertTriangle` from `lucide-react` (already imported in `AskAIInput` for reference)
- Place it after the textarea / loading / warning states, before the letter actions `div`
- Always rendered — no conditional wrapping

### Also
Since `AskAIInput.tsx` has the same message in its footer, we should **remove the duplicate** from `AskAIInput` to avoid showing it twice. The `AskAIInput` bottom section with the `AlertTriangle` and review text (lines ~46-52) will be removed.

