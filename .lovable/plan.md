

## Redesign Consent Popup to Match Screenshot

### What changes

**`src/components/newSession/ConsentPopupDialog.tsx`** — rewrite content to match the screenshot exactly:

1. **Title**: Change from "Patient Consent Required" → "Verbal Consent Script"

2. **Body**: Replace single description with three paragraphs of the verbal consent script text:
   - Paragraph 1: "Before we begin, I'd like to use a secure AI documentation tool to assist me. It works by listening to our conversation in real-time to help me draft your medical note."
   - Paragraph 2: "You would have received a disclosure document outlining this system. The system does not keep a permanent recording; the audio is processed into text and then automatically deleted once transcribed to text. This allows me to focus entirely on you instead of my computer screen or notepad."
   - Paragraph 3: "You have the right to say no, or to ask me to turn it off at any time, and it won't affect your care. Are you comfortable with me using this tool for our visit today?"

3. **Buttons**: 
   - Primary (coral/brand): "Consent provided" (full width)
   - Secondary (outline): "Consent not provided" instead of "Cancel" (full width, no border — use `variant="outline"`)

4. **Layout**: Use `DialogDescription` or a `div` with multiple `<p>` tags for the three paragraphs with spacing between them.

