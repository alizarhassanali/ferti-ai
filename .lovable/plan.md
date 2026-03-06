

## Add Signature Settings Tab

### What we're building
A new `SignatureSettings` component matching the screenshot: a rich text editor for signature content, plus two toggle switches ("Enable signature" and "Append to AI-generated letters"), with Save/Cancel buttons.

### Files to create

**`src/components/settings/SignatureSettings.tsx`**
- Header: "Signature" title + "Create a signature that can be automatically appended to your notes and documents" subtitle
- Card with:
  - "Signature content" label + helper text
  - Tiptap rich text editor (reuse existing `RichTextToolbar` + same Tiptap setup as Letters)
  - A `<Select>` for heading level ("Default" dropdown) integrated into toolbar — actually looking at the screenshot more closely, this is just the standard toolbar with a heading dropdown. We'll use the existing `RichTextToolbar` component with a simplified heading dropdown added.
  - Separator
  - "Enable signature" toggle with description
  - Separator  
  - "Append to AI-generated letters" toggle with description
- Save Changes / Cancel buttons at bottom
- Local state management following the explicit save/cancel pattern

### Files to modify

**`src/components/settings/RightPane.tsx`**
- Import `SignatureSettings` and add `case 'signature'` to the switch

### Implementation details
- Tiptap editor initialized with StarterKit + Underline + TextAlign extensions (already installed)
- Default signature content pre-populated with user's name from settings context (e.g. "Dr. Shahid Saya")
- Toggle states stored locally, saved on "Save Changes" click
- Toolbar uses a simplified version — we can add a heading-level `<Select>` ("Default", "Heading 1", etc.) before the existing toolbar buttons, matching the screenshot's dropdown

