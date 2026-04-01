

## Match Letters Page to Reference Design

Comparing the reference screenshot against the current implementation, here are the differences to fix:

### 1. Letter Detail Header — Patient Name + Status Badge (top line)

**Current**: No patient name or status badge in the detail header — just metadata (date, doctor, template) on the left.

**Reference**: Shows **patient name as a large heading** ("Unknown Patient") followed by a **status badge** ("To be sent" in orange) on the first line. Below that, the metadata line (date, doctor, template type) without icons.

**Change in `LetterDetail.tsx`**:
- Add a header section above the toolbar showing `letter.patientName` as a large heading with a status badge next to it
- Move the metadata (date, doctor, template) to a second line below the name, displayed as plain text with small icons (calendar, user) — similar to current but under the name
- Keep action buttons (Copy, PDF, Mark as sent, Save) on the right side of this header area

### 2. Action Buttons Styling

**Current**: Copy and PDF are ghost buttons; Mark as sent is a solid primary button.

**Reference**: 
- "Mark as sent" is a **solid orange/brand button** with an icon
- "Save" is a **separate outlined/brand button** with a floppy disk icon — always visible (not just on unsaved changes)
- Copy and PDF are ghost icon+text buttons

**Change in `LetterDetail.tsx`**:
- Add a persistent "Save" button (outlined/brand style) to the right of the action buttons
- Style "Mark as sent" as a solid brand/orange button
- Remove the conditional save footer at the bottom; replace with the always-visible Save button in the header

### 3. Rich Text Toolbar — Add "Default" Dropdown

**Current**: Toolbar starts directly with H1, H2, H3, then formatting buttons.

**Reference**: Toolbar has a **"Default" dropdown** (paragraph style selector) before H1/H2/H3, then the same formatting buttons.

**Change in `RichTextToolbar.tsx`**:
- Add a paragraph style `<Select>` dropdown at the start of the toolbar showing "Default" with options (Default/Paragraph, Heading 1, 2, 3)
- Keep H1/H2/H3 toggle buttons as they are (or remove them if the dropdown replaces them — reference shows both)

### 4. Date Grouping Label Format

**Current**: Shows day name + MM/DD/YY format (e.g., "Sunday 12/15/24")

**Reference**: Shows day name + month day format (e.g., "Friday, Feb 6")

**Change in `LettersList.tsx`**:
- Update `formatGroupDate` to use format like "EEEE, MMM d" (e.g., "Friday, Feb 6")
- Remove the separate right-aligned date; combine into one label

### 5. Letter Content — Update Demo Data

**Current**: Demo content uses basic markdown-style formatting.

**Reference**: Content is a proper referral GP letter with sections (History, Previous Investigations, Assessment, Plan) and clinical detail.

**Change in `LettersContext.tsx`**:
- Update the first demo letter content to match the reference style — a proper GP referral letter with HTML formatting matching the screenshot

### Summary of Files to Change

| File | Change |
|------|--------|
| `src/components/letters/LetterDetail.tsx` | Add patient name heading + status badge, restructure header, persistent Save button |
| `src/components/letters/RichTextToolbar.tsx` | Add "Default" paragraph style dropdown |
| `src/components/letters/LettersList.tsx` | Update date format to "Friday, Feb 6" style |
| `src/contexts/LettersContext.tsx` | Update demo letter content to match reference |

