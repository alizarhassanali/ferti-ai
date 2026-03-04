

## Fix Double Footer Appearance

The problem: The chat support button sits in its own `div` row (lines 40-47) between the content and footer. This div inherits the background and takes up vertical space, creating the appearance of two stacked footers.

### Fix in `src/components/layout/AppLayout.tsx`

Remove the wrapper `div` around the chat button and make the button `fixed` positioned so it floats above the footer without taking any layout space:

- Remove the `<div className="flex justify-end px-6 pb-2">` wrapper (lines 40-47)
- Make the button `fixed bottom-12 right-6 z-50` so it sits just above the footer
- Keep the `<AppFooter />` as the only element after the scrollable content

Result: Only one footer visible, with the chat button floating above it.

