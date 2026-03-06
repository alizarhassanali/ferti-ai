

## Make Disable/Enable User Buttons Functional

### Problem
The "Disable user" and "Enable user" buttons in the User Management dropdown currently do nothing.

### Approach

Since `team_members` table updates require `service_role` (per RLS), we need a backend function to handle status changes.

**1. Create edge function `update-team-member-status`** (`supabase/functions/update-team-member-status/index.ts`)
- Accepts `{ teamMemberId, status }` (status: `'active'` | `'disabled'`)
- Validates JWT, checks caller has admin role via `has_role()`
- Updates `team_members.status` using service role client
- Returns updated member

**2. Add `useUpdateMemberStatus` hook** (in `src/hooks/useTeamMembers.ts`)
- Calls `supabase.functions.invoke('update-team-member-status', { body: { teamMemberId, status } })`
- Returns `{ updateStatus, isLoading }`

**3. Wire up buttons in `UserManagementList.tsx`**
- Add confirmation dialog for disable action ("Are you sure you want to disable {name}?")
- On "Disable user" click → call `updateStatus(member.id, 'disabled')` → show success toast → refetch members
- On "Enable user" click → call `updateStatus(member.id, 'active')` → show success toast → refetch members

### Files changed
- `supabase/functions/update-team-member-status/index.ts` (new)
- `supabase/config.toml` (add JWT config for new function)
- `src/hooks/useTeamMembers.ts` (add `useUpdateMemberStatus` export)
- `src/components/settings/UserManagement/UserManagementList.tsx` (wire buttons + add disable confirmation dialog)

