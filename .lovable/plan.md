

## In-App Feedback via Help Center

### Summary
Add a new "Give Feedback" category to the Help Center. When selected, the right pane shows a feedback form supporting three types: general feedback, bug report, and quick rating. Submissions are stored in the database and trigger an email notification.

### User Experience

1. User navigates to Help Center and clicks the new **"Give Feedback"** category tab (alongside Getting Started, FAQs, Contact Support)
2. The middle pane shows three feedback type cards: **General Feedback**, **Bug Report**, **Quick Rating**
3. Clicking a card opens the corresponding form in the right pane:

   - **Quick Rating**: 5 emoji/star selector + optional comment textarea + submit
   - **General Feedback**: subject input + message textarea + submit
   - **Bug Report**: subject input + description textarea + severity dropdown (Low/Medium/High/Critical) + optional screenshot upload button + submit

4. On submit: toast confirmation, form resets, data saved to database

### Database

Create a `feedback` table:
- `id` (uuid, PK)
- `user_id` (uuid, references auth.users, nullable for anonymous)
- `type` (text: 'general', 'bug_report', 'rating')
- `subject` (text, nullable)
- `message` (text, nullable)
- `rating` (integer, nullable, 1-5)
- `severity` (text, nullable: 'low', 'medium', 'high', 'critical')
- `screenshot_url` (text, nullable)
- `created_at` (timestamptz, default now())

RLS: authenticated users can insert their own rows, admins can select all.

### Email Notification

Create a backend function `notify-feedback` that sends an email to a configured team inbox when feedback is submitted. Uses Lovable's email infrastructure.

### Files to create/change

| File | Action |
|------|--------|
| `src/data/resourceCenter.ts` | Add "Give Feedback" category |
| `src/components/resourceCenter/FeedbackForm.tsx` | New — feedback form component with type tabs (rating, general, bug report) |
| `src/components/resourceCenter/ArticleDetail.tsx` | Render FeedbackForm when feedback category is selected |
| Migration | Create `feedback` table with RLS |
| Storage bucket | Create `feedback-screenshots` bucket for bug report attachments |
| Edge function `notify-feedback` | Send email notification on new feedback |

### Technical Details

- Feedback type cards in the middle pane reuse the existing `TopicCard` pattern
- The right-pane form component switches between three sub-forms based on selected type
- Screenshot upload uses Supabase Storage; file path: `feedback-screenshots/{user_id}/{timestamp}.png`
- Email notification is a simple edge function invoked after successful insert

