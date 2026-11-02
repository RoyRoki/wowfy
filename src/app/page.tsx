import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { Journey } from "@/components/sections/Journey";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { Contact } from "@/components/sections/Contact";
import { Home as HomeIcon, Briefcase, DollarSign, Mail } from "lucide-react"; // Removed as not needed
import { NavBar } from "@/components/ui/tube-light-navbar";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/seo";
import { FAQ } from "@/components/ui/faq-tabs";
import { SvgRevealText } from "@/components/ui/svg-reveal-text";
import { faqCategories, faqData, allFaqs } from "@/data/faqs";

const freelanceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function Home() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: 'Home' },
    // { name: 'Intro', url: '#welcome', icon: 'User' },
    { name: 'Build', url: '#what-we-build', icon: 'Briefcase' },
    { name: 'Products', url: '#products', icon: 'Star' },
    { name: 'Tech', url: '#tech-stack', icon: 'Code' },
    { name: 'Works', url: '#portfolio', icon: 'Folder' },
    { name: 'Team', url: '#team', icon: 'Users' },
    { name: 'Contact', url: '#contact', icon: 'Mail' }
  ];

  return (
    <main className="relative">
      <JsonLd data={[...siteGraph(), freelanceFaqSchema]} />
      {/* <CircularRadialNav /> */}
      <NavBar items={navItems} />
      <section id="hero">
        <Hero />
      </section>
      <section id="welcome">
        <Welcome />
      </section>
      {/* <section id="services">
        <Services />
      </section> */}
      <section id="what-we-build">
        <WhatWeBuild />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="tech-stack">
        <TechStack />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="team">
        <Team />
      </section>
      <section
        id="freelance-faq"
        aria-labelledby="freelance-faq-title"
        className="relative overflow-hidden bg-[#080808] px-4 py-20 md:py-28"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[350px] left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/5 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Freelance FAQs
            </p>
            <h2
              id="freelance-faq-title"
              className="link text-3xl font-extrabold tracking-tight text-white md:text-5xl"
            >
              Questions,{" "}
              <SvgRevealText text="answered" />
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">
              Roki Roy is a full-stack developer based in Siliguri, India, working
              directly with founders to plan, design, build, and deploy websites,
              web apps, and mobile apps.
            </p>
          </div>
          <FAQ categories={faqCategories} faqData={faqData} />
        </div>
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
