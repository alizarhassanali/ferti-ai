

## Align User Management Toolbar with Templates Layout

### Current layouts

**My Templates & Template Hub** (consistent pattern):
- **Left**: Search bar (flex-1, max-w-md)
- **Right**: Action buttons / filter pills

**User Management** (inconsistent):
- **Left**: "Add New Member" button
- **Right**: Search bar + filter pills

### Plan

**`src/components/settings/UserManagement/UserManagementList.tsx`** — Rearrange the filters toolbar (lines 131-180) to match the templates pattern:

```
[Search bar (left, max-w-md)] [Status filter] [Role filter]  ———————  [+ Add New Member (right)]
```

Changes:
1. Move the search `Input` to the left with `flex-1 max-w-md` styling, matching the templates search bar style (`pl-11 pr-4 py-2.5 h-11 rounded-xl`)
2. Place the Status and Role filter pills immediately after the search bar (in the same left-aligned group)
3. Move the "Add New Member" button to the far right using `justify-between` on the container

This is a single-file rearrangement of existing elements — no new components or logic changes needed.

