

## Fix: Resolve Build Error

### Problem
The preview is not loading due to a transient build error: `vite: command not found`. This means `node_modules` needs to be reinstalled. The actual file upload restriction code in `ContextTab.tsx` is correctly implemented.

### Solution
Run `npm install` (or `bun install`) to restore `node_modules`, then the dev server will start and the file upload restrictions will work as expected.

### Steps
1. Run package install to restore dependencies
2. Verify the dev server starts successfully
3. No code changes needed — the validation logic, toast, and UI labels are all correctly in place

