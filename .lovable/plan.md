

## Add Pagination with Limit Selector to All List Pages

### Overview
Create a reusable pagination footer component matching the screenshot design, then apply it to all table/list pages. The footer shows "Showing X to Y of Z items", Previous/Next with page numbers, and a "Limit: 10/25/50/100" dropdown.

### 1. Create Reusable `PaginationFooter` Component
**New file: `src/components/ui/pagination-footer.tsx`**

A self-contained component that accepts `totalItems`, `currentPage`, `itemsPerPage`, `onPageChange`, `onItemsPerPageChange`, and an `itemLabel` (e.g. "users", "templates").

Renders three sections in a flex row:
- **Left**: "Showing 1 to 10 of 55 {itemLabel}"
- **Center**: Previous / page numbers / Next (reuse existing Pagination components, limit visible page numbers to ~5 with ellipsis)
- **Right**: "Limit:" dropdown with options 10, 25, 50, 100

### 2. Apply to `UserManagementList`
**File: `src/components/settings/UserManagement/UserManagementList.tsx`**
- Add `currentPage`, `itemsPerPage` state
- Slice `sortedMembers` for current page
- Reset page to 1 when filters/search change
- Add `PaginationFooter` below the table with label "users"

### 3. Update `TemplatesTable`
**File: `src/components/templates/TemplatesTable.tsx`**
- Replace hardcoded `itemsPerPage = 10` with prop/state
- Add `onItemsPerPageChange` prop, pass up to parent
- Replace existing pagination block with `PaginationFooter` (label "templates")
- Update parent `MyTemplates` page to manage `itemsPerPage` state

### 4. Apply to `TemplateCommunity` (Template Hub)
**File: `src/components/templates/TemplateCommunity.tsx`**
- Add `currentPage`, `itemsPerPage` state
- Slice `filteredAndSortedTemplates` for display
- Add `PaginationFooter` below the grid with label "templates"

### Files changed
- `src/components/ui/pagination-footer.tsx` (new)
- `src/components/settings/UserManagement/UserManagementList.tsx`
- `src/components/templates/TemplatesTable.tsx`
- `src/components/templates/TemplateCommunity.tsx`
- `src/pages/MyTemplates.tsx` (pass new itemsPerPage props)

