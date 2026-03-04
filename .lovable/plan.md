

## Remove Shadow from Letters Tab Pills

**Problem:** The Letters tab pills ("To be sent" / "Sent") look different from View Sessions pills because they're missing border overrides, causing the base TabsTrigger's `border-b-2` and `data-[state=active]:border-primary` styles to bleed through.

**Fix in `src/components/letters/LettersList.tsx`:**

Update both TabsTrigger classNames to match the View Sessions pattern exactly — add `border border-transparent` and `data-[state=active]:border-brand/30`:

```
// From:
"rounded-full bg-transparent text-muted-foreground text-xs px-3 py-1 data-[state=active]:bg-[hsl(5_85%_92%)] data-[state=active]:text-foreground hover:text-foreground"

// To:
"rounded-full border border-transparent bg-transparent text-muted-foreground text-xs px-3 py-1 data-[state=active]:bg-[hsl(5_85%_92%)] data-[state=active]:text-foreground data-[state=active]:border-brand/30 hover:text-foreground"
```

This adds `border border-transparent` (overrides base `border-b-2`) and `data-[state=active]:border-brand/30` (overrides base `data-[state=active]:border-primary`) to both pills, making them identical to View Sessions.

