

## Fix Missing Scroll on All Pages

### Root Cause
AppLayout wraps children in `<div className="flex-1 overflow-hidden">`. Pages using `flex-1 overflow-y-auto` as their outer wrapper don't get a proper height constraint, so scrolling breaks. The fix is to use `h-full overflow-y-auto` instead.

### Pages to Fix

| Page | File | Current class | Fix |
|------|------|--------------|-----|
| My Templates | `src/pages/MyTemplates.tsx` (line 31) | `flex-1 overflow-y-auto` | `h-full overflow-y-auto` |
| Template Hub | `src/components/templates/TemplateCommunity.tsx` (line 62) | `flex-1 overflow-y-auto` | `h-full overflow-y-auto` |
| Template Detail | `src/pages/TemplateDetail.tsx` (line 39) | `flex-1 overflow-y-auto` | `h-full overflow-y-auto` |

### Pages Already Working (no changes needed)
- **Settings/RightPane**: Already uses `h-full overflow-y-auto`
- **NewSession**: Uses `h-screen overflow-hidden` with internal scroll containers
- **Team**: Uses `h-screen overflow-hidden` with inner `flex-1 overflow-y-auto` (works because h-screen provides the constraint)
- **Letters, ViewSessions, AIAssistant**: Use `h-screen` flex layouts with internal scroll
- **Index**: No scroll needed (centered landing)

### Files Changed
1. `src/pages/MyTemplates.tsx` — line 31: `flex-1` → `h-full`
2. `src/components/templates/TemplateCommunity.tsx` — line 62: `flex-1` → `h-full`
3. `src/pages/TemplateDetail.tsx` — line 39: `flex-1` → `h-full`

