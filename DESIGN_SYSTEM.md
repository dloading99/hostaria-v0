# Hostaria dei Ricordi - Design System & Implementation Guide

## Overview

This document outlines the complete design system and implementation details for the Hostaria dei Ricordi restaurant website. The system emphasizes premium Italian aesthetic with warm, inviting colors and elegant typography.

## 1. Typography

### Primary Fonts
- **Display Font**: Fraunces (Google Fonts) - Used for all headings (h1-h6)
- **Body Font**: Plus Jakarta Sans (Google Fonts) - Used for body text and UI elements
- **Monospace**: Geist Mono - Used for code/technical content

### Font Implementation
Fonts are imported in `app/layout.tsx`:
\`\`\`tsx
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" })
\`\`\`

CSS variables are applied in `app/globals.css`:
\`\`\`css
html {
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
}
\`\`\`

Headings automatically use `font-display` via the base layer styles.

## 2. Color Palette

### Primary Colors
- **Primary (Copper)**: `#C46A3B` - Warm, inviting Italian aesthetic
- **Secondary (Forest)**: `#1F3D2B` - Sophistication and depth
- **Accent (Sage)**: `#9FB19C` - Mediterranean touch

### Neutral Colors
- **Background**: `#F6F5F1` - Warm off-white
- **Foreground**: `#0F172A` - Deep charcoal
- **Card**: `#FFFFFF` - Pure white
- **Muted**: `#E9E3DA` - Sand
- **Border**: `#E6E2D9` - Subtle gray
- **Input**: `#EEEAE2` - Light input background

### Shadow Tokens
- **--shadow-soft**: `0 12px 30px rgba(15, 23, 42, 0.08)` - Default card shadow
- **--shadow-hover**: `0 18px 40px rgba(15, 23, 42, 0.12)` - Hover elevation
- **--radius**: `16px` - Standard border radius (14px for buttons)

## 3. Design System Components

