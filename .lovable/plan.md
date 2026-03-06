

## Conditional Action Menu Based on User Status

### Change
**File: `src/components/settings/UserManagement/UserManagementList.tsx`** (lines 272-288)

Replace the static three-option dropdown with conditional rendering based on `member.status`:

- **Active or Pending users** → show "Edit user" + "Disable user" (2 options)
- **Disabled users** → show "Edit user" + "Enable user" + "Delete user" (3 options)

The "Enable user" option will use a `CheckCircle` (or `ShieldCheck`) icon. Delete remains destructive-styled and triggers the existing confirmation dialog. Need to import an additional icon (e.g. `CheckCircle2` from lucide-react).

```tsx
<DropdownMenuContent align="end" className="bg-popover">
  <DropdownMenuItem className="gap-2">
    <Pencil className="h-4 w-4" />
    Edit user
  </DropdownMenuItem>
  {member.status === 'disabled' ? (
    <>
      <DropdownMenuItem className="gap-2">
        <CheckCircle2 className="h-4 w-4" />
        Enable user
      </DropdownMenuItem>
      <DropdownMenuItem
        className="gap-2 text-destructive focus:text-destructive"
        onClick={() => setMemberToDelete(member)}
      >
        <Trash2 className="h-4 w-4" />
        Delete user
      </DropdownMenuItem>
    </>
  ) : (
    <DropdownMenuItem className="gap-2">
      <Ban className="h-4 w-4" />
      Disable user
    </DropdownMenuItem>
  )}
</DropdownMenuContent>
```

**Files changed:** 1 file, ~15 lines modified.

