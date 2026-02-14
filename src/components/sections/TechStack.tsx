"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SphereImageGrid, { ImageData } from "@/components/ui/image-sphere";
import { TechModelViewer, preloadModels } from "@/components/ui/tech-model-viewer";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, AnimatePresence } from "framer-motion";
import { assetPath } from "@/lib/utils";
import techStackData from "@/data/tech-stack.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Transform the JSON data to match the component's expected format if needed,
// or just use it directly if it matches.
const TECH_LOGOS: ImageData[] = techStackData.logos;
const TECH_CATEGORIES = techStackData.categories;

const getTechCategories = () => TECH_CATEGORIES.map(cat => ({
    ...cat,
    modelPath: assetPath(cat.modelPath)
}));

// Preload all 3D models
if (typeof window !== "undefined") {
    preloadModels(getTechCategories().map(cat => cat.modelPath));
}

import { useMediaQuery } from "@/hooks/useMediaQuery";

export function TechStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const sphereContainerRef = useRef<HTMLDivElement>(null);
    const [activeModel, setActiveModel] = useState<string | null>(null);
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Track section visibility with Intersection Observer
    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsSectionVisible(entry.isIntersecting);

                    // Hide active model when leaving section
                    if (!entry.isIntersecting && activeModel) {
                        setActiveModel(null);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when at least 10% of section is visible
                rootMargin: '0px'
            }
        );

        observer.observe(sectionRef.current);

        return () => {
            observer.disconnect();
        };
    }, [activeModel]);

    useEffect(() => {
        if (!sectionRef.current || !textContainerRef.current) return;

        const ctx = gsap.context(() => {
            // Sphere entrance animation
            gsap.from(sphereContainerRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: -100,
                duration: 1.2,
                ease: "power3.out"
            });

            // Animate each tech category with high-level GSAP effects
            const categories = textContainerRef.current?.querySelectorAll(".tech-category");
            categories?.forEach((category, index) => {
                const label = category.querySelector(".tech-label");
                const slash = category.querySelector(".tech-slash");
                const tech = category.querySelector(".tech-name");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "top 40%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Split text into characters for label
                const labelChars = label?.textContent?.split("") || [];
                const techChars = tech?.textContent?.split("") || [];

                // Animate label with clip-path reveal
                tl.fromTo(label,
                    {
                        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                        opacity: 0
                    },
                    {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: index * 0.15
                    }
                )
                    // Animate slash with rotation and scale
                    .fromTo(slash,
                        {
                            scale: 0,
                            rotation: -45,
                            opacity: 0
                        },
                        {
                            scale: 1,
                            rotation: 0,
                            opacity: 0.3,
                            duration: 0.5,
                            ease: "back.out(2)"
                        },
                        "-=0.4"
                    )
                    // Animate tech name with clip-path and blur
                    .fromTo(tech,
                        {
                            clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                            opacity: 0,
                            filter: "blur(10px)"
                        },
                        {
                            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 0.9,
                            ease: "power3.out"
                        },
                        "-=0.5"
                    )
                    // Add subtle float animation
                    .to([label, tech], {
                        y: -5,
                        duration: 2,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1
                    }, "-=0.2");
            });


        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="tech-stack"
            ref={sectionRef}
            className="section-padding relative overflow-hidden bg-[var(--color-background)]"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background-alt)]/30 via-transparent to-[var(--color-background-alt)]/30" />

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
                <SectionHeader
                    eyebrow={techStackData.eyebrow}
                    title={techStackData.title}
                    gradientText={techStackData.gradientText}
                    description={techStackData.description}
                    center
                    className="mb-20"
                />

                {/* Main Content: Sphere + Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
                    {/* Left: 3D Sphere with Model Overlay */}
                    <div
                        ref={sphereContainerRef}
                        className="flex justify-center relative w-full"
                    >
                        <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square mx-auto">
                            {/* Globe - fades out when model is active */}
                            <AnimatePresence>
                                {!activeModel && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <SphereImageGrid
                                            images={TECH_LOGOS}
                                            containerSize={isMobile ? 350 : 600}
                                            sphereRadius={isMobile ? 130 : 220}
                                            dragSensitivity={0.8}
                                            momentumDecay={0.96}
                                            maxRotationSpeed={6}
                                            baseImageScale={0.15}
                                            hoverScale={1.3}
                                            perspective={1000}
                                            autoRotate={true}
                                            autoRotateSpeed={0.2}
                                            className="mx-auto w-full h-full"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 3D Model Viewer - Only render when section is visible */}
                            {isSectionVisible && activeModel && (
                                <TechModelViewer
                                    key={activeModel}
                                    modelPath={activeModel}
                                    onHide={() => setActiveModel(null)}
                                    autoHideDuration={3000}
                                />
                            )}
                        </div>
                    </div>

                    {/* Right: GSAP Animated Text */}
                    <div ref={textContainerRef} className="space-y-16">
                        {getTechCategories().map((category, index) => (
                            <div
                                key={category.label}
                                className="tech-category flex items-baseline gap-6 justify-center cursor-pointer transition-transform hover:scale-105"
                                onClick={() => setActiveModel(category.modelPath)}
                            >
                                {/* Label */}
                                <div className="text-right">
                                    <h3 className="tech-label text-4xl md:text-5xl lg:text-6xl font-bold text-white/40 tracking-tight">
                                        {category.label}
                                    </h3>
                                </div>

                                {/* Slash separator */}
                                <div className="tech-slash text-6xl md:text-7xl lg:text-8xl font-thin text-[var(--color-accent)]/30 select-none" style={{ lineHeight: '0.8' }}>
                                    /
                                </div>

                                {/* Tech name */}
                                <div className="text-left">
                                    <h3 className={`tech-name text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent tracking-tight`}>
                                        {category.tech}
                                    </h3>
                                </div>
                            </div>
                        ))}

                        {/* Additional info */}
                        <div className="mt-16 pt-8 border-t border-[var(--color-accent)]/20">
                            <p className="text-body text-[var(--color-text-muted)] leading-relaxed text-center lg:text-left">
                                {techStackData.footerText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-32 top-1/4 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-[var(--color-highlight)]/10 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
