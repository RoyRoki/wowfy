import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { Journey } from "@/components/sections/Journey";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Welcome />
      <Journey />
      <Services />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
