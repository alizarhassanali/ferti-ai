

## Restore "or paste (Ctrl+V) screenshots" hint text

I accidentally removed the paste hint when updating the file type labels. The fix is simple:

### Change

**`src/components/newSession/RightColumnPanel.tsx`** — Line 567:
- Change: `"Drag & drop or click to attach files"`
- To: `"Drag & drop, click to attach, or paste (Ctrl+V) screenshots"`

**`src/components/newSession/ContextTab.tsx`** — Same update to the drop zone text there for consistency.

No other changes needed — just restoring the removed text.

