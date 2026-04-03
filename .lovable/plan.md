

## Doctor's Note — Sticky Banner with Acknowledge

### What changes

**1. Replace inline callout with a sticky dismissible banner**

In `LetterDetail.tsx`, replace the current `MessageSquare` callout block with a sticky banner pinned between the header and the toolbar. The banner:
- Has a light amber/warning background with a left accent border
- Shows "Doctor's Note" label + the note text
- Includes an **"Acknowledge"** button on the right side
- Once acknowledged, the banner collapses to a subtle single-line "Note acknowledged ✓" indicator (stays visible but minimal)
- Only appears when `letter.doctorNote` exists and the letter is in `to_be_sent` status

**2. Add `doctorNoteAcknowledged` field**

In `src/types/letter.ts`, add:
- `doctorNoteAcknowledgedAt?: Date` — timestamp of when the note was acknowledged
- `doctorNoteAcknowledgedBy?: string` — name of the nurse/coordinator who acknowledged

In `src/contexts/LettersContext.tsx`, add:
- `acknowledgeDoctorNote(id: string)` function that sets the acknowledged timestamp

**3. Letter card badge indicator**

In `LetterCard.tsx`, add a small `MessageSquare` icon next to the patient name when the letter has a `doctorNote`. This lets nurses quickly see which letters have notes before clicking in — no tooltip, just a visual cue.

### Banner layout (detail pane)

```text
┌─────────────────────────────────────────────────────┐
│  Header: Patient Name  [Badge]        [Actions...]  │
├─────────────────────────────────────────────────────┤
│ ⚠ Doctor's Note                      [Acknowledge] │
│ "Please verify the GP address before sending..."    │
├─────────────────────────────────────────────────────┤
│  [Rich Text Toolbar]                                │
├─────────────────────────────────────────────────────┤
│  Letter content...                                  │
└─────────────────────────────────────────────────────┘
```

After acknowledging:
```text
├─────────────────────────────────────────────────────┤
│ ✓ Note acknowledged                                 │
├─────────────────────────────────────────────────────┤
```

### Files to change

| File | Change |
|------|--------|
| `src/types/letter.ts` | Add `doctorNoteAcknowledgedAt`, `doctorNoteAcknowledgedBy` fields |
| `src/contexts/LettersContext.tsx` | Add `acknowledgeDoctorNote` function |
| `src/components/letters/LetterDetail.tsx` | Replace callout with sticky banner + acknowledge button |
| `src/components/letters/LetterCard.tsx` | Add `MessageSquare` icon when `doctorNote` exists |

