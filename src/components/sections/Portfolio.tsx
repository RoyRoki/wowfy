"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";
import { Project3DCard, type Project } from "@/components/ui/Project3DCard";
import { KineticWords } from "@/components/ui/KineticText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Portfolio() {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    // Parallax scroll effect for background
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // GSAP header animation
    useEffect(() => {
        if (!headerRef.current || isReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        return () => ctx.revert();
    }, [isReducedMotion]);

    // Cast projects data with proper typing
    const projects = projectsData as Project[];
    const featuredProjects = projects.filter((p) => p.featured);

    // Navigate to project detail page
    const handleProjectClick = (projectId: string) => {
        router.push(`/projects/${projectId}`);
    };

    return (

        <section
            id="portfolio"
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[var(--color-background-alt)]/50" />
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/5 to-transparent"
                style={{ y: isReducedMotion ? 0 : y1 }}
            />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px),
                                            linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="container-wide relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <motion.span
                        className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-accent)] mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Selected Works
                    </motion.span>

                    <h2 className="text-headline mb-8">
                        <KineticWords
                            text="Featured Projects"
                            className="text-white"
                            delay={0.2}
                        />
                    </h2>

                    <motion.p
                        className="text-body-lg max-w-2xl mx-auto text-[var(--color-text-muted)]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        A curated selection of standout work, demonstrating precision in design, full-stack development, and innovative solutions across diverse domains.
                    </motion.p>
                </div>


                {/* Featured Projects Grid - 2 Rows Layout */}
                <div className="space-y-6 md:space-y-8 mb-20">
                    {/* Row 1: Projects 1 & 2 */}
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                    >
                        {featuredProjects.slice(0, 2).map((project, index) => (
                            <div key={project.id}>
                                <Project3DCard
                                    project={project}
                                    index={index}
                                    onClick={() => handleProjectClick(project.id)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Row 2: Projects 3, 4 & 5 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredProjects.slice(2, 5).map((project, index) => (
                            <div key={project.id}>
                                <Project3DCard
                                    project={project}
                                    index={index + 2}
                                    onClick={() => handleProjectClick(project.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* View All CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.button
                        className={cn(
                            "group relative inline-flex items-center gap-3",
                            "px-8 py-4 rounded-full",
                            "bg-transparent border-2 border-[var(--color-accent)]",
                            "text-[var(--color-accent)] font-medium",
                            "overflow-hidden transition-colors duration-300",
                            "hover:text-white"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        <span className="relative">View All Projects</span>
                        <svg
                            className="relative w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </motion.button>
                </motion.div>
            </div>

            {/* Decorative Elements with Parallax */}
            <motion.div
                className="absolute -right-32 top-1/4 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none"
                style={{ y: isReducedMotion ? 0 : y2 }}
            />
            <motion.div
                className="absolute -left-32 bottom-1/4 w-64 h-64 bg-[var(--color-highlight)]/10 rounded-full blur-[100px] pointer-events-none"
                style={{ y: isReducedMotion ? 0 : y1 }}
            />
        </section>
    );
}
