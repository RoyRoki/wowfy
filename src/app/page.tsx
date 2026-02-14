import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { Journey } from "@/components/sections/Journey";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { PricingSection } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/Contact";
import { Home as HomeIcon, Briefcase, DollarSign, Mail } from "lucide-react"; // Removed as not needed
import { NavBar } from "@/components/ui/tube-light-navbar";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: 'Home' },
    // { name: 'Intro', url: '#welcome', icon: 'User' },
    { name: 'Services', url: '#services', icon: 'Briefcase' },
    { name: 'Why Us', url: '#why-us', icon: 'Star' },
    { name: 'Tech', url: '#tech-stack', icon: 'Code' },
    { name: 'Works', url: '#portfolio', icon: 'Folder' },
    { name: 'Team', url: '#team', icon: 'Users' },
    // { name: 'Pricing', url: '#pricing', icon: 'DollarSign' },
    { name: 'Contact', url: '#contact', icon: 'Mail' }
  ];

  return (
    <main className="relative">
      {/* <CircularRadialNav /> */}
      <NavBar items={navItems} />
      <section id="hero">
        <Hero />
      </section>
      <section id="welcome">
        <Welcome />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="why-us">
        <WhyUs />
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
      {/* <section id="pricing">
        <PricingSection />
      </section> */}
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
