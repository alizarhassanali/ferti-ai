

## Buttons That Need Tooltips -- Full Application Audit

After reviewing every component across the application, here is a comprehensive list of icon-only and ambiguous buttons that currently lack tooltips, organized by area.

---

### Already Have Tooltips (no action needed)
- Sidebar collapse toggle button
- Sidebar nav items (collapsed state)
- Sidebar footer items (collapsed state: "What's New", "Help")
- Sidebar user avatar (collapsed state)
- Session List toolbar: Search, Filter, Sort, Refresh
- Letters List toolbar: Search, Filter, Sort, Refresh
- Session Card expand/collapse (past sessions)
- Switch App popover (collapsed state)

---

### Buttons That NEED Tooltips

**1. AppLayout -- Floating Help Button** (`src/components/layout/AppLayout.tsx`)
- MessageCircle FAB (bottom-right) -- "Help"

**2. Context Tab Toolbar** (`src/components/newSession/ContextTab.tsx`)
- Bold button -- "Bold"
- Italic button -- "Italic"
- List button -- "List"

**3. Transcript Panel** (`src/components/newSession/TranscriptPanel.tsx`)
- Edit (pencil) button -- "Edit transcript"
- Trash button -- "Delete transcript"
- Copy button -- "Copy transcript"

**4. Note Tab Toolbar** (`src/components/newSession/NoteTab.tsx`)
- More options (three dots) button -- "More options"
- Copy button -- "Copy"
- Undo button -- "Undo"
- Redo button -- "Redo"
- Add new tab (plus) button -- "Add note tab"
- Close tab (X) buttons -- "Close tab"

**5. Generated Note Fullscreen Actions** (`src/components/newSession/GeneratedNoteFullscreen.tsx`)
- Copy button -- "Copy text" (has `title` attr but no proper tooltip)
- Mail button -- "Send as email"
- FileDown button -- "Save as file"
- Pencil button -- "Edit"
- FileText button -- "Save as PDF"

**6. Session Detail** (`src/components/sessions/SessionDetail.tsx`)
- Trash button (delete session) -- "Delete session"
- ThumbsUp buttons (x3 across tabs) -- "Good transcription"
- ThumbsDown buttons (x3 across tabs) -- "Poor transcription"
- Mic button (dictation tab) -- "Record"
- Plus tab button -- "Add note"
- Mic button (AI assistant input) -- "Voice input"
- Send button (AI assistant input) -- "Send"

**7. AI Assistant Chat** (`src/components/aiAssistant/ChatView.tsx`)
- Mic button -- "Voice input"
- Send button -- "Send message"

**8. AI Assistant Conversation List** (`src/components/aiAssistant/ConversationList.tsx`)
- More options button on each conversation -- "More options"

**9. Ask AI Input** (`src/components/newSession/AskAIInput.tsx`)
- Paperclip button -- "Attach file"
- Send button -- "Send"

**10. Help Panel** (`src/components/help/HelpPanel.tsx`)
- Close (X) button -- "Close"
- Back arrow button -- "Back"
- Paperclip button -- "Attach file"
- Send button -- "Send message"

**11. Recording Controls Bar** (`src/components/newSession/RecordingControlsBar.tsx`)
- Mic icon button -- "Microphone"

**12. Session Details Header** (`src/components/newSession/SessionDetailsHeader.tsx`)
- Plus button (next to template selector) -- "Add template"

**13. Rich Text Toolbar (Letters)** (`src/components/letters/RichTextToolbar.tsx`)
- H1 toggle -- "Heading 1"
- H2 toggle -- "Heading 2"
- H3 toggle -- "Heading 3"
- Bold toggle -- "Bold"
- Italic toggle -- "Italic"
- Underline toggle -- "Underline"
- Strikethrough toggle -- "Strikethrough"
- Bullet list toggle -- "Bullet list"
- Ordered list toggle -- "Numbered list"
- Align left toggle -- "Align left"
- Align center toggle -- "Align center"
- Align right toggle -- "Align right"
- Align justify toggle -- "Justify"
- Undo toggle -- "Undo"
- Redo toggle -- "Redo"

**14. Template Row Actions** (`src/components/templates/TemplateRow.tsx`)
- Edit button -- "Edit template"
- More options button -- "More options"

**15. File Processing Item** (`src/components/newSession/FileProcessingItem.tsx`)
- Remove (X) button -- "Remove file"
- Retry button -- "Retry"

**16. AppFooter** (`src/components/layout/AppFooter.tsx`)
- Language toggle button -- "Switch language"

---

### Summary

**Total: ~55 buttons** across the application need tooltips added. The highest-impact areas are:
1. **Rich Text Toolbar** (15 toggles) -- most icon-dense area
2. **Note Tab toolbar** (6 buttons)
3. **Session Detail** (10+ buttons)
4. **Transcript Panel** (3 buttons)
5. **Generated Note actions** (5 buttons)

### Implementation Approach
- Wrap each icon-only button with `<TooltipProvider>`, `<Tooltip>`, `<TooltipTrigger asChild>`, and `<TooltipContent>` using the existing shadcn tooltip components
- Use consistent styling: `side="bottom"` for toolbar buttons, `side="top"` for bottom-positioned buttons
- Use the compact `className="text-xs"` on TooltipContent for toolbar-dense areas
- Group buttons under a single `<TooltipProvider delayDuration={300}>` per toolbar to avoid wrapping each individually

