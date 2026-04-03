

## Resource Center — Full Page, Three-Pane Layout

### Overview
Replace the floating help panel with a dedicated `/resource-center` page following the app's standard three-pane pattern: left sidebar (already exists), middle pane (320px fixed, category navigation + topic cards), right pane (article detail with video + text).

### Middle Pane — Categories & Topic Cards

**Categories** (top section, similar to Settings nav):
- **Getting Started** — Onboarding guides for new users
- **FAQs** — Common questions by topic
- **Contact Support** — Chat/email support form

**Below the category nav**: Topic cards for the selected category, displayed as compact visual cards (icon + title + short description). Examples:

| Category | Topic Cards |
|----------|-------------|
| Getting Started | "Create Your First Session", "Using Templates", "Dictation & Recording", "Managing Letters", "AI Assistant Basics" |
| FAQs | "Account & Billing", "Templates & Notes", "Recording & Transcription", "Privacy & Security" |
| Contact Support | "Send us a message" card (opens chat form inline) |

### Right Pane — Article Detail (Video + Text)

When a topic card is selected:
1. **Video player** at top (placeholder with thumbnail + play button; videos would be YouTube/Vimeo embeds or hosted MP4s)
2. **Rich text content** below — step-by-step instructions with headings, screenshots, and callouts
3. Empty state when nothing is selected: illustration + "Select a topic to get started"

### Sidebar Integration

- Add a **Book/GraduationCap** icon in the left sidebar nav (between What's New and Settings, or in the footer area)
- Remove the floating help button from `AppLayout.tsx`
- Route: `/resource-center`

### Contact Support (Chat Tab)

Reuse the existing chat UI from `HelpPanel.tsx` but render it inline in the right pane when "Contact Support" → "Send us a message" is selected, rather than in a floating sheet.

### Data Structure

Static data file `src/data/resourceCenter.ts` containing categories, topics, and article content (title, description, videoUrl, body markdown/HTML). Easy to extend later with database-backed content.

### Files to Create/Change

| File | Action |
|------|--------|
| `src/data/resourceCenter.ts` | Create — static content for categories, topics, articles |
| `src/pages/ResourceCenter.tsx` | Create — three-pane page layout |
| `src/components/resourceCenter/CategoryNav.tsx` | Create — middle pane category list + topic cards |
| `src/components/resourceCenter/ArticleDetail.tsx` | Create — right pane video + text viewer |
| `src/components/resourceCenter/ContactSupport.tsx` | Create — inline chat form (extracted from HelpPanel) |
| `src/components/resourceCenter/TopicCard.tsx` | Create — card component for topic items |
| `src/App.tsx` | Add `/resource-center` route |
| `src/components/settings/LeftPane.tsx` | Add Resource Center nav item, remove floating help button state |
| `src/components/layout/AppLayout.tsx` | Remove floating help button + HelpPanel |

