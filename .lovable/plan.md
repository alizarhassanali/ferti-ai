

## Fix: Start Fresh Not Clearing Transcript

### Root Cause
When the consent popup flow is active, both "Keep & Continue" and "Start Fresh" paths go through the consent dialog. The `onConfirm` callback is `startRecording` (with no arguments), so `clearTranscript` always defaults to `false` — content is never cleared.

Even without consent enabled, there may be a stale closure issue since `startRecording` is passed directly.

### Fix in `src/pages/NewSession.tsx`

1. **Add a `pendingClearTranscript` ref** (useRef) to remember whether the user chose "Start Fresh" before the consent dialog opens.

2. **Update `handleRestartKeep`**: Set `pendingClearTranscript.current = false` before showing consent or calling `startRecording(false)`.

3. **Update `handleRestartFresh`**: Set `pendingClearTranscript.current = true` before showing consent or calling `startRecording(true)`.

4. **Update the `ConsentPopupDialog` onConfirm**: Instead of passing `startRecording` directly, pass a wrapper that calls `startRecording(pendingClearTranscript.current)`.

```tsx
// Add ref
const pendingClearTranscript = useRef(false);

// handleRestartKeep
pendingClearTranscript.current = false;
// ... rest unchanged

// handleRestartFresh  
pendingClearTranscript.current = true;
// ... rest unchanged

// ConsentPopupDialog onConfirm prop
onConfirm={() => startRecording(pendingClearTranscript.current)}
```

This ensures the user's choice ("Keep" vs "Fresh") is preserved through the consent dialog flow.