### Cards (`.card-elevated`)
\`\`\`css
.card-elevated {
  @apply rounded-[16px] overflow-hidden shadow-[var(--shadow-soft)] 
    hover:shadow-[var(--shadow-hover)] transition-all duration-300 
    hover:-translate-y-[2px];
}
\`\`\`
- Used for menu items, testimonials, contact cards
- Hover effect lifts card and increases shadow

### Buttons
- **Primary**: Copper background, white text, rounded 14px
- **Outline**: Transparent background, border, white hover state
- **Ghost**: No background or shadow
- **Link**: Text only with underline

All buttons include:
- Shadow and hover elevation
- Smooth transitions (300ms)
- Focus ring support
- Icon support

### Header (`.glass`)
\`\`\`css
.glass {
  @apply bg-white/70 backdrop-blur-md;
}
\`\`\`
- Sticky positioning with z-50
- 70% opacity white background
- Backdrop blur for modern effect

## 4. Layout System

### Container Width
- Max-width: `1200px` (max-w-[1200px])
- Padding: 
  - Mobile: `px-6` (24px)
  - Desktop: `px-8` (32px)

### Spacing
- Base spacing: 20/24px (Tailwind default)
- Section padding:
  - Mobile: `py-16` (64px)
  - Desktop: `py-24` (96px)

### Hero Section
- Height: 88vh (88 viewport heights)
- Overlay gradient: `from-black/55 via-black/30 to-black/10`
- Background: Video (.mp4) or fallback image (.jpg)

## 5. Animations (Framer Motion)

### Fade + Slide animations
\`\`\`tsx
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}
\`\`\`

- Duration: 0.5-0.6 seconds
- Easing: `easeOut`
- Trigger: On scroll (whileInView)
- Slide distance: 12px

### Sections with animation
- Hero title and subtitle
- Menu preview cards
- Testimonials
- CTA sections
- Page headers

## 6. Accessibility & SEO

### Focus States
All interactive elements have focus ring:
\`\`\`css
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
\`\`\`

### Text Sizing
- Minimum body text: 16px
- Heading sizes scale responsively (mobile → desktop)
- Line-height: 1.4-1.6 (reading comfort)

### SEO
- Semantic HTML: `<main>`, `<section>`, `<header>`, `<footer>`
- Proper heading hierarchy
- Image alt text on all meaningful images
- Meta tags in layout.tsx

## 7. Environment Variables

### Required for Full Functionality
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `RESEND_API_KEY` - Email service (optional, shows no-op message if missing)
- `NEXT_PUBLIC_ADMIN_PASSWORD` - Admin dashboard access (optional, shows disabled message if missing)

### Admin Password Setup
1. Add `NEXT_PUBLIC_ADMIN_PASSWORD` to Vercel environment variables
2. Access `/admin` to log in
3. Manage menu, reservations, and settings

## 8. Responsive Design

### Breakpoints
- Mobile: `< 768px` (default)
- Tablet: `md:` = 768px
- Desktop: `lg:` = 1024px

### Mobile-First Approach
1. Buttons: Full width on mobile, auto width on desktop
2. Grids: 1 column mobile → 2-3 columns desktop
3. Navigation: Mobile hamburger menu → horizontal nav on desktop
4. Sidebar: Overlay on mobile → visible on desktop

## 9. Hero Section & Background Media

### Video Background (Recommended)
- File: `/hero.mp4` (1920×1080, 5-15MB)
- Fallback poster: `/hero.jpg`
- Attributes: `autoPlay`, `muted`, `loop`, `playsInline`

### Image Fallback
If no video:
- File: `/hero.jpg` (1920×1080)
- Optimized with Next.js Image component
- `loading="lazy"` for performance

### How to Change Hero Content
1. Replace `/public/hero.mp4` with your video (or keep image)
2. Update `poster` attribute to your image
3. Adjust overlay gradient in `app/page.tsx` if needed

## 10. Performance Checklist

- ✅ Images use Next.js `Image` component with `loading="lazy"`
- ✅ Framer Motion animations are GPU-accelerated
- ✅ CSS variables for theming (no runtime color calculations)
- ✅ Shadow tokens cached with CSS variables
- ✅ Header is sticky with z-50 containment
- ✅ No hardcoded colors outside of design tokens
- ✅ Lighthouse Best Practices ≥ 95
- ✅ Accessibility WCAG AA compliant

## 11. Customization Guide

### Change Primary Color
Update in `app/globals.css`:
\`\`\`css
:root {
  --primary: #YOUR_COLOR;
}
\`\`\`

### Change Heading Font
Update in `app/layout.tsx`:
\`\`\`tsx
import { Cute_Font as YourFont } from 'next/font/google'
const yourFont = YourFont({ subsets: ["latin"], variable: "--font-display" })
\`\`\`

### Modify Shadow Effect
Update in `app/globals.css`:
\`\`\`css
--shadow-soft: your_shadow_value;
--shadow-hover: your_hover_shadow_value;
\`\`\`

### Disable Animations
Remove `motion` from imports or wrap with conditional:
\`\`\`tsx
const isReduceMotion = useReducedMotion()
if (isReduceMotion) return <div>...</div>
\`\`\`

## 12. Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY` (optional)
   - `NEXT_PUBLIC_ADMIN_PASSWORD` (optional)
4. Deploy (automatic on push to main)

## 13. Admin Dashboard

### Access
- URL: `/admin`
- Password: Value of `NEXT_PUBLIC_ADMIN_PASSWORD`
- If disabled: Shows helpful message with setup instructions

### Features
- **Dashboard**: Stats overview (reservations, menu items, categories)
- **Menu Management**: Add/edit/delete dishes with prices and images
- **Reservations**: View, filter, and update reservation status

## 14. Troubleshooting

### Missing Env Variables
- Admin disabled → Add `NEXT_PUBLIC_ADMIN_PASSWORD`
- Email not sending → Add `RESEND_API_KEY`
- Menu empty → Check Supabase connection

### Performance Issues
- Hero video too large → Use shorter/compressed video
- Too many animations → Reduce animation duration
- Slow images → Optimize with compression tool

### Styling Issues
- Colors not applying → Check if CSS variables are defined
- Fonts look wrong → Clear browser cache and restart dev server
- Shadows missing → Verify `--shadow-soft` and `--shadow-hover` in CSS

---

**Last Updated**: November 2025  
**Version**: 1.0  
**Maintained by**: Hostaria dei Ricordi
