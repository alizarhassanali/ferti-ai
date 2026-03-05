
## Change Date Format to MM/DD/YY in Middle Panes

### Current state
Both `SessionList.tsx` (lines 76-79) and `LettersList.tsx` (lines 37-40) have a `formatGroupDate` function that returns ordinal dates:
- Current: `"2nd Mar '26"` (includes day ordinal and abbreviated month)
- Desired: `"12/02/26"` (MM/DD/YY format)

### Changes needed

**File 1: `src/components/sessions/SessionList.tsx`**
- Replace `formatGroupDate()` function (lines 76-79)
- Remove the `getOrdinalSuffix()` helper function (lines 69-74) — no longer needed
- Update the function to use `format(date, 'MM/dd/yy')` from date-fns

**File 2: `src/components/letters/LettersList.tsx`**
- Replace `formatGroupDate()` function (lines 37-40)
- Remove the `getOrdinalSuffix()` helper function (lines 30-35) — no longer needed
- Update the function to use `format(date, 'MM/dd/yy')` from date-fns

### Implementation
Both files use the same pattern. The new `formatGroupDate` function in each file becomes:
```ts
const formatGroupDate = (date: Date) => {
  return format(date, 'MM/dd/yy');
};
```

This simplifies the logic and displays dates like "12/02/26" instead of "2nd Dec '26".
