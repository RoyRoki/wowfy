# Wowfy - Premium Freelancing Portfolio

> Awwwards-Level Quality Single Page Application

---

## Project Overview

**Type:** Single Page Application (SPA)
**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript
**Animation:** Framer Motion, GSAP, Lenis
**Status:** 🚧 Active Development
**Goal:** Awwwards Site of the Day quality

---

## Development Progress

### Core Systems
- [ ] SmoothScroll (Lenis Provider)
- [ ] CustomCursor (Magnetic + Trail effects)
- [ ] ThemeProvider (Dark/Light mode)

### Section Components
- [ ] Hero.tsx (Kinetic headline + 3D background)
- [ ] Journey.tsx (Scroll-pinned timeline)
- [ ] Services.tsx (Interactive cards grid)
- [ ] Portfolio.tsx (Masonry gallery + modals)
- [ ] Testimonials.tsx (Marquee)
- [ ] Contact.tsx (Immersive form)
- [ ] Footer.tsx (Minimal + back-to-top)

### UI Components
- [ ] MagneticButton.tsx
- [ ] GlowCard.tsx
- [ ] KineticText.tsx
- [ ] AnimatedInput.tsx

---

## Design System

### Color Palette

**Dark Mode (Default):**
- Background: `#0f172a` (slate-950)
- Background Alt: `#1e293b` (slate-800)
- Surface: `rgba(30, 41, 59, 0.8)` (Glass effect)

**Accent Colors:**
- Primary: `#6366f1` (indigo-500)
- Highlight: `#06b6d4` (cyan-500)
- Warm: `#f59e0b` (amber-500)

**Text:**
- Primary: `#e2e8f0` (slate-200)
- Secondary: `#94a3b8` (slate-400)
- Muted: `#64748b` (slate-500)

### Typography

**Font Families:**
- Heading: Inter Tight, Inter, system-ui
- Body: Inter, Satoshi, system-ui
- Mono: JetBrains Mono

**Scale:**
- Display: clamp(3rem, 8vw, 7rem) - weight 800
- H1: clamp(2.5rem, 6vw, 5rem) - weight 700
- H2: clamp(2rem, 4vw, 3.5rem) - weight 700
- H3: clamp(1.5rem, 3vw, 2rem) - weight 600
- Body: 1rem - 1.125rem - weight 400

### Effects

**Glassmorphism:**
```css
background: rgba(30, 41, 59, 0.6);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

**Shadows:**
- Glow Cyan: `0 0 40px rgba(6, 182, 212, 0.3)`
- Glow Indigo: `0 0 40px rgba(99, 102, 241, 0.3)`
- Soft: `0 8px 32px rgba(0, 0, 0, 0.3)`

**Gradients:**
- Hero: `radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)`
- Accent: `linear-gradient(135deg, #6366f1, #06b6d4)`

### Spacing (8pt Grid)
- Base unit: 8px
- Section padding mobile: 48px
- Section padding desktop: 96px
- Hero spacing: 128px

### Animation Timing
- Micro: 0.15s ease-out
- Fast: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Normal: 0.5s cubic-bezier(0.4, 0, 0.2, 1)
- Smooth: 0.8s cubic-bezier(0.16, 1, 0.3, 1)
- Cinematic: 1.2s+ cubic-bezier(0.16, 1, 0.3, 1)

---

## Quality Standards

### Performance
- Lighthouse score: ≥ 90
- 60fps animations (no jank)
- Optimized images and fonts
- Code splitting and lazy loading

### Design
- Smooth scroll (Lenis)
- Micro-interactions on every element
- Parallax and scroll-triggered reveals
- Premium glassmorphism effects
- Magnetic cursor with trails

### Responsive
- Mobile-first approach
- Touch gestures optimized
- Reduced effects on mobile
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px

### Accessibility
- WCAG 2.1 AA compliance
- ARIA attributes
- Reduced motion support
- Keyboard navigation
- Proper heading hierarchy

---

## Tech Stack Details

### Core
- **Next.js 14+** - App Router, Server Components, Image optimization
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### Animation Libraries
- **Lenis** - Buttery smooth scrolling
- **GSAP** - Scroll-triggered animations, timelines
- **Framer Motion** - React component animations

### UI Libraries (when needed)
- **shadcn/ui** - Base accessible components
- **Aceternity UI** - Premium hero components
- **Magic UI** - Text effects and animations

### 3D (optional)
- **React Three Fiber** - WebGL/3D elements

---

## Skills Library

Project-specific technical knowledge available in `.claude/skills/`:

### Animation
- `animation/gsap.md` - GSAP ScrollTrigger and timelines
- `animation/framer-motion.md` - Component animations
- `animation/lenis.md` - Smooth scrolling
- `animation/SKILL.md` - Animation decision tree

### UI Libraries
- `ui-libraries/aceternity.md` - Premium hero components
- `ui-libraries/magic-ui.md` - Text effects
- `ui-libraries/shadcn.md` - Base components
- `ui-libraries/SKILL.md` - UI library selection guide

### 3D Graphics
- `3d-graphics/r3f.md` - React Three Fiber
- `3d-graphics/SKILL.md` - 3D implementation guide

### Styling
- `styling/tailwind.md` - Tailwind patterns and utilities
- `styling/SKILL.md` - Styling approaches

---

## Next Tasks

### 🔥 Priority: Mobile Responsive (Planned)
- [ ] **Mobile Responsive Implementation** - See `.claude/tasks/mobile-responsive/`
  - [ ] Fix navbar for mobile (bottom nav)
  - [ ] Optimize 3D effects for mobile performance
  - [ ] Responsive layouts for all 13 sections
  - [ ] Touch-optimized interactions
  - [ ] Performance testing on mobile devices

### Future Enhancements
1. [ ] Set up Lenis smooth scrolling provider
2. [ ] Create custom cursor system with magnetic effects
3. [ ] Build Hero section with kinetic typography
4. [ ] Implement Journey timeline with GSAP ScrollTrigger
5. [ ] Create Services interactive cards
6. [ ] Build Portfolio masonry gallery
7. [ ] Implement Contact form with animations
8. [ ] Polish micro-interactions throughout
9. [ ] Performance audit and optimization
10. [ ] Accessibility audit

---

## Recent Changes

| Date | Change | Notes |
|------|--------|-------|
| 2026-01-25 | Mobile responsive planning | Created plan in `.claude/tasks/mobile-responsive/` |
| 2026-01-23 | Reorganized to Claude Code structure | Moved skills to project-specific location |
| 2026-01-17 | Initial project setup | Next.js initialized with Tailwind |

---

## Notes

- Target: Awwwards Site of the Day
- Performance: Lighthouse 90+ required
- Mobile-first with touch gestures
- Reduced motion support mandatory
- All animations must be 60fps

---

*For help with specific features, reference the skills in `.claude/skills/`*
