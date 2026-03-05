

## Add Paste Hint to File Attachment Area

The most natural place is inside the existing drag-and-drop zone (line 540). Update the text from:

> "Drag and drop files here or click to attach"

to:

> "Drag & drop, click to attach, or paste (Ctrl+V) screenshots"

This keeps it discoverable without adding extra UI elements. The hint sits right where users interact with attachments.

**File: `src/components/newSession/RightColumnPanel.tsx`** (line 540)
- Change the span text to include the paste shortcut hint

**File: `src/components/newSession/ContextTab.tsx`** (line 85, same pattern)
- Update the matching text there too for consistency

