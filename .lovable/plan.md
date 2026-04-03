

## Time-Based Feedback Slide-In Banner

### Summary
After 7 days of first use (tracked via localStorage), a slim banner slides up from the bottom of the app prompting users to share feedback. Clicking it navigates to `/resource-center` with the Give Feedback category pre-selected. The banner is dismissible, and reappears after 30 days if dismissed without giving feedback.

### User Experience

1. User has been using the app for 7+ days
2. A slim banner slides in from the bottom edge (above the footer), with smooth slide-up animation
3. Banner says: **"How's Otto Notes working for you? We'd love your feedback"** with a **"Give Feedback"** button and an **X** dismiss button
4. Clicking "Give Feedback" → navigates to `/resource-center?category=feedback` and dismisses the banner
5. Clicking **X** → dismisses for 30 days, then reappears
6. After submitting feedback via the Help Center form, the banner won't show again (permanent dismiss)

### Technical Approach

**New component: `src/components/onboarding/FeedbackNudgeBanner.tsx`**
- Checks localStorage for `otto-first-use-at` (set on first app load if not present) and `otto-feedback-dismissed-at`
- Shows banner if 7+ days since first use AND (never dismissed OR 30+ days since last dismiss) AND `otto-feedback-submitted` is not set
- Slide-up animation using existing `slide-in` keyframe pattern (add `slide-in-bottom` / `slide-out-bottom` to tailwind config)
- Uses `useNavigate` to go to `/resource-center?category=feedback`

**`src/components/layout/AppLayout.tsx`**
- Render `FeedbackNudgeBanner` alongside `TrainingBanner`

**`src/pages/ResourceCenter.tsx`**
- Read `?category=feedback` query param and auto-select the Give Feedback category on mount

**`src/components/resourceCenter/FeedbackForm.tsx`**
- On successful submit, set `otto-feedback-submitted` in localStorage so the nudge banner never shows again

**`tailwind.config.ts`**
- Add `slide-in-bottom` keyframe (translateY(100%) → translateY(0))

### localStorage keys

| Key | Purpose |
|-----|---------|
| `otto-first-use-at` | Timestamp of first app load |
| `otto-feedback-dismissed-at` | Timestamp of last banner dismiss |
| `otto-feedback-submitted` | Set to `"true"` after any feedback submission |

### Files to create/change

| File | Change |
|------|--------|
| `src/components/onboarding/FeedbackNudgeBanner.tsx` | New — slide-in banner component |
| `src/components/layout/AppLayout.tsx` | Render the banner |
| `src/pages/ResourceCenter.tsx` | Handle `?category=feedback` query param |
| `src/components/resourceCenter/FeedbackForm.tsx` | Set `otto-feedback-submitted` on submit |
| `tailwind.config.ts` | Add slide-in-bottom animation |

