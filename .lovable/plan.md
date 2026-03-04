

## Add Progress Bar & Status Label to File Processing Tiles

**File:** `src/components/newSession/FileProcessingItem.tsx`

Add a thin progress bar at the bottom of each file tile and a small status label, without changing existing styling.

### Changes

1. **Add a progress bar** — a thin absolute-positioned bar at the bottom of the tile that fills based on `file.progress` (0-100). Only visible when `status` is `uploading` or `processing`.

2. **Add a status label** — a tiny text label between the filename and the X button showing:
   - `"Uploading…"` when status is `uploading` (progress 0-30%)
   - `"Reading…"` when status is `processing` (progress 30-100%)
   - Nothing when `complete`

3. **Green checkmark on complete** — swap the `FileText` icon to a green `Check` icon when status is `complete` (already have the `SpinnerSuccess` component but we'll keep it simpler with just a Check icon to preserve existing styling).

### Implementation detail

```tsx
// Inside the tile div, add at the bottom (before closing </div>):
{isProcessing && (
  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/10 rounded-b-md overflow-hidden">
    <div 
      className="h-full bg-primary transition-all duration-300"
      style={{ width: `${file.progress}%` }}
    />
  </div>
)}
```

Status label between filename and X button:
```tsx
{isProcessing && (
  <span className="text-[10px] text-muted-foreground flex-shrink-0">
    {file.status === 'uploading' ? 'Uploading…' : 'Reading…'}
  </span>
)}
```

No other files or styling changes needed — the `useDocumentOCR` hook already simulates uploading (0-30%) then processing/OCR (30-100%) phases with the correct status transitions.

