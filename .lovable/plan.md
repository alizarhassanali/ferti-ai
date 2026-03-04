

## Plan: Transcript Restart Confirmation + Pause/Resume Verification

### What Changes

**1. Add "Keep or Restart" confirmation dialog when re-recording**

In `src/pages/NewSession.tsx`, modify `handleToggleRecording`:
- When the user clicks Transcribe/Dictate and there is already existing transcript/dictation content, show an AlertDialog with two options:
  - **"Keep & Continue"** — starts recording without clearing the existing transcript (appends new content)
  - **"Start Fresh"** — clears the transcript and starts from scratch
- If there is no existing content, start recording immediately (with consent check if enabled)

Create a new state `showRestartDialog` and wire it into the flow. Use the existing `AlertDialog` component.

**2. Ensure Pause/Resume button is visible and functional**

The Pause/Resume button already exists in `RecordingModeButton.tsx` and renders to the left of the Stop button when `isRecording` is true. The pause logic in `NewSession.tsx` (`handleTogglePause`) already freezes the timer and shows toast notifications.

I will verify the button order is Pause → Stop (left to right) and that the functionality works correctly. No changes needed here unless the current implementation has issues.

### Files to modify

- **`src/pages/NewSession.tsx`** — Add `showRestartDialog` state, modify `handleToggleRecording` to check for existing content, add AlertDialog with Keep/Start Fresh options
- **`src/components/newSession/RecordingModeButton.tsx`** — Confirm Pause button renders left of Stop (already does, no change expected)

