import type { FAQEntry } from "@/components/ui/faq-tabs";

/**
 * Freelance FAQs — written for SEO / AEO / GEO.
 * Each answer opens with a direct, quotable sentence (what answer engines lift),
 * is written in first person and stays self-contained.
 * Prices and timelines mirror src/data/pricing.json — keep them in sync.
 */
export const faqCategories = {
  services: "Services & fit",
  pricing: "Pricing & timelines",
  process: "Working together",
  tech: "Tech, SEO & performance",
  ownership: "Ownership & support",
} as const;

export const faqData: Record<keyof typeof faqCategories, FAQEntry[]> = {
  services: [
    {
      question: "What freelance projects do you take on?",
      answer:
        "I build landing pages, business websites, startup MVP web apps, Flutter mobile apps for iOS and Android, and performance audits or refactors of existing sites. Most clients are startup founders and growing businesses that need a product designed, built and launched end to end.",
    },
    {
      question: "Where are you based, and do you work with international clients?",
      answer:
        "I'm based in Siliguri, West Bengal, India, and work remotely with clients across India and abroad, including the US, UK, Europe and the Middle East. Communication happens in English, Hindi or Bengali over WhatsApp, email and video calls.",
    },
    {
      question: "Why hire a freelance developer instead of a web development agency?",
      answer:
        "Hiring me gives you agency-level quality without agency overhead: you talk directly to the person building your product, decisions happen faster, and there are no account managers or handoffs between teams. For larger scopes, I lead a small senior team while staying hands-on.",
    },
    {
      question: "Are you a good fit for an early-stage startup?",
      answer:
        "Yes. Startup MVPs are a core focus: I help founders cut scope to what matters for launch, builds on a clean, scalable architecture, and ships to production so you can start testing with real users quickly instead of waiting months.",
    },
    {
      question: "Do you build e-commerce and Shopify stores?",
      answer:
        "Yes. I build custom e-commerce storefronts, including headless Shopify builds with Next.js, with fast product pages, mobile-first checkout flows and SEO-ready category pages. Live examples are in the Works and Products sections of this site.",
    },
  ],
  pricing: [
    {
      question: "How much does it cost to hire you for a website or app?",
      answer:
        "Landing pages start at ₹50,000, business websites at ₹85,000 and startup MVP web apps at ₹1.7 lakh. Flutter mobile apps are quoted per project. The final price depends on scope, integrations and content, and you get a fixed quote after a short discovery call.",
    },
    {
      question: "How long does it take to build a website or MVP?",
      answer:
        "A landing page typically takes 7–10 days, a business website 2–3 weeks, a startup MVP web app 4–6 weeks and a Flutter mobile app 6–10 weeks. Performance audits and refactors take 1–2 weeks. Timelines are confirmed once scope and content are agreed.",
    },
    {
      question: "Do you offer fixed-price quotes?",
      answer:
        "Yes. After understanding your goals, features and timeline, I share a clear, fixed-scope quote with milestones, so you know what is being built and what it costs before work begins. Changes outside the agreed scope are estimated separately before they are started.",
    },
    {
      question: "Can you work with clients outside India and quote in other currencies?",
      answer:
        "Yes. I regularly work with international clients remotely. Quotes can be discussed in your preferred currency, and project milestones, updates and calls are scheduled to overlap with your time zone.",
    },
  ],
  process: [
    {
      question: "Will I work directly with you?",
      answer:
        "Yes. I stay hands-on across planning, design, development and deployment, and I'm your single point of contact throughout the project. There are no handoffs to junior developers or account managers.",
    },
    {
      question: "What does the project process look like?",
      answer:
        "Projects follow five steps: a discovery call to understand goals, a scoped proposal and quote, design in Figma or live prototypes, development with regular progress updates and preview links, and finally launch, deployment and handover.",
    },
    {
      question: "How do I start a freelance project with you?",
      answer:
        "Use the contact form or WhatsApp link on this page. Share what you want built, your goals, any reference sites and your ideal timeline. I'll reply to set up a discovery call and outline next steps.",
    },
    {
      question: "How often will I get updates during the project?",
      answer:
        "You get regular progress updates and live preview links throughout development, so you can review real work rather than screenshots and give feedback early. Communication runs over WhatsApp, email or scheduled video calls.",
    },
  ],
  tech: [
    {
      question: "What technologies do you use?",
      answer:
        "I build with Next.js, React, TypeScript and Tailwind CSS for the web, Flutter for iOS and Android apps, and Firebase or Node.js back ends. Three.js and GSAP are used for premium 3D and scroll-driven animation when a project calls for it.",
    },
    {
      question: "Will my website be SEO-friendly and fast?",
      answer:
        "Yes. Every site ships with technical SEO built in: semantic HTML, metadata, structured data, sitemaps, image optimisation and analytics setup. Landing pages are built to score 90+ on Google Lighthouse, which helps both search rankings and conversions.",
    },
    {
      question: "Do you optimise websites for AI search like ChatGPT and Google AI Overviews?",
      answer:
        "Yes. Beyond classic SEO, I structure content for answer engines and generative search (AEO and GEO): clear question-and-answer content, schema.org structured data for your business and services, and consistent entity information so AI assistants can understand and cite your site.",
    },
    {
      question: "Can you fix or speed up my existing website?",
      answer:
        "Yes. A performance audit and refactor takes 1–2 weeks and covers Core Web Vitals, bundle size, image and font loading, rendering strategy and technical SEO issues, followed by the fixes themselves rather than just a report.",
    },
    {
      question: "Will my website work well on mobile?",
      answer:
        "Yes. Every build is mobile-first and tested on real phones and tablets, with touch-friendly navigation, responsive layouts and lighter animations on low-power devices so the site stays fast everywhere.",
    },
  ],
  ownership: [
    {
      question: "Who owns the code and design after the project?",
      answer:
        "You do. Once the project is complete and paid for, you own the source code, designs and content. Code is handed over in your own GitHub repository and the site is deployed to your hosting account.",
    },
    {
      question: "Do you provide support after launch?",
      answer:
        "Yes. Landing pages include 30 days of post-launch support, and ongoing maintenance, updates and new features can be arranged for any project after launch.",
    },
    {
      question: "Can I update the website content myself?",
      answer:
        "Yes. Business websites include a CMS integration, so you can edit text, images, blog posts and pages yourself without touching code or waiting on a developer.",
    },
    {
      question: "Where will my website be hosted?",
      answer:
        "Websites are usually deployed on Vercel for fast global performance, with the domain, hosting and analytics set up in your name. Other hosting providers can be used if your business already has one.",
    },
  ],
};

/** Flattened list — used for FAQPage structured data. */
export const allFaqs: FAQEntry[] = Object.values(faqData).flat();
