# Framer Motion

Declarative animations for React. The easiest way to add motion.

---

## Installation

```bash
npm install framer-motion
```

---

## Basic Animations

### Fade In
```tsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Fades in
</motion.div>
```

### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Slides up
</motion.div>
```

### Scale
```tsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>
  Scales in
</motion.div>
```

---

## Hover & Tap

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-blue-500 text-white rounded-lg"
>
  Interactive Button
</motion.button>
```

### With Color Change
```tsx
<motion.div
  whileHover={{ 
    scale: 1.02,
    backgroundColor: "#3b82f6"
  }}
  transition={{ duration: 0.2 }}
>
  Hover me
</motion.div>
```

---

## Scroll Animations

### Animate on Scroll (whileInView)
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  Animates when scrolled into view
</motion.div>
```

### Staggered Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" whileInView="show">
  {items.map((i) => (
    <motion.li key={i} variants={item}>
      {i}
    </motion.li>
  ))}
</motion.ul>
```

---

## Page Transitions

### Layout with AnimatePresence
```tsx
// app/template.tsx (Next.js App Router)
"use client"
import { motion, AnimatePresence } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## Gestures

### Drag
```tsx
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
  className="w-20 h-20 bg-blue-500 rounded-lg cursor-grab"
/>
```

### Pan
```tsx
<motion.div
  onPan={(e, info) => console.log(info.offset)}
  className="w-20 h-20 bg-blue-500"
/>
```

---

## Variants (Reusable Animations)

```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Use with spread
<motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
  Content
</motion.div>
```

### Animation Library Pattern
```tsx
// lib/animations.ts
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

---

## Common Patterns

### Section Reveal
```tsx
function Section({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}
```

### Card Hover
```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.3 }}
  className="p-6 bg-white rounded-xl"
>
  Card content
</motion.div>
```

### Button Press
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

---

## Performance Tips

```tsx
// Use layoutId for shared element transitions
<motion.div layoutId="shared-element" />

// Use layout prop for automatic layout animations
<motion.div layout />

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
/>
```

---

## Best Practices

- ✅ Use `whileInView` with `viewport={{ once: true }}`
- ✅ Keep durations under 0.6s for UI
- ✅ Use spring for interactive elements
- ✅ Stagger children for lists
- ✅ Respect `prefers-reduced-motion`
- ❌ Don't animate layout properties on scroll
- ❌ Don't use long durations (>1s) for UI

---

## Resources

- Docs: [framer.com/motion](https://www.framer.com/motion/)
- Examples: [framer.com/motion/examples](https://www.framer.com/motion/examples/)
