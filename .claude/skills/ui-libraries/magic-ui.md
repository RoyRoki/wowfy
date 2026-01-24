# Magic UI

Free, open-source animated components. Alternative to Aceternity.

---

## What is Magic UI?

- 🎨 **50+ animated components** - Particles, text effects, backgrounds
- ⚡ **Built with** - Tailwind CSS + Framer Motion
- 🆓 **Free & open-source**
- 📦 **npm installable** or copy-paste

---

## Installation

```bash
# Via npm
npm install magic-ui

# Or copy components from magicui.design
```

**Dependencies:**
```bash
npm install framer-motion clsx tailwind-merge
```

---

## 🌟 Text Effects

### Blur In
```tsx
import BlurIn from "@/components/magicui/blur-in"

<BlurIn word="Hello World" className="text-4xl font-bold" />
```

### Word Pull Up
```tsx
import WordPullUp from "@/components/magicui/word-pull-up"

<WordPullUp words="Words animate up one by one" />
```

### Flip Text
```tsx
import FlipText from "@/components/magicui/flip-text"

<FlipText word="Flip" />
```

### Gradual Spacing
```tsx
import GradualSpacing from "@/components/magicui/gradual-spacing"

<GradualSpacing text="Gradual Spacing Effect" />
```

### Letter Pull Up
```tsx
import LetterPullup from "@/components/magicui/letter-pullup"

<LetterPullup words="Hello" delay={0.05} />
```

---

## ✨ Special Effects

### Particles
```tsx
import Particles from "@/components/magicui/particles"

<div className="relative h-screen">
  <Particles
    className="absolute inset-0"
    quantity={100}
    staticity={50}
    color="#ffffff"
  />
  <div className="relative z-10">Content</div>
</div>
```

### Confetti
```tsx
import Confetti from "@/components/magicui/confetti"

<Confetti />
```

### Meteors
```tsx
import { Meteors } from "@/components/magicui/meteors"

<div className="relative">
  <Meteors number={20} />
  {/* Content */}
</div>
```

### Globe
```tsx
import Globe from "@/components/magicui/globe"

<Globe className="w-80 h-80" />
```

---

## 🎨 Backgrounds

### Dot Pattern
```tsx
import { DotPattern } from "@/components/magicui/dot-pattern"

<div className="relative h-screen">
  <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
</div>
```

### Grid Pattern
```tsx
import { GridPattern } from "@/components/magicui/grid-pattern"

<div className="relative h-screen">
  <GridPattern width={40} height={40} className="opacity-50" />
</div>
```

### Ripple
```tsx
import Ripple from "@/components/magicui/ripple"

<div className="relative flex h-screen items-center justify-center">
  <Ripple />
  <span className="z-10 text-4xl font-bold">Ripple Effect</span>
</div>
```

### Animated Gradient
```tsx
import { AnimatedGradient } from "@/components/magicui/animated-gradient"

<AnimatedGradient className="h-screen" />
```

---

## 🃏 Cards & UI

### Marquee (Infinite Scroll)
```tsx
import Marquee from "@/components/magicui/marquee"

<Marquee pauseOnHover>
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Marquee>
```

### Animated List
```tsx
import AnimatedList from "@/components/magicui/animated-list"

<AnimatedList>
  {notifications.map((item) => (
    <div key={item.id}>{item.message}</div>
  ))}
</AnimatedList>
```

### Dock (macOS style)
```tsx
import { Dock, DockIcon } from "@/components/magicui/dock"

<Dock>
  <DockIcon><HomeIcon /></DockIcon>
  <DockIcon><SettingsIcon /></DockIcon>
</Dock>
```

---

## 🔢 Numbers & Data

### Number Ticker
```tsx
import NumberTicker from "@/components/magicui/number-ticker"

<NumberTicker value={1000} />
```

### Animated Counter
```tsx
import { AnimatedCounter } from "@/components/magicui/animated-counter"

<AnimatedCounter from={0} to={100} duration={2} />
```

---

## 🔘 Buttons

### Shimmer Button
```tsx
import ShimmerButton from "@/components/magicui/shimmer-button"

<ShimmerButton>Shimmer Effect</ShimmerButton>
```

### Animated Subscribe Button
```tsx
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"

<AnimatedSubscribeButton>Subscribe</AnimatedSubscribeButton>
```

---

## Usage Patterns

### Hero Section
```tsx
<div className="relative h-screen flex items-center justify-center">
  <Particles className="absolute inset-0" quantity={50} />
  <div className="relative z-10 text-center">
    <BlurIn word="Welcome" className="text-6xl font-bold" />
    <WordPullUp words="Build amazing websites" className="mt-4" />
    <ShimmerButton className="mt-8">Get Started</ShimmerButton>
  </div>
</div>
```

### Stats Section
```tsx
<div className="grid grid-cols-3 gap-8">
  <div className="text-center">
    <NumberTicker value={1000} className="text-4xl font-bold" />
    <p className="text-muted-foreground">Users</p>
  </div>
  {/* More stats */}
</div>
```

---

## Best Practices

- ✅ Use Particles/Meteors sparingly (performance)
- ✅ Combine text effects with fade-in timing
- ✅ Use Marquee for testimonials/logos
- ✅ NumberTicker for stats that should impress
- ❌ Don't stack multiple heavy effects
- ❌ Keep total particle count under 100

---

## Resources

- Components: [magicui.design](https://magicui.design)
- GitHub: [github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui)
