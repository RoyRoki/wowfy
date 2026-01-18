import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { Journey } from "@/components/sections/Journey";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { CircularRadialNav } from "@/components/ui/CircularRadialNav";

export default function Home() {
  return (
    <main className="relative">
      <CircularRadialNav />
      <section id="hero">
        <Hero />
      </section>
      <section id="welcome">
        <Welcome />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
