# Aceternity UI

Premium animated components for "wow-factor" websites. Copy-paste ready.

---

## What is Aceternity UI?

- 🎨 **50+ animated components** - Hero sections, cards, backgrounds
- ⚡ **Built with** - Tailwind CSS + Framer Motion
- 📋 **Copy-paste** - No npm install, just copy code
- 🏆 **Awwwards-quality** - Used in premium portfolios

---

## Installation

No package to install! Copy components from [ui.aceternity.com](https://ui.aceternity.com)

**Required dependencies:**
```bash
npm install framer-motion clsx tailwind-merge
```

**Add cn utility:**
```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 🔥 Hero Components

### Spotlight Effect
```tsx
// Creates a spotlight that follows cursor
import { Spotlight } from "@/components/ui/spotlight"

<div className="h-screen w-full flex items-center justify-center bg-black">
  <Spotlight className="top-0 left-0" fill="white" />
  <h1 className="text-4xl md:text-7xl font-bold text-white">
    Spotlight Hero
  </h1>
</div>
```

### Lamp Effect
```tsx
// Glowing lamp reveal animation
import { LampContainer } from "@/components/ui/lamp"

<LampContainer>
  <h1 className="text-4xl font-bold text-white">
    Welcome
  </h1>
</LampContainer>
```

### Aurora Background
```tsx
import { AuroraBackground } from "@/components/ui/aurora-background"

<AuroraBackground>
  <div className="text-center">
    <h1 className="text-5xl font-bold text-white">Beautiful Aurora</h1>
  </div>
</AuroraBackground>
```

---

## 🃏 Card Components

### 3D Card Effect
```tsx
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"

<CardContainer>
  <CardBody className="bg-gray-50 w-auto h-auto rounded-xl p-6">
    <CardItem translateZ="50" className="text-xl font-bold">
      3D Card Title
    </CardItem>
    <CardItem translateZ="100" className="mt-4">
      <img src="/image.jpg" className="h-60 w-full object-cover rounded-xl" />
    </CardItem>
  </CardBody>
</CardContainer>
```

### Hover Effect Card
```tsx
import { HoverEffect } from "@/components/ui/card-hover-effect"

const items = [
  { title: "Card 1", description: "Description", link: "/link1" },
  { title: "Card 2", description: "Description", link: "/link2" },
]

<HoverEffect items={items} />
```

### Bento Grid
```tsx
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

<BentoGrid>
  <BentoGridItem
    title="Feature 1"
    description="Description"
    header={<div className="h-full w-full bg-gradient-to-br from-violet-500 to-purple-500" />}
    className="md:col-span-2"
  />
  <BentoGridItem title="Feature 2" description="Description" />
</BentoGrid>
```

---

## ✨ Text Effects

### Text Generate Effect
```tsx
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

<TextGenerateEffect words="Words appear one by one with a fade effect" />
```

### Typewriter Effect
```tsx
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

const words = [
  { text: "Build" },
  { text: "awesome" },
  { text: "websites", className: "text-blue-500" },
]

<TypewriterEffect words={words} />
```

### Text Reveal Card
```tsx
import { TextRevealCard } from "@/components/ui/text-reveal-card"

<TextRevealCard text="Hover to reveal" revealText="Hidden message!" />
```

---

## 🌌 Background Effects

### Vortex
```tsx
import { Vortex } from "@/components/ui/vortex"

<Vortex className="h-screen">
  <h1 className="text-white text-5xl font-bold">Vortex Background</h1>
</Vortex>
```

### Grid Background
```tsx
<div className="h-screen w-full bg-black bg-grid-white/[0.2] relative">
  {/* Radial gradient for faded look */}
  <div className="absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
  <p className="text-white relative z-20">Grid Background</p>
</div>
```

### Shooting Stars
```tsx
import { ShootingStars, StarsBackground } from "@/components/ui/shooting-stars"

<div className="h-screen relative bg-black">
  <ShootingStars />
  <StarsBackground />
  <div className="relative z-10">Content here</div>
</div>
```

---

## 🧭 Navigation

### Floating Navbar
```tsx
import { FloatingNav } from "@/components/ui/floating-navbar"

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
]

<FloatingNav navItems={navItems} />
```

---

## Usage Tips

### Combine with shadcn/ui
```tsx
// Use Aceternity for heroes, shadcn for forms/buttons
<AuroraBackground>
  <div className="text-center space-y-4">
    <TextGenerateEffect words="Welcome to our platform" />
    <Button>Get Started</Button> {/* shadcn button */}
  </div>
</AuroraBackground>
```

### Performance
```tsx
// Disable effects on mobile
const isMobile = useMediaQuery({ maxWidth: 768 })

{!isMobile && <Vortex />}
```

---

## Best Practices

- ✅ Use for hero sections and key visuals
- ✅ Combine with solid base components (shadcn)
- ✅ Reduce effects on mobile for performance
- ✅ Keep animations under 1 second for UX
- ❌ Don't overuse - pick 2-3 effects per page
- ❌ Don't use heavy effects in footer/nav

---

## Resources

- Components: [ui.aceternity.com](https://ui.aceternity.com)
- Templates: [pro.aceternity.com](https://pro.aceternity.com)
