# Motion Design System Documentation

## Overview

The Motion Design System provides a cohesive, performant animation framework for Hostaria dei Ricordi website using Framer Motion and Lenis for smooth scrolling.

## Architecture

### Core Components

1. **Motion Tokens** (`lib/motion/tokens.ts`)
   - Standardized durations: xs (0.25s), sm (0.35s), md (0.6s), lg (0.9s)
   - Easing curves: out, inOut
   - Distance tokens for transitions: sm (12px), md (24px), lg (48px)

2. **Motion Provider** (`components/providers/MotionProvider.tsx`)
   - Wraps app with ReactLenis for smooth scroll
   - Duration: 1.2s, smoothWheel: true
   - Enables GPU-accelerated scrolling

3. **Route Transitions** (`app/template.tsx`)
   - Fade + slide (10px) on route enter
   - Fade + slide (-8px) on route exit
   - Respects `prefers-reduced-motion` for accessibility

### Motion Primitives

#### Reveal Component
\`\`\`tsx
<Reveal delay={0} y={12} once={true} amount={0.2}>
  <h2>Content</h2>
</Reveal>
\`\`\`
- Fade + slide animation on viewport entry
- Configurable delay, direction, animation amount
- Uses viewport intersection observer

#### Stagger Component
\`\`\`tsx
<Stagger delay={0}>
  {items.map(item => (
    <motion.div variants={item} key={item.id}>
      {/* Content */}
    </motion.div>
  ))}
</Stagger>
\`\`\`
- Container for staggered child animations
- 0.06s stagger interval between children
- Each child animated with motion.item variant

#### Parallax Component
\`\`\`tsx
<Parallax yFrom={-30} yTo={30}>
  <img src="map.jpg" />
</Parallax>
\`\`\`
- Scroll-triggered parallax effect
- Smooth Y-axis translation based on scroll progress
- GPU optimized with will-change

## Implementation Guidelines

### Pages & Sections

1. **Homepage**
   - Hero: Reveal with staggered text
   - Menu Preview: Stagger grid with item variants
   - Testimonials: Stagger + item variants
   - CTA: Reveal with no parallax

2. **Menu Page**
   - Title: Reveal
   - Category Tabs: Reveal with button hover states
   - Menu Grid: Stagger + item variants
   - CTA: Reveal

3. **Contacts Page**
   - Title: Reveal
   - Left Column: Reveal with y={24}
   - Right Column: Reveal with y={-24}
   - Map: Parallax + Reveal

4. **Reservations Page**
   - Title: Reveal
   - Form: Reveal with y={24}
   - Sidebar: Reveal with y={-24}

### Micro-interactions

All buttons include:
- `whileHover={{ y: -1 }}` - Subtle lift on hover
- `whileTap={{ scale: 0.98 }}` - Tap feedback
- Focus ring for accessibility

### Accessibility

- All animations respect `prefers-reduced-motion`
- Motion primitives check this automatically
- Route template disables motion for users who prefer reduced motion
- Focus management is preserved

## Performance

- **60 fps target** on mid-range desktop
- **LCP ≤ 2.5s** maintained
- No layout shift (all transforms are GPU-accelerated)
- Lazy loading on images, priority only on hero
- Will-change applied to animated elements

## Customization

### Adjust Global Durations

Edit `lib/motion/tokens.ts`:
\`\`\`ts
export const motionTokens = {
  dur: { xs: 0.25, sm: 0.35, md: 0.6, lg: 0.9 },
  // Adjust values to slow down/speed up all animations
}
\`\`\`

### Change Smooth Scroll Speed

Edit `components/providers/MotionProvider.tsx`:
\`\`\`tsx
<ReactLenis root options={{ duration: 1.2 }}> {/* Increase for slower scroll */}
\`\`\`

### Customize Parallax Effect

Edit component props:
\`\`\`tsx
<Parallax yFrom={-50} yTo={50}> {/* Increase for more dramatic effect */}
  {children}
</Parallax>
\`\`\`

## KPIs

- Scroll performance: 60 fps maintained
- LCP: ≤ 2.5s
- Layout shift: None visible
- Route transitions: Smooth, no flicker
- Accessibility: WCAG AA compliant with reduced motion support

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support with GPU acceleration
- Mobile: Touch optimized, `smoothTouch: false` to avoid interference

## Related Files

- `app/template.tsx` - Route transitions
- `app/layout.tsx` - MotionProvider wrapper
- All page components - Apply motion primitives
- `package.json` - framer-motion@11, lenis@1.1.13

## Troubleshooting

**Animations feel choppy?**
- Check browser DevTools Performance tab
- Ensure GPU acceleration is enabled
- Reduce parallax effect strength

**Scroll not smooth?**
- Check Lenis is properly mounted in MotionProvider
- Verify React version is 19.2.0+

**prefers-reduced-motion not working?**
- Ensure template.tsx is at app root
- Check system accessibility settings

---

Last updated: November 2024
