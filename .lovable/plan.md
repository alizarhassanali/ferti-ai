

## Modernize Profile Image Upload

### Current State
The upload area has a large 80×80 avatar, a paragraph of helper text, and a full outline button with icon + text — feels bulky for a settings form.

### Suggested Approaches

**Option A — Overlay camera icon on avatar (most minimal)**
- Shrink avatar to 64×64
- Remove the helper text paragraph and the separate upload button entirely
- Add a small semi-transparent camera/pencil icon overlay on the bottom-right of the avatar
- Clicking the avatar itself triggers the file input
- Tooltip on hover: "Upload a profile image (JPG, PNG, GIF, or WebP, max 5 MB)"

**Option B — Small text link beside avatar**
- Shrink avatar to 56×56
- Replace the button with a simple text link: "Change photo" (or "Upload photo" if none set)
- Remove the helper text paragraph — move the file constraints into a tooltip or keep as a one-liner under the link in xs text
- Keeps layout horizontal but much tighter

**Option C — Ghost button, inline layout**
- Keep avatar at 64×64
- Replace outline button with a ghost/link-style button: just "Upload" or "Change" with a small icon
- Remove the helper paragraph, show constraints only on hover via tooltip

### Recommendation
Option A is the cleanest — one clickable element, no extra text. It matches modern settings UIs (GitHub, Slack, Linear).

### Changes (Option A)
- **`src/components/settings/ProfileSettings.tsx`**: Replace the avatar + text + button block with a single clickable avatar that has a camera icon overlay. Add a tooltip wrapper for the file-size hint. Wire the `onClick` / `htmlFor` to the hidden file input.

