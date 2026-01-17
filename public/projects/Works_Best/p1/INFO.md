AI Study Notes SaaS (Inspired by Alex Nguyen's 360K-user, $19K/mo solo product)

Description: Full-stack AI platform for students/freelancers to upload notes/photos → auto-summarize, rewrite, quiz via GPT. Real-time collab, mobile scan (camera OCR), export PDF/Markdown. Scaled to 10K DAU with push notifications.
Challenge/Solution: Poor note retention → AI vision + LLM (OpenAI/Anthropic) for 40% better recall; responsive PWA for cross-device sync.
Metrics: 360K users, $19K/mo (Stripe subs), 85% retention.
Tech: Next.js (frontend, Tailwind/Shadcn), React Native Expo (mobile), HonoJS/Supabase (backend/DB/auth), OpenAI API + Deepinfra (AI/TTS), Railway deploy, Framer Motion/GSAP (animations), Three.js (floating notebook 3D).
Visual Hook: Hero 3D phone/laptop mockup scans dummy notes → particles animate summary reveal on scroll.