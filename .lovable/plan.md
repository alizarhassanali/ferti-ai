

## Remove Recording/Paused Indicators from Transcript Pane

Remove lines 69-83 in `src/components/newSession/TwoColumnLayout.tsx` — the two conditional blocks showing "Recording..." and "Paused" indicators in the left pane header. The top bar already shows recording state, so this is redundant.

