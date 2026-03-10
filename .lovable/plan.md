

## Add Training & Demo Booking as Step 3 (Skippable)

### Overview

Move the demo booking out of Step 2 and create a new Step 3 focused on training resources. Step 3 is **skippable** but re-appears as a subtle toast/banner if the user hasn't opted out. The demo booking checkbox now opens an inline calendar with mock 15-min time slots.

### Changes

#### 1. New file: `src/components/onboarding/OnboardingStepThree.tsx`

A new step with three sections:

**Training Videos** — 3 placeholder cards with play icons and titles:
- "How to use Otto Notes: A Basic Guide"
- "How to generate a note, document, or letter"
- "How to create your own template"

Each card shows a thumbnail placeholder, title, and duration estimate. Clicking does nothing for now (placeholder).

**Book a 1-on-1 Demo** — Checkbox that reveals an inline calendar/time-slot picker:
- Shows next 5 business days as column headers
- Each day has 15-min slots from 9:00 AM to 5:00 PM
- User clicks a slot to select it (highlighted state)
- No backend integration — just visual selection for now

**Opt-out checkbox** at the bottom: "I don't need training to use Otto Notes"
- Checking this saves a flag to localStorage (`otto-training-dismissed: true`)
- Only when this is checked does the "Continue" button finalize and close the modal permanently

**Skip button** — visible at the top or bottom, allows skipping without opting out. Saves a timestamp to localStorage (`otto-training-skipped-at`) so the banner can re-nudge later.

Layout:
```text
┌──────────────────────────────────────┐
│ ← Back                              │
│                                      │
│     Training & Resources             │
│  Get started with Otto Notes         │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐         │
│  │ ▶    │ │ ▶    │ │ ▶    │         │
│  │Video1│ │Video2│ │Video3│         │
│  └──────┘ └──────┘ └──────┘         │
│                                      │
│  ☐ Book a 1-on-1 demo               │
│  ┌─────────────────────────────┐     │
│  │ Mon  Tue  Wed  Thu  Fri     │     │
│  │ 9:00 9:00 9:00 ...          │     │
│  │ 9:15 9:15 ...               │     │
│  │ ...                         │     │
│  └─────────────────────────────┘     │
│                                      │
│  ☐ I don't need training             │
│                                      │
│  [Skip]              [Continue]      │
└──────────────────────────────────────┘
```

#### 2. Modify: `src/components/onboarding/OnboardingStepTwo.tsx`

- Remove the demo booking checkbox + reason input (lines 125-154)
- Remove related state (`bookDemo`, `demoReason`) and localStorage logic
- `canContinue` simplifies to just `true`
- The "Continue" button now calls `onFinish` which will advance to Step 3 instead of closing

#### 3. Modify: `src/components/onboarding/NewUserOnboardingModal.tsx`

- Change step type from `1 | 2` to `1 | 2 | 3`
- Import `OnboardingStepThree`
- Step 2's `onFinish` now sets `step = 3`
- Step 3 gets:
  - `onBack` → goes to step 2
  - `onSkip` → saves skip timestamp, closes modal, navigates to `/new-session`
  - `onFinish` → saves training-dismissed flag, closes modal, navigates to `/new-session`
- Modal stays non-dismissible (no X, no escape, no overlay click) across all 3 steps

#### 4. New file: `src/components/onboarding/TrainingBanner.tsx`

A subtle toast-style banner component that:
- Checks localStorage for `otto-training-dismissed` (if true, never shows)
- Checks `otto-training-skipped-at` timestamp — if skipped less than 5 minutes ago, don't show
- After 5 minutes, renders a small banner at the top of the app: "You have training resources available" with a "View" button
- Clicking "View" opens a dialog with the same Step 3 content
- Dismissing the banner resets the skip timestamp (so it comes back again later)

#### 5. Modify: `src/pages/NewSession.tsx` (or `AppLayout`)

- Import and render `TrainingBanner` so it appears on the main app pages after onboarding

### My suggestions

- The modal width should expand to `max-w-2xl` for Step 3 since the calendar slots need horizontal space. Steps 1-2 keep `max-w-md`.
- The time-slot grid should be scrollable vertically (many slots) with a max height.
- Video cards should be horizontally laid out in a row of 3 with consistent sizing.

