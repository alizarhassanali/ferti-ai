

## Make Footer Fixed & Auto-Hide

Currently the footer sits at the bottom of the content area and is always visible. We'll make it fixed to the bottom of the viewport but hidden by default — it slides up when the user hovers near the bottom edge.

### Changes

**`src/components/layout/AppLayout.tsx`**
- Move `<AppFooter />` outside the scrollable content div
- Position it as a fixed element at the bottom of the main content area using `fixed bottom-0 right-0` with proper left offset to avoid overlapping the sidebar
- Add a hover trigger zone (invisible div at the bottom) that shows the footer on hover

**`src/components/layout/AppFooter.tsx`**
- Accept `visible` prop to control show/hide
- Add `translate-y-full` by default, `translate-y-0` when visible, with a smooth transition
- Keep all existing content and styling

**Approach**: Wrap footer in a container with a ~16px invisible hover zone at the bottom. When the user moves their mouse to the very bottom of the screen, the footer slides up. When they move away, it slides back down after a short delay.

```tsx
// AppLayout - simplified concept
const [footerVisible, setFooterVisible] = useState(false);

<div className="fixed bottom-0 right-0 z-50"
     style={{ left: sidebarWidth }}
     onMouseEnter={() => setFooterVisible(true)}
     onMouseLeave={() => setFooterVisible(false)}>
  <div className="h-4" /> {/* hover trigger zone */}
  <AppFooter className={cn(
    "transition-transform duration-300",
    footerVisible ? "translate-y-0" : "translate-y-full"
  )} />
</div>
```

