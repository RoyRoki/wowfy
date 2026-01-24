# Lenis

Buttery smooth scrolling library. Industry standard for premium sites.

---

## Why Lenis?

- 🧈 **Smooth scrolling** - Native-like, 60fps
- 🪶 **Lightweight** - ~3KB gzipped
- 🔗 **GSAP compatible** - Works with ScrollTrigger
- 📱 **Touch friendly** - Mobile support

---

## Installation

```bash
npm install @studio-freight/lenis
```

---

## Basic Setup

### Next.js App Router
```tsx
// app/providers.tsx
"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

// app/layout.tsx
import { SmoothScrollProvider } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
```

---

## Configuration Options

```tsx
const lenis = new Lenis({
  duration: 1.2,         // Animation duration (default: 1.2)
  easing: (t) => ...,    // Easing function
  orientation: "vertical", // "vertical" | "horizontal"
  gestureOrientation: "vertical",
  smoothWheel: true,     // Smooth scroll for mouse wheel
  smoothTouch: false,    // Keep native touch on mobile
  wheelMultiplier: 1,    // Wheel speed multiplier
  touchMultiplier: 2,    // Touch speed multiplier
  infinite: false,       // Infinite scroll
})
```

### Recommended Settings
```tsx
// Smooth but responsive
const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false, // Keep native touch behavior
})
```

---

## With GSAP ScrollTrigger

```tsx
"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LenisGSAPProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis()

    // Sync Lenis with GSAP's ticker
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}
```

---

## Scroll Control

### Scroll To
```tsx
// Scroll to element
lenis.scrollTo("#section-2")

// Scroll to position
lenis.scrollTo(1000)

// Scroll to top
lenis.scrollTo(0)

// With options
lenis.scrollTo("#target", {
  offset: -100,        // Offset from target
  duration: 2,         // Duration override
  immediate: false,    // Skip animation
  onComplete: () => {} // Callback
})
```

### Stop/Start
```tsx
// Stop smooth scroll (for modals, etc.)
lenis.stop()

// Resume
lenis.start()

// Check state
lenis.isStopped
```

---

## React Hooks Pattern

```tsx
// hooks/useLenis.ts
import { useEffect, useState } from "react"
import Lenis from "@studio-freight/lenis"

let lenisInstance: Lenis | null = null

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  
  useEffect(() => {
    if (!lenisInstance) {
      lenisInstance = new Lenis()
      
      function raf(time: number) {
        lenisInstance?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }
    setLenis(lenisInstance)
    
    return () => {
      // Don't destroy on component unmount
      // Destroy on full app unmount
    }
  }, [])
  
  return lenis
}

// Usage
function Component() {
  const lenis = useLenis()
  
  const scrollToTop = () => {
    lenis?.scrollTo(0)
  }
}
```

---

## Scroll Events

```tsx
lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
  console.log({
    scroll,     // Current scroll position
    limit,      // Maximum scroll
    velocity,   // Scroll velocity
    direction,  // 1 (down) or -1 (up)
    progress,   // 0 to 1
  })
})
```

### Progress-based Effects
```tsx
lenis.on("scroll", ({ progress }) => {
  // Change background based on scroll
  document.body.style.backgroundColor = 
    `hsl(${progress * 360}, 50%, 50%)`
})
```

---

## Common Patterns

### Anchor Links
```tsx
// Make anchor links smooth
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault()
    const target = anchor.getAttribute("href")
    lenis.scrollTo(target)
  })
})
```

### Modal/Menu Open
```tsx
function openModal() {
  lenis.stop() // Prevent background scroll
  setIsOpen(true)
}

function closeModal() {
  lenis.start()
  setIsOpen(false)
}
```

### Horizontal Sections
```tsx
const lenis = new Lenis({
  orientation: "horizontal",
  gestureOrientation: "both", // Allow both orientations for gesture
})
```

---

## Troubleshooting

### Body Overflow
```css
/* Lenis adds this, but ensure it's there */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
```

### Fixed Elements
```tsx
// Add data attribute to prevent Lenis on fixed elements
<div data-lenis-prevent>
  This scrolls normally (useful for modals)
</div>
```

### SSR
```tsx
// Check for window
if (typeof window !== "undefined") {
  const lenis = new Lenis()
}
```

---

## Best Practices

- ✅ Use `smoothTouch: false` for better mobile UX
- ✅ Keep `duration` between 0.8-1.5
- ✅ Sync with GSAP for scroll animations
- ✅ Stop Lenis when modals/menus open
- ✅ Use `data-lenis-prevent` for scrollable modals
- ❌ Don't use very high durations (>2s feels sluggish)
- ❌ Don't forget to destroy on cleanup

---

## Resources

- GitHub: [github.com/studio-freight/lenis](https://github.com/studio-freight/lenis)
- Demo: [lenis.darkroom.engineering](https://lenis.darkroom.engineering/)
