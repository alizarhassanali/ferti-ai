

## Fix "Dictate" → "Dictation" Label in Left Pane Pill

**File:** `src/components/newSession/TwoColumnLayout.tsx`

**Change:** Line 48 — update the `leftPaneLabel` from `'Dictate'` to `'Dictation'` when in dictate mode:

```tsx
// Before
const leftPaneLabel = recordingMode === 'dictate' ? 'Dictate' : 'Transcript';

// After
const leftPaneLabel = recordingMode === 'dictate' ? 'Dictation' : 'Transcript';
```

Single line change, no styling modifications.

