

## Style "Disable user" Dropdown Item

**File:** `src/components/settings/UserManagement/UserManagementList.tsx`

**Changes (lines 260-263):**
- Add a `Pencil` icon (from lucide-react) before "Edit user"
- Add a `Trash2` icon before "Disable user" and style it with destructive/red coloring using `className="text-destructive focus:text-destructive"`
- Import `Pencil` and `Trash2` from lucide-react

```tsx
<DropdownMenuItem className="gap-2">
  <Pencil className="h-4 w-4" />
  Edit user
</DropdownMenuItem>
<DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
  <Trash2 className="h-4 w-4" />
  Disable user
</DropdownMenuItem>
```

