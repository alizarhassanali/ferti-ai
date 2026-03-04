

## Redesign Date Group Headers in Middle Panes

Layout:

```text
┌──────────────────────────────┐
│ 📅 Monday        2nd Mar '26│
│ ←left               right→  │
└──────────────────────────────┘
```

- **Left**: Calendar icon + day name
- **Right**: Ordinal date (e.g. "2nd Mar '26")

### Files to change

**1. `src/components/sessions/SessionList.tsx`**
- Add `import { format } from 'date-fns'` and `import { Calendar } from 'lucide-react'`
- Add ordinal suffix helper + `formatGroupDate` function
- Update `groupSessionsByDate` to use ISO date string as key (so we can parse it back)
- Replace date header markup at lines 246-248 and 293-295

**2. `src/components/letters/LettersList.tsx`**
- Same helpers and header layout changes in both tab contents

### Header markup (both files)
```tsx
<div className="flex items-center justify-between text-xs text-foreground/50 px-2 font-medium">
  <div className="flex items-center gap-1">
    <Calendar className="h-3 w-3" />
    <span>{format(dateObj, 'EEEE')}</span>
  </div>
  <span>{formatGroupDate(dateObj)}</span>
</div>
```

### Ordinal date helper
```ts
const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th';
  }
};
const formatGroupDate = (date: Date) => {
  const day = date.getDate();
  return `${day}${getOrdinalSuffix(day)} ${format(date, "MMM ''yy")}`;
};
```

