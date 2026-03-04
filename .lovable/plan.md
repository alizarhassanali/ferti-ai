

## Color-Code Template Type Badges

### Changes

**1. `src/components/templates/TemplateRow.tsx`** (My Templates)

Replace the single beige Badge styling (line 51-56) with type-based colors:

- **Note**: yellow background/text (`bg-amber-100 text-amber-700 border-amber-200`)
- **Letter**: blue background/text (`bg-blue-100 text-blue-700 border-blue-200`)
- **Document**: purple background/text (`bg-purple-100 text-purple-700 border-purple-200`)

Also update the template name color (line 50) from the current dark brown `text-[hsl(25_30%_25%)]` to a standard `text-foreground` to match the screenshot's darker, cleaner text.

**2. `src/components/templates/hub/TemplateCard.tsx`** (Template Hub)

Replace the single salmon-colored badge (line 23) with the same type-based color mapping:

- Note → yellow, Letter → blue, Document → purple

### Implementation

Create a shared helper function (or inline map) for badge colors:

```tsx
const typeBadgeStyles: Record<string, string> = {
  Note: 'bg-amber-100 text-amber-700 border-amber-200',
  Letter: 'bg-blue-100 text-blue-700 border-blue-200',
  Document: 'bg-purple-100 text-purple-700 border-purple-200',
};
```

Apply in both files to the Badge/span rendering the template type.

