# Mobile Responsive Implementation - wowfy

## Navigation & Layout
- [ ] Fix navbar positioning for mobile (currently `top-0 right-0 pr-24`)
- [ ] Create hamburger menu for mobile (icon-only nav works but needs better UX)
- [ ] Test smooth scroll behavior on mobile devices
- [ ] Ensure navbar doesn't overlap content on small screens

## Section Responsiveness (13 sections)
- [ ] **Hero** (ExperienceHero) - 3D canvas responsive sizing
- [ ] **Welcome** - Text and counter scaling
- [ ] **Journey** - Timeline/journey layout for mobile
- [ ] **Services** - Grid: `md:grid-cols-2 lg:grid-cols-3` (✅ already responsive-aware)
- [ ] **WhyUs** - Interactive shapes sizing
- [ ] **TechStack** - 3D model viewer mobile optimization
- [ ] **Portfolio** - 3D card gallery mobile layout
- [ ] **ProjectDetails** - Large component needs mobile review
- [ ] **Testimonials** - Card layout mobile adaptation
- [ ] **Pricing** - Bento grid mobile stacking
- [ ] **Contact** - Form layout mobile optimization
- [ ] **Footer** - Particle effects + content mobile layout

## UI Components (Critical ones)
- [ ] `tube-light-navbar.tsx` - Mobile positioning fix
- [ ] `experience-hero.tsx` - 3D canvas performance on mobile
- [ ] `tech-model-viewer.tsx` - 3D performance optimization
- [ ] `Project3DCard.tsx` - Card sizing for mobile
- [ ] `particle-text-effect.tsx` - Performance tuning
- [ ] `interactive-text-particle.tsx` - Touch interactions
- [ ] `spotlight-card.tsx` - Mouse effects → touch handling
- [ ] `bento-pricing.tsx` - Grid layout mobile stacking

## Performance Optimization
- [ ] Disable heavy 3D effects on mobile (conditional rendering)
- [ ] Reduce particle counts for mobile devices
- [ ] Test GSAP animations on mobile (frame rate)
- [ ] Optimize Three.js scenes for mobile GPUs
- [ ] Add `prefers-reduced-motion` checks

## Testing
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet sizes (768px - 1024px)
- [ ] Test landscape orientation
- [ ] Lighthouse mobile performance audit

## Deployment
- [ ] Push changes to GitHub
- [ ] Deploy to Vercel preview
- [ ] Final mobile testing on live preview
