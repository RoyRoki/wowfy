"use client";

import { motion } from "framer-motion";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { ContactForm } from "@/components/ui/contact-form";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { name: "GitHub", href: "https://github.com/royroki", icon: <GitHubIcon /> },
        { name: "Twitter", href: "https://x.com/MRrokiroy", icon: <TwitterIcon /> },
        { name: "LinkedIn", href: "https://linkedin.com/in/rokiroy", icon: <LinkedInIcon /> },
        { name: "Instagram", href: "https://www.instagram.com/rokiroydev/", icon: <InstagramIcon /> },
    ];

    return (
        <footer className="relative pt-16 pb-16 border-t border-white/10 min-h-[800px]">


            <div className="container-wide relative z-10">
                {/* Top Section - Social Links and Back to Top */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/10 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Back to Top */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group"
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-8 h-8 rounded-full border border-current flex items-center justify-center"
                        >
                            <svg
                                className="w-4 h-4 rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Minimal Contact Form */}
            <div className="container-wide relative z-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center text-center mb-8"
                >
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/60">
                        Get in touch
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-sm">
                        Have a project in mind? Let&apos;s build something amazing together.
                    </p>
                    <ContactForm />
                </motion.div>
            </div>

            {/* Particle Text Effect - Below Contact Form */}
            <div className="w-full h-[300px] md:h-[400px] relative mb-16">
                <ParticleTextEffect
                    text="RokiRoy"
                    className="w-full h-full"
                    colors={[
                        '8B5CF6',  // Purple
                        'A78BFA',  // Light Purple
                        'C084FC',  // Pink Purple
                        'E879F9',  // Magenta
                        'F472B6',  // Pink
                        '06B6D4',  // Cyan
                        '0EA5E9',  // Sky Blue
                    ]}
                    animationForce={60}
                    particleDensity={4}
                    enableInitialAnimation={true}
                />
            </div>

            {/* Bottom Bar - Below Particle Text */}
            <div className="absolute bottom-8 left-0 right-0 z-10">
                <div className="container-wide">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="pt-8 border-t border-white/10 text-center"
                    >
                        <p className="text-xs text-[var(--color-text-muted)]">
                            © {currentYear} RokiRoy Digital. Proudly building in <span className="text-white">Siliguri, India 🇮🇳</span>.
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}

// Social Icons
function GitHubIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );
}
