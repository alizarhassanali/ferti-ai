

## Defer Session Creation Until User Interaction

### Problem
Every click on "New Session" immediately creates an "Untitled session" in Drafts (line 76–101 in `NewSession.tsx`). The session should only be persisted once the user actually types something — patient details, context, dictation, transcript, or any meaningful input.

### Approach
Instead of calling `addSession` on mount, work in a "pending" state with a local session ID but don't persist to context until the user provides input.

### Changes: `src/pages/NewSession.tsx`

1. **Remove the auto-create effect** (lines 76–101) that calls `addSession` immediately when `currentSessionId` is null.

2. **Generate a local ID on mount without persisting**:
   - Still generate `newId = session-${Date.now()}` and set `currentSessionId`, but do NOT call `addSession` yet.
   - Add a ref `sessionPersistedRef = useRef(false)` to track whether the session has been saved to context.

3. **Create a `persistSession` function** that calls `addSession` once (guarded by the ref) with current state values. This creates the session in Drafts the first time it's called.

4. **Trigger `persistSession` when user provides any input**:
   - When `patientDetails` changes (patient selected or typed)
   - When `contextContent` changes
   - When `transcriptContent` changes
   - When `dictationContent` changes
   - When recording starts
   - When note tab content changes
   
   The simplest approach: in the existing `saveSessionChanges` callback, check if the session is not yet persisted — if so, call `addSession` first, then `updateSession`. This way the existing debounced auto-save (line 149–152) naturally handles persistence on any input.

5. **Guard `updateSession` calls**: In `saveSessionChanges`, only call `updateSession` if the session has been persisted (i.e., `sessionPersistedRef.current === true`). Otherwise, check if there's any content and call `addSession` + set the ref.

### Logic summary

```text
Mount:
  → generate localId, set currentSessionId
  → do NOT call addSession

Any input changes (patient, context, transcript, dictation, notes):
  → triggers saveSessionChanges via debounce
  → if not persisted yet AND has any content:
      → addSession(fullSessionObject)
      → sessionPersistedRef.current = true
  → if already persisted:
      → updateSession(id, updates) as before
```

### Files to change
| File | Change |
|------|--------|
| `src/pages/NewSession.tsx` | Remove auto-create, add lazy persist logic in save flow |

