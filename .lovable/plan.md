

## Restrict File Uploads & Show Toast for Unsupported Files

### Summary
Restrict the Context Tab file upload to PDF, DOCX, DOC, PNG, and JPEG only. Show allowed types in the drop zone hint. Show an immediate toast when an unsupported file is selected or dragged in.

### Changes

**`src/components/newSession/ContextTab.tsx`**

1. Add `accept` attribute to the file input: `.pdf,.docx,.doc,.png,.jpg,.jpeg`
2. Define an `ALLOWED_EXTENSIONS` constant: `['.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg']`
3. Add a `filterFiles` helper that splits files into valid/invalid based on extension
4. In `handleDrop` and `handleFileInput`: filter files, pass only valid ones to `addFiles`, and if any are invalid show a toast: *"Unsupported file type. Only PDF, DOCX, DOC, PNG, and JPEG are allowed."*
5. Update drop zone text to two lines:
   - "Drag & drop or click to attach files"
   - "Supported formats: PDF, DOCX, DOC, PNG, JPEG"
6. Import `toast` from `sonner` for the notification

### File
| File | Change |
|------|--------|
| `src/components/newSession/ContextTab.tsx` | Add accept attr, validation logic, toast, update hint text |

