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
        "Roki Roy is a freelance full-stack developer in Siliguri, India, building websites, web apps and mobile apps for startups from design through deployment.",
      slogan: "Websites and apps for startups, from idea to launch.",
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
      "@type": "Service",
      "@id": `${SITE_URL}/#freelance-development`,
      name: "Freelance web and app development for startups",
      serviceType: [
        "Website development",
        "Web application development",
        "Mobile application development",
        "Performance auditing and refactoring",
      ],
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Place", name: "Worldwide" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Roki Roy",
      jobTitle: "Freelance Full-Stack Developer & Founder",
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
