/**
 * Centralised SEO / AEO / GEO constants and structured-data builders.
 * Keeping the entity graph here means Organization/Person @id references
 * stay consistent across the homepage, project pages and product pages.
 */

export const SITE_URL = "https://www.rokiroy.in";
export const SITE_NAME = "RokiRoy Digital";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const FOUNDER_ID = `${SITE_URL}/#roki-roy`;

const SAME_AS = [
  "https://github.com/royroki",
  "https://x.com/MRrokiroy",
  "https://linkedin.com/in/rokiroy",
  "https://www.instagram.com/rokiroydev/",
];

/**
 * The site-wide entity graph: Organization + WebSite + founder Person.
 * This is what AI answer engines (ChatGPT, Perplexity, Gemini, Google AI
 * Overviews) read to understand *who* RokiRoy Digital is.
 */
export function siteGraph() {
  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "Roki Roy Digital",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.jpg`,
      },
      image: `${SITE_URL}/opengraph-image.jpg`,
      description:
        "Senior-led digital studio building premium websites, web apps and mobile apps for startups — Awwwards-quality design and solid engineering, shipped in weeks at a fraction of western-agency cost.",
      slogan: "World-class design. Solid engineering. A fraction of the cost.",
      foundingDate: "2024",
      founder: { "@id": FOUNDER_ID },
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "Next.js",
        "React",
        "Flutter",
        "E-commerce Development",
        "Headless Shopify",
        "Three.js",
        "GSAP Animation",
      ],
      areaServed: { "@type": "Place", name: "Worldwide" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Siliguri",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91-9800881300",
        availableLanguage: ["English", "Hindi", "Bengali"],
      },
      sameAs: SAME_AS,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Roki Roy",
      jobTitle: "Founder & Full-Stack Developer",
      worksFor: { "@id": ORG_ID },
      url: SITE_URL,
      image: `${SITE_URL}/team/roki-roy.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Siliguri",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Flutter",
        "Firebase",
        "Three.js",
        "GSAP",
        "Tailwind CSS",
      ],
      sameAs: SAME_AS,
    },
  ];
}
