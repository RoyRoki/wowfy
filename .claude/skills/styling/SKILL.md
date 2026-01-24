---
name: Styling & CSS
description: Modern CSS solutions for building beautiful, responsive interfaces
---

# Styling & CSS

Utility-first and modern CSS approaches for rapid, maintainable styling.

---

## 📚 Available Skills

| Tool | Approach | File |
|------|----------|------|
| **Tailwind CSS** | Utility-first CSS framework | [tailwind.md](./tailwind.md) |

---

## 🎯 Styling Philosophy

For Awwwards-quality sites, we use:

**Tailwind CSS** for:
- Rapid prototyping
- Consistent spacing/colors
- Responsive design
- Component utilities

**Custom CSS** for:
- Complex animations
- Unique effects
- Gradients and masks
- Shader effects

---

## 📦 Setup

```bash
# Included with Next.js create-next-app --tailwind
# Or install separately:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Load:** `tailwind.md` for configuration

---

## 🎨 Customization Strategy

### 1. Design Tokens
Define in `tailwind.config.ts`:
- Custom colors (not default blue/red)
- Brand-specific spacing
- Custom fonts
- Breakpoints

### 2. Custom Utilities
```typescript
// tailwind.config.ts
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in-out',
    },
    keyframes: {
      fadeIn: { /* ... */ }
    }
  }
}
```

### 3. Layer Custom CSS
```css
/* globals.css */
@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent;
  }
}
```

---

## 🏆 Premium Patterns

### Gradients
```tsx
<div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
```

### Glassmorphism
```tsx
<div className="backdrop-blur-xl bg-white/10 border border-white/20">
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-zinc-900">
```

### Animations
```tsx
<div className="transition-all duration-300 hover:scale-105">
```

---

## ⚡ Performance Tips

- ✅ Use JIT mode (enabled by default in v3+)
- ✅ Purge unused classes (automatic in production)
- ✅ Minimize custom CSS (use Tailwind utilities)
- ✅ Use `@layer` for organization
- ❌ Avoid inline style objects (use classes)

---

## 🎯 Integration

### With shadcn/ui
shadcn uses Tailwind - they work together seamlessly  
**Load:** `tailwind.md` + `../ui-libraries/shadcn.md`

### With Framer Motion
Combine Tailwind classes with Framer Motion variants  
**Load:** `tailwind.md` + `../animation/framer-motion.md`

### With Custom Designs
Extend theme, don't fight it  
**Load:** `tailwind.md`

---

## 📖 Best Practices

1. **Mobile-first** responsive design
2. **Use design tokens** (extend theme)
3. **Group utilities** logically (layout, typography, effects)
4. **Extract components** when utilities get long
5. **Never use** default colors on premium sites

---

## 🚫 Anti-Patterns

- ❌ `className="mt-4 mb-4 ml-2 mr-2 pt-8 pb-8..."` (use spacing scale)
- ❌ Default blue/red/green (use custom palette)
- ❌ Inline styles instead of Tailwind
- ❌ Not using responsive utilities

---

*Tailwind is a design system, not just utility classes. Customize it.*
