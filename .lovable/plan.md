

## Add Delete User with Confirmation Dialog

### Changes to `src/components/settings/UserManagement/UserManagementList.tsx`

1. **Import** `AlertDialog` components and add a `Ban` icon (for disable) alongside existing `Trash2` (for delete).

2. **Add state** to track which member is being deleted (`memberToDelete`).

3. **Update the actions dropdown** for each row:
   - **Edit user** — unchanged (pencil icon)
   - **Disable user** — remove red/destructive styling, use `Ban` icon, normal text color
   - **Delete user** — red destructive styling with `Trash2` icon, sets `memberToDelete` state

4. **Add an `AlertDialog`** outside the table that shows when `memberToDelete` is set:
   - Title: "Delete User"
   - Description: "Are you sure you want to permanently delete {name}? This action cannot be undone."
   - Cancel button (outline) and Delete button (red/destructive)
   - On confirm: show a toast for now (no backend wired yet), clear state

