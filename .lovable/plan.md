

## Fix Recording Indicator Showing While Paused

The "● Recording..." indicator in the transcript pane only checks `isRecording` and ignores `isPaused`. When paused, it should either hide or show "Paused" instead.

### Changes

**`src/components/newSession/TwoColumnLayout.tsx`**
- Add `isPaused` to the props interface
- Change the recording indicator condition from `isRecording` to `isRecording && !isPaused`
- Optionally show an amber "Paused" indicator when `isRecording && isPaused`

**`src/components/newSession/TranscriptTab.tsx`**
- Add `isPaused` prop
- Same logic: hide the red "Recording..." dot when paused, show amber "Paused" instead

**Parent component passing props** (likely `NewSession.tsx` or `MainTabsContainer.tsx`)
- Pass `isPaused` down to `TwoColumnLayout` / `TranscriptTab`

**`src/components/newSession/DictationTab.tsx`**
- Same fix: add `isPaused` prop, update the recording indicator

This ensures the red pulsing dot and "Recording..." text stop when the user pauses, matching the paused state already shown in the top bar.

