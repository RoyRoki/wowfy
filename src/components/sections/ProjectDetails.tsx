"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ParticleBurst } from "@/components/ui/ParticleBurst";
import { StackCard } from "@/components/ui/stack-card";
import { ScatteredGallery as ScatteredImageGallery } from "@/components/ui/scattered-gallery";
import { MobileGallery } from "@/components/ui/mobile-gallery";
import type { Project } from "@/components/ui/Project3DCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailsProps {
    project: Project;
    onClose: () => void;
    backLabel?: string;
}

export function ProjectDetails({ project, onClose, backLabel = "Back to Works" }: ProjectDetailsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const narrativeRef = useRef<HTMLDivElement>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Modal-specific cursor
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
    const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        // Save original styles
        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalWidth = document.body.style.width;
        const originalTop = document.body.style.top;
        const scrollY = window.scrollY;

        // Lock body
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.top = `-${scrollY}px`;

        // Stop Lenis if it exists
        const lenisInstance = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
        if (lenisInstance) {
            lenisInstance.stop();
        }

        return () => {
            // Restore body
            document.body.style.overflow = originalOverflow;
            document.body.style.position = originalPosition;
            document.body.style.width = originalWidth;
            document.body.style.top = originalTop;
            window.scrollTo(0, scrollY);

            // Resume Lenis
            if (lenisInstance) {
                lenisInstance.start();
            }
        };
    }, []);

    // Check for reduced motion preference
    const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    // Modal cursor tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleInteractiveEnter = () => setIsHoveringInteractive(true);
        const handleInteractiveLeave = () => setIsHoveringInteractive(false);

        window.addEventListener("mousemove", handleMouseMove);

        // Track interactive elements within the modal
        const container = containerRef.current;
        if (container) {
            const interactiveElements = container.querySelectorAll(
                'a, button, [data-cursor="pointer"], input, textarea, [role="button"]'
            );
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleInteractiveEnter);
                el.addEventListener("mouseleave", handleInteractiveLeave);
            });
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [cursorX, cursorY]);

    // GSAP animations for narrative sections - target the scroll container
    useEffect(() => {
        if (!narrativeRef.current || !scrollContainerRef.current || isReducedMotion) return;

        const sections = narrativeRef.current.querySelectorAll(".narrative-section");
        const scroller = scrollContainerRef.current;

        const ctx = gsap.context(() => {
            sections.forEach((section, i) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            scroller: scroller,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Parallax for images
            const images = narrativeRef.current?.querySelectorAll(".parallax-image");
            images?.forEach((img) => {
                gsap.to(img, {
                    y: -50,
                    scrollTrigger: {
                        trigger: img,
                        scroller: scroller,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            });
        }, narrativeRef);

        return () => ctx.revert();
    }, [isReducedMotion]);

    // Parse metric value for counter
    const parseMetricValue = (value: string): number => {
        const num = parseFloat(value.replace(/[^0-9.]/g, ""));
        return isNaN(num) ? 0 : num;
    };

    const getMetricSuffix = (value: string): string => {
        if (value.includes("K")) return "K";
        if (value.includes("M")) return "M";
        if (value.includes("%")) return "%";
        if (value.includes("/mo")) return "/mo";
        if (value.includes("/day")) return "/day";
        return "";
    };

    const getMetricPrefix = (value: string): string => {
        if (value.startsWith("$")) return "$";
        return "";
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
        >
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Custom Modal Cursor (Desktop only) */}
            {!isMobile && (
                <>
                    <motion.div
                        className="pointer-events-none fixed z-[9999]"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    >
                        {/* Center dot */}
                        <motion.div
                            className="relative"
                            animate={{
                                scale: isHoveringInteractive ? 0.5 : 1,
                            }}
                            transition={{ duration: 0.15 }}
                        >
                            <div className="h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_15px_var(--color-accent)]" />
                        </motion.div>
                    </motion.div>

                    {/* Cursor ring */}
                    <motion.div
                        className="pointer-events-none fixed z-[9998]"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    >
                        <motion.div
                            className="rounded-full border-2 border-[var(--color-accent)]/60 shadow-[0_0_10px_var(--color-accent)]"
                            animate={{
                                width: isHoveringInteractive ? 48 : 32,
                                height: isHoveringInteractive ? 48 : 32,
                            }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                </>
            )}

            {/* Scrollable Content Container */}
            <motion.div
                ref={scrollContainerRef}
                className="relative h-full overflow-y-auto overscroll-contain"
                style={{ touchAction: "pan-y" }}
                onWheel={(e) => e.stopPropagation()}
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >



                {/* Hero Section with 3D Device */}
                <section ref={heroRef} className={cn(
                    "relative flex justify-center",
                    isMobile ? "min-h-[80vh] py-12 px-4" : "min-h-screen py-20"
                )}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/10 via-transparent to-[var(--color-background)]" />

                    <div className="container-wide relative z-10 flex flex-col gap-48">
                        {/* Back Button — row 1, top-left */}
                        <button
                            onClick={onClose}
                            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors group self-start"
                        >
                            <svg
                                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {backLabel}
                        </button>

                        {/* Row 2 — Cards + Description */}
                        <div className={cn(
                            "items-center",
                            isMobile ? "flex flex-col gap-8" : "grid lg:grid-cols-2 gap-12"
                        )}>
                            {/* Hero Project Images - Stack Card */}
                            <motion.div
                                className={cn(isMobile ? "order-2 w-full" : "order-2 lg:order-1")}
                                initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {project.screenshots && project.screenshots.length > 0 ? (
                                    <StackCard
                                        cards={project.screenshots.slice(0, 5).map((src, i) => ({
                                            id: `card-${i}`,
                                            src,
                                            alt: `${project.title} screenshot ${i + 1}`,
                                        }))}
                                        className="max-w-lg mx-auto"
                                    />
                                ) : (
                                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-highlight)]/30 flex items-center justify-center">
                                        <span className="text-8xl font-bold text-white/10">{project.title.charAt(0)}</span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Content */}
                            <div className={cn(
                                "order-1",
                                isMobile ? "text-center w-full" : "lg:order-2 text-center lg:text-left"
                            )}>
                                <motion.span
                                    className="inline-block text-sm text-[var(--color-highlight)] uppercase tracking-widest mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {project.year} • {project.role}
                                </motion.span>

                                <motion.h1
                                    className={cn(
                                        "font-bold text-white mb-6",
                                        isMobile ? "text-3xl" : "text-4xl md:text-6xl lg:text-7xl"
                                    )}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {project.title}
                                </motion.h1>

                                <motion.p
                                    className={cn(
                                        "text-[var(--color-text-muted)] mb-8",
                                        isMobile ? "text-sm max-w-full px-4" : "text-lg md:text-xl max-w-xl"
                                    )}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {project.description}
                                </motion.p>

                                {/* Tech Stack with Particle Burst */}
                                <motion.div
                                    className={cn(
                                        "flex flex-wrap gap-3",
                                        isMobile ? "justify-center px-4" : "justify-center lg:justify-start"
                                    )}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {project.tech.map((tech, i) => (
                                        <motion.span
                                            key={tech}
                                            className={cn(
                                                "relative rounded-full font-medium",
                                                "bg-[#7c3aed] backdrop-blur-sm",
                                                "border border-[#a78bfa]",
                                                "text-white",
                                                "transition-all duration-300",
                                                isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm cursor-pointer"
                                            )}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.05 }}
                                            whileHover={!isMobile ? {
                                                scale: 1.1,
                                                boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)",
                                            } : undefined}
                                            onMouseEnter={() => !isMobile && setHoveredTech(tech)}
                                            onMouseLeave={() => setHoveredTech(null)}
                                        >
                                            {tech}
                                            {!isMobile && hoveredTech === tech && <ParticleBurst trigger={true} />}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                {/* Live & GitHub Links */}
                                {(project.liveUrl || project.githubUrl) && (
                                    <motion.div
                                        className={cn(
                                            "flex gap-3 mt-4",
                                            isMobile ? "justify-center" : "justify-center lg:justify-start"
                                        )}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View on GitHub"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm transition-all hover:scale-105"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                </svg>
                                                GitHub
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View Live Site"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/40 backdrop-blur-sm border border-[var(--color-accent)]/40 text-white text-sm transition-all hover:scale-105"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Live Site
                                            </a>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Scroll Indicator (Desktop only) */}
                        {!isMobile && (
                            <motion.div
                                className="flex justify-center"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                                    <motion.div
                                        className="w-1.5 h-1.5 rounded-full bg-white/60"
                                        animate={{ y: [0, 12, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Gallery Section - Conditional Mobile/Desktop */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <>
                        {isMobile ? (
                            <MobileGallery
                                images={project.screenshots.slice(0, 6).map((src, i) => ({
                                    id: `gallery-${i}`,
                                    src,
                                    title: project.screenshotInfo?.[i]?.title ?? `Screen ${i + 1}`,
                                    description: project.screenshotInfo?.[i]?.description ?? (i === 0 ? project.description?.slice(0, 80) + "..." : undefined),
                                    features: project.screenshotInfo?.[i]?.features ?? project.tech?.slice(0, 3),
                                }))}
                                projectTitle={project.title}
                                className="py-4 pb-20"
                            />
                        ) : (
                            <ScatteredImageGallery
                                images={project.screenshots.slice(0, 8).map((src, i) => ({
                                    id: `gallery-${i}`,
                                    src,
                                    title: project.screenshotInfo?.[i]?.title ?? `Screen ${i + 1}`,
                                    description: project.screenshotInfo?.[i]?.description ?? (i === 0 ? project.description?.slice(0, 80) + "..." : undefined),
                                    features: project.screenshotInfo?.[i]?.features ?? project.tech?.slice(0, 3),
                                }))}
                                projectTitle={project.title}
                                className="py-8"
                            />
                        )}
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}

