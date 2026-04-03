

## Help Center — Accordion-Style Category Navigation

### Problem
Currently the middle pane shows all category tabs as buttons at the top, then only displays topics for the selected category below. This separates headings from their content unnaturally.

### Solution
Replace the tab-based layout with an accordion/collapsible layout where each category heading is a clickable section header with its topics listed directly underneath. Multiple sections can be collapsed/expanded, with the active category expanded by default.

### User Experience

```text
┌─────────────────────────────┐
│ Help Center                 │
│ Guides, FAQs, and support   │
├─────────────────────────────┤
│ ▼ Getting Started           │
│   ┌─ Create First Session ┐│
│   ├─ Using Templates      ┤│
│   ├─ Dictation & Recording┤│
│   ├─ Managing Letters     ┤│
│   └─ AI Assistant Basics  ┘│
│                             │
│ ▼ FAQs                     │
│   ┌─ Account & Billing    ┐│
│   ├─ Templates & Notes    ┤│
│   ├─ Recording & Transcr. ┤│
│   └─ Privacy & Security   ┘│
│                             │
│ ▶ Contact Support           │
│                             │
│ ▶ Give Feedback             │
└─────────────────────────────┘
```

### Changes

**`src/components/resourceCenter/CategoryNav.tsx`** — Replace the current two-section layout (category tabs + filtered topic list) with an accordion. Each category becomes a collapsible section header. Clicking the header expands/collapses it. Topics are listed under their parent category. Use the existing `Collapsible` component from `@/components/ui/collapsible`. The currently selected category starts expanded.

- For categories with a single topic that renders a custom view (Contact Support → "Send us a message", Give Feedback → "Give Feedback"), clicking the category header directly selects that topic and navigates to it (no expand/collapse needed since there's only one item).

No other files need to change — `TopicCard`, `ArticleDetail`, and `ResourceCenter` page all remain the same.

