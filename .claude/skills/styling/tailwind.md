---
name: Tailwind CSS
description: Utility-first CSS framework for rapid, maintainable styling
---

# Tailwind CSS Guide

Modern utility-first CSS framework for building custom designs rapidly.

---

## 🚀 Setup with Next.js

Already included if you used `create-next-app --tailwind`.

### Manual Setup
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
}
```

---

## 🎨 Custom Design System

### Colors (Avoid Defaults!)
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // ❌ Don't use: bg-blue-500
      // ✅ Do use: bg-brand-500
      brand: {
        50: '#f5f3ff',
        100: '#ede9fe',
        500: '#8b5cf6',
        900: '#4c1d95',
      },
      accent: {
        // Custom accent colors
      },
    },
  },
}
```

### Typography
```typescript
theme: {
  extend: {
    fontSize: {
      'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'hero': ['3rem', { lineHeight: '1.2' }],
    },
  },
}
```

### Spacing
```typescript
theme: {
  extend: {
    spacing: {
      '128': '32rem',
      '144': '36rem',
    },
  },
}
```

---

## 🏆 Premium Patterns

### Gradients
```tsx
// Linear
<div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600" />

// Radial
<div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 to-blue-900" />
```

### Glassmorphism
```tsx
<div className="
  backdrop-blur-xl 
  bg-white/10 
  border border-white/20 
  shadow-2xl
" />
```

### Text Gradients
```tsx
<h1 className="
  bg-clip-text 
  text-transparent 
  bg-gradient-to-r 
  from-purple-600 
  to-pink-600
">
  Premium Text
</h1>
```

### Dark Mode
```tsx
// Enable dark mode in config
module.exports = {
  darkMode: 'class', // or 'media'
}

// Use dark: variant
<div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
```

---

## 🎬 Animations

### Built-in
```tsx
<div className="animate-pulse" />
<div className="animate-bounce" />
<div className="animate-spin" />
```

### Custom
```typescript
// tailwind.config.ts
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
  },
}
```

---

## ⚡ Responsive Design

```tsx
<div className="
  text-sm     /* Mobile (default) */
  md:text-base  /* Tablet (768px+) */
  lg:text-lg    /* Desktop (1024px+) */
  xl:text-xl    /* Large (1280px+) */
">
  Responsive text
</div>
```

### Breakpoints
```typescript
// Default breakpoints
sm: '640px',    // Mobile landscape
md: '768px',    // Tablet
lg: '1024px',   // Desktop
xl: '1280px',   // Large desktop
2xl: '1536px',  // Extra large

// Custom
screens: {
  'mobile': '375px',
  'tablet': '768px',
  'desktop': '1440px',
}
```

---

## 🎯 Hover & Focus States

```tsx
<button className="
  bg-purple-600 
  hover:bg-purple-700 
  focus:ring-4 
  focus:ring-purple-300
  transition-all 
  duration-300
">
  Hover me
</button>
```

---

## 🧩 Layering Custom CSS

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Reset/base styles */
  h1 {
    @apply text-4xl font-bold;
  }
}

@layer components {
  /* Component classes */
  .btn-primary {
    @apply bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition;
  }
}

@layer utilities {
  /* Custom utilities */
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600;
  }
}
```

---

## 📦 Plugins

### Recommended
```bash
npm install -D @tailwindcss/typography @tailwindcss/forms
```

```typescript
// tailwind.config.ts
plugins: [
  require('@tailwindcss/typography'),
  require('@tailwindcss/forms'),
],
```

---

## 🎨 Arbitrary Values

```tsx
// Custom one-off values
<div className="
  top-[117px]
  bg-[#1da1f2]
  before:content-['Hello']
  grid-cols-[1fr_500px_2fr]
" />
```

---

## 🏆 Best Practices

1. **Mobile-first** - start with mobile, add `md:`, `lg:` for larger
2. **Use design tokens** - extend theme, don't use arbitrary values everywhere
3. **Group classes logically** - layout → typography → colors → effects
4. **Extract components** - if classes get too long
5. **Avoid `@apply`** in components - defeats purpose of Tailwind

---

## 🚫 Anti-Patterns

❌ **Default colors on premium sites**
```tsx
<div className="bg-blue-500"> // Generic
```

✅ **Custom brand colors**
```tsx
<div className="bg-brand-500"> // Unique
```

---

❌ **Inline styles instead of utilities**
```tsx
<div style={{ marginTop: '16px' }}>
```

✅ **Use utilities**
```tsx
<div className="mt-4">
```

---

❌ **Not using responsive modifiers**
```tsx
<div className="text-4xl"> // Same on all screens
```

✅ **Responsive design**
```tsx
<div className="text-2xl md:text-4xl lg:text-6xl">
```

---

## 🎯 Premium Site Checklist

- [ ] Custom color palette (not defaults)
- [ ] Premium fonts loaded (`next/font`)
- [ ] Dark mode implemented
- [ ] Gradients for key elements
- [ ] Glassmorphism where appropriate
- [ ] Smooth transitions on interactive elements
- [ ] Responsive at all breakpoints
- [ ] Custom animations for hero/CTA

---

## 🔗 Resources

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com) (paid components)
- [Headless UI](https://headlessui.com) (unstyled accessible components)

---

*Tailwind is a constraint system that speeds you up. Embrace it.*
