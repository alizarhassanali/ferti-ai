
Fix the actual upload area used on the New Session page.

What I found:
- The change was made in `src/components/newSession/ContextTab.tsx`.
- But `/new-session` is currently rendering the context upload UI from `src/components/newSession/RightColumnPanel.tsx` via `TwoColumnLayout`.
- `RightColumnPanel.tsx` still has:
  - an unrestricted `<input type="file">`
  - no file-type filtering
  - no invalid-file toast
  - old helper text: “Drag & drop, click to attach, or paste (Ctrl+V) screenshots”

That is why Excel files are still getting through and why the allowed file types text is not showing.

Plan:
1. Update `src/components/newSession/RightColumnPanel.tsx`
   - Add allowed extensions for: PDF, DOCX, DOC, PNG, JPG/JPEG
   - Add a helper to split valid vs invalid files
   - Add `accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"` to the file input
   - Validate both click-selected files and drag-and-drop files before calling `addFiles`
   - Show an immediate error toast when any unsupported file is selected or dropped
   - Update the visible copy to explicitly say:
     - “Drag & drop or click to attach files”
     - “Supported formats: PDF, DOCX, DOC, PNG, JPEG”

2. Keep the behavior consistent with the existing attachment limits
   - Continue using `useDocumentOCR()` for valid files
   - Leave the 15-file limit and processing UI unchanged

3. Clean up duplication
   - Since `ContextTab.tsx` is not the active upload UI for this route, either:
     - mirror the same validation there too for consistency, or
     - leave it as-is if it is still used elsewhere
   - Main fix must be in `RightColumnPanel.tsx`

Technical details:
- Root render path:
```text
NewSession.tsx
  -> TwoColumnLayout.tsx
    -> RightColumnPanel.tsx
```

Files to change:
- `src/components/newSession/RightColumnPanel.tsx`
- Optional consistency check: `src/components/newSession/ContextTab.tsx`

Expected result:
- Excel and other unsupported files are blocked immediately
- User sees a toast as soon as they try to upload one
- The UI visibly lists the only allowed types: PDF, DOCX, DOC, PNG, JPEG
