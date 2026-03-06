

## Add "Resend Invitation" for Pending Users

### Change
**File: `src/components/settings/UserManagement/UserManagementList.tsx`**

Update the dropdown conditional logic from a two-branch (`disabled` vs else) to a three-branch structure:

- **`pending`**: "Edit user" + "Resend invitation" (with `Mail` icon) + "Disable user"
- **`disabled`**: "Edit user" + "Enable user" + "Delete user"  
- **`active`**: "Edit user" + "Disable user"

The "Resend invitation" button will invoke the existing `create-invite` edge function (re-creating the invite for the same email/member). Add `Mail` to the lucide-react imports. Show a success toast on completion.

### Files
1. **`src/components/settings/UserManagement/UserManagementList.tsx`** — add `Mail` import, update dropdown conditional to three branches, add resend handler using `useCreateInvite` hook
2. **`src/hooks/useTeamMembers.ts`** — already has `useCreateInvite`, no changes needed

