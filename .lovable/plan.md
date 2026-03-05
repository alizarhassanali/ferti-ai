

## Add Dummy Users & "Created At" Column to User Management

### 1. Add fallback dummy data in `useTeamMembers` hook

When the database returns empty results (no auth / no real data), fall back to a hardcoded array of ~10 dummy team members matching the screenshot names (Ahmed Mustafa, Gary Nakhuda, Hassan Jamil, Sami Sohail, etc.) with varied roles, statuses, and `created_at` dates.

### 2. Add "Created At" column + "Actions" column to table

**File: `src/components/settings/UserManagement/UserManagementList.tsx`**

- Add `created_at` as a sortable column header with `ArrowUpDown` icon
- Format dates as `MM/DD/YYYY` using `date-fns` `format()`
- Add "Actions" column with a `MoreVertical` (⋮) icon button per row containing a dropdown with "Edit user" and "Disable user" options (non-functional for now, just UI)
- Update `SortField` type to include `'created_at'`
- Update `colSpan` from 4 to 6 for empty/loading/error states
- Add sorting logic for `created_at` field

### 3. Add `created_at` to `TeamMember` type

The type already has `created_at: string` — no change needed.

### Dummy data sample

```ts
const DUMMY_MEMBERS: TeamMember[] = [
  { id: '1', first_name: 'Ahmed', last_name: 'Mustafa', email: 'ahmed.mustufa@thefertilitypartners.com', role: 'physician', status: 'active', created_at: '2024-03-11', ... },
  { id: '2', first_name: 'Gary', last_name: 'Nakhuda', email: 'gary.nakhuda@thefertilitypartners.com', role: 'admin', status: 'active', created_at: '2026-01-30', ... },
  // ... ~8 more matching the screenshot
];
```

