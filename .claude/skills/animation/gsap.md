# GSAP (GreenSock)

Professional-grade animation library. Industry standard for complex animations.

---

## Installation

```bash
npm install gsap
```

---

## Basic Animations

### To (Animate TO values)
```tsx
import gsap from "gsap"
import { useEffect, useRef } from "react"

function Component() {
  const boxRef = useRef(null)
  
  useEffect(() => {
    gsap.to(boxRef.current, {
      x: 100,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
  }, [])
  
  return <div ref={boxRef} className="w-20 h-20 bg-blue-500 opacity-0" />
}
```

### From (Animate FROM values)
```tsx
gsap.from(element, {
  y: 50,
  opacity: 0,
  duration: 0.8
})
```

### FromTo (Explicit start and end)
```tsx
gsap.fromTo(element, 
  { opacity: 0, y: 50 },    // from
  { opacity: 1, y: 0, duration: 1 }  // to
)
```

---

## ScrollTrigger (Most Important!)

```bash
# ScrollTrigger is included with gsap
```

### Basic Scroll Animation
```tsx
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

function Section() {
  const sectionRef = useRef(null)
  
  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",    // trigger when top of element hits 80% of viewport
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 100,
      opacity: 0,
      duration: 1
    })
  }, [])
  
  return <section ref={sectionRef}>Content</section>
}
```

### Scrub (Animation tied to scroll position)
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: "bottom bottom",
    scrub: true,  // Smooth scrubbing
    // scrub: 1   // 1 second lag
  },
  x: 500,
  rotation: 360
})
```

### Pin (Sticky elements during scroll)
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: "+=1000",  // Pin for 1000px of scrolling
    pin: true,
    scrub: 1
  },
  scale: 1.5
})
```

---

## Timelines

### Sequential Animations
```tsx
const tl = gsap.timeline()

tl.to(".box1", { x: 100, duration: 0.5 })
  .to(".box2", { x: 100, duration: 0.5 })  // Starts after box1
  .to(".box3", { x: 100, duration: 0.5 })  // Starts after box2
```

### With Position Parameter
```tsx
tl.to(".a", { x: 100, duration: 1 })
  .to(".b", { y: 100, duration: 1 }, "-=0.5")  // Overlap by 0.5s
  .to(".c", { opacity: 1, duration: 1 }, "<")   // Same time as previous
  .to(".d", { scale: 1.5, duration: 1 }, "+=0.5")  // 0.5s delay
```

### Timeline with ScrollTrigger
```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
    end: "bottom center",
    scrub: 1
  }
})

tl.to(".hero-text", { y: -100, opacity: 0 })
  .to(".hero-image", { scale: 1.2 }, "<")
  .to(".next-section", { opacity: 1 })
```

---

## Easing

```tsx
// Built-in eases
gsap.to(el, { x: 100, ease: "power1.out" })
gsap.to(el, { x: 100, ease: "power2.inOut" })
gsap.to(el, { x: 100, ease: "back.out(1.7)" })
gsap.to(el, { x: 100, ease: "elastic.out(1, 0.3)" })
gsap.to(el, { x: 100, ease: "bounce.out" })

// Common choices:
// power2.out - Smooth deceleration (default feel)
// power3.out - More dramatic deceleration
// back.out - Slight overshoot
// elastic.out - Bouncy
```

---

## React Patterns

### useGSAP Hook (Recommended)
```tsx
import { useGSAP } from "@gsap/react"

function Component() {
  const container = useRef(null)
  
  useGSAP(() => {
    gsap.to(".box", { x: 100 })
  }, { scope: container }) // Scopes selectors to container
  
  return (
    <div ref={container}>
      <div className="box">Animated</div>
    </div>
  )
}
```

### Cleanup
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
    gsap.to(".box", { x: 100 })
  }, containerRef)
  
  return () => ctx.revert() // Cleanup on unmount
}, [])
```

---

## Common Patterns

### Hero Text Reveal
```tsx
useGSAP(() => {
  gsap.from(".hero-word", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
  })
})
```

### Parallax Scroll
```tsx
gsap.to(".parallax-bg", {
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  },
  y: -200
})
```

### Horizontal Scroll
```tsx
const sections = gsap.utils.toArray(".panel")

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: () => "+=" + container.offsetWidth
  }
})
```

### Staggered Grid
```tsx
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".grid",
    start: "top 80%"
  },
  y: 50,
  opacity: 0,
  stagger: {
    each: 0.1,
    grid: [3, 3],
    from: "start"
  }
})
```

---

## With Lenis

```tsx
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Sync Lenis with ScrollTrigger
const lenis = new Lenis()

lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
```

---

## Performance

```tsx
// Use will-change for complex animations
gsap.set(element, { willChange: "transform" })

// Use force3D for GPU acceleration
gsap.to(element, { x: 100, force3D: true })

// Batch ScrollTrigger refreshes
ScrollTrigger.config({ limitCallbacks: true })

// Kill animations on unmount
ScrollTrigger.getAll().forEach(st => st.kill())
```

---

## Best Practices

- ✅ Use `useGSAP` or `gsap.context()` for React
- ✅ Always cleanup on unmount
- ✅ Use ScrollTrigger for scroll animations
- ✅ Combine with Lenis for smooth scroll
- ✅ Use power2.out for most UI animations
- ❌ Don't animate layout properties (width, height)
- ❌ Don't forget to registerPlugin()

---

## Resources

- Docs: [gsap.com/docs](https://gsap.com/docs/v3/)
- ScrollTrigger: [gsap.com/scrolltrigger](https://gsap.com/scrolltrigger)
- Ease Visualizer: [gsap.com/docs/v3/Eases](https://gsap.com/docs/v3/Eases)
