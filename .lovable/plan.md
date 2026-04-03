

## Add Template Type Explanations via Tooltips & Info Icon

### Tooltip Descriptions

| Type | Tooltip Text |
|------|-------------|
| **Note** | "Clinical notes generated from your sessions (e.g., SOAP, progress notes)" |
| **Letter** | "Generates letters that go to the Letters section for review and sending" |
| **Document** | "General medical documents and forms" |

### Changes

**1. `src/components/templates/TemplateRow.tsx`** — Wrap the type Badge in a Tooltip
- Wrap the existing `<Badge>` (lines 53–63) with `Tooltip` / `TooltipTrigger` / `TooltipContent`
- Show the type-specific description on hover

**2. `src/components/templates/hub/TemplateCard.tsx`** — Same tooltip on the type badge span
- Wrap the type `<span>` (lines 24–30) with a Tooltip showing the description

**3. `src/components/templates/CreateTemplateModal/BlankTemplateEditor.tsx`** — Add info icon next to the Type selector
- Add a small `Info` (lucide) icon next to the "Type" label (line 70)
- Wrap it in a Tooltip (or HoverCard for a richer popup) that lists all three types with their descriptions so the user can see the full picture when choosing

**4. `src/components/templates/CreateTemplateModal/TypeSelection.tsx`** — Already has descriptions per card, no change needed

### Helper
Create a shared constant map in a small utility (or inline) so all locations use the same descriptions:

```ts
const templateTypeDescriptions: Record<string, string> = {
  Note: "Clinical notes generated from your sessions (e.g., SOAP, progress notes)",
  Letter: "Generates letters sent to the Letters section for review and sending",
  Document: "General medical documents and forms",
};
```

