# shadcn/ui

Accessible, customizable component library built on Radix UI + Tailwind CSS.

---

## Why shadcn/ui?

- ✅ **You own the code** - Components copied to your project
- ✅ **Fully accessible** - Built on Radix UI primitives
- ✅ **Customizable** - Tailwind classes, easy theming
- ✅ **No runtime overhead** - No package dependency
- ✅ **TypeScript** - Full type safety

---

## Installation

```bash
# Initialize in Next.js project
npx shadcn@latest init

# Add components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

---

## Project Structure

```
components/
└── ui/
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── dialog.tsx
    └── ...
lib/
└── utils.ts        # cn() utility for class merging
```

---

## Core Components

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Input with Form
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

### Dialog (Modal)
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>Modal description here.</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## Theming

### CSS Variables (globals.css)
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --accent: 210 40% 96.1%;
    --destructive: 0 84.2% 60.2%;
    --border: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode colors */
  }
}
```

---

## Customization Examples

### Custom Button Variant
```tsx
// In button.tsx, add to variants:
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        // Add custom variant
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
      },
    },
  }
)

// Usage
<Button variant="gradient">Gradient Button</Button>
```

### Extend with Animation
```tsx
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

// Wrap with motion
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button>Animated</Button>
</motion.div>
```

---

## Best Practices

- ✅ Use `asChild` prop when wrapping with motion/links
- ✅ Customize via Tailwind classes first
- ✅ Extend variants in component file
- ✅ Keep accessibility props (aria-*, role)
- ❌ Don't modify core Radix behavior
- ❌ Don't remove focus states

---

## Common Components to Add

```bash
# Essential
npx shadcn@latest add button card input label

# Forms
npx shadcn@latest add form select textarea checkbox

# Overlays
npx shadcn@latest add dialog sheet dropdown-menu

# Data Display
npx shadcn@latest add table avatar badge

# Navigation
npx shadcn@latest add navigation-menu tabs
```

---

## Resources

- Docs: [ui.shadcn.com](https://ui.shadcn.com)
- Themes: [ui.shadcn.com/themes](https://ui.shadcn.com/themes)
- Examples: [ui.shadcn.com/examples](https://ui.shadcn.com/examples)
