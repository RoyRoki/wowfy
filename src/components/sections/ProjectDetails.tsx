"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ParticleBurst } from "@/components/ui/ParticleBurst";
import { StackCard } from "@/components/ui/stack-card";
import { ScatteredGallery as ScatteredImageGallery } from "@/components/ui/scattered-gallery";
import type { Project } from "@/components/ui/Project3DCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectDetailsProps {
    project: Project;
    onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const narrativeRef = useRef<HTMLDivElement>(null);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
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
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(mediaQuery.matches);
    }, []);

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
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={cn(
                        "fixed z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors group",
                        isMobile ? "top-4 right-4" : "top-6 right-6"
                    )}
                >
                    <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Hero Section with 3D Device */}
                <section ref={heroRef} className={cn(
                    "relative flex items-center justify-center",
                    isMobile ? "min-h-[80vh] py-12 px-4" : "min-h-screen py-20"
                )}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/10 via-transparent to-[var(--color-background)]" />

                    <div className={cn(
                        "container-wide relative z-10 items-center",
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
                        </div>
                    </div>

                    {/* Scroll Indicator (Desktop only) */}
                    {!isMobile && (
                        <motion.div
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
                </section>

                {/* Scattered Image Gallery Section */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <ScatteredImageGallery
                        images={project.screenshots.slice(0, isMobile ? 4 : 8).map((src, i) => ({
                            id: `gallery-${i}`,
                            src,
                            title: i === 0 ? "Main Dashboard" : i === 1 ? "Core Features" : i === 2 ? "User Interface" : i === 3 ? "Analytics View" : i === 4 ? "Mobile View" : i === 5 ? "Settings Panel" : i === 6 ? "Integration Hub" : "Advanced Tools",
                            description: i === 0 ? project.description?.slice(0, 80) + "..." : undefined,
                            features: i === 0
                                ? project.tech?.slice(0, 3)
                                : i === 1
                                    ? ["Real-time", "Interactive", "Responsive"]
                                    : i === 2
                                        ? ["Modern UI", "Dark Mode", "Accessible"]
                                        : ["Optimized", "Scalable"],
                        }))}
                        projectTitle={project.title}
                        className={isMobile ? "py-4 pb-20" : "py-8"}
                    />
                )}
            </motion.div>
        </motion.div>
    );
}

