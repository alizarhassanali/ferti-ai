

## Convert "What's New" from Sidebar Sheet to Full Page

### Overview
Transform the release notes from a right-side Sheet panel into a dedicated page at `/whats-new`, following the same three-pane layout as Letters, AI Assistant, and View Sessions.

### Layout (matching existing pages)
```text
┌──────────┬─────────────────────┬──────────────────────────┐
│LeftPane  │ Middle Pane (w-80)  │ Right Pane (flex-1)      │
│(sidebar) │ Release notes list  │ Selected note detail     │
│          │ - date, tag, title  │ - title, date, tag       │
│          │ - summary preview   │ - full description       │
│          │                     │ - image if available     │
│          │                     │ - empty state if none    │
└──────────┴─────────────────────┴──────────────────────────┘
```

### Changes

1. **New page `src/pages/WhatsNew.tsx`**
   - Wraps content in `AppLayout` with `hideGlobalSessionsPanel`
   - Manages `selectedNoteId` state
   - Middle pane: scrollable list of release notes (reuses `useReleaseNotes` hook), each clickable, highlighted when selected
   - Right pane: detail view of selected note (title, date, tag badge, full description), or an empty state prompt
   - On mount, calls `markReleasesSeen()` to clear the badge

2. **New components**
   - `src/components/releaseNotes/ReleaseNotesList.tsx` — middle pane list with header "What's New" + subtitle, scrollable note items with date/tag/title/summary
   - `src/components/releaseNotes/ReleaseNoteDetail.tsx` — right pane detail showing full note content, or empty state ("Select a release note to view details")

3. **Update `src/App.tsx`**
   - Add route: `<Route path="/whats-new" element={<WhatsNew />} />`

4. **Update `src/components/settings/LeftPane.tsx`**
   - Change "What's New" footer item from opening the Sheet to navigating to `/whats-new`
   - Remove `ReleaseNotesPanel` import and rendering
   - Remove `releaseNotesPanelOpen` state

5. **Delete `src/components/releaseNotes/ReleaseNotesPanel.tsx`** (no longer needed)

6. **Update `src/contexts/SessionsPanelContext.tsx`** (if needed)
   - Add `/whats-new` to routes where sessions panel toggle is allowed, matching Letters/AI Assistant behavior

