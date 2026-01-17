"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SphereImageGrid, { ImageData } from "@/components/ui/image-sphere";
import { TechModelViewer, preloadModels } from "@/components/ui/tech-model-viewer";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TECH_LOGOS: ImageData[] = [
    // Frontend
    { id: "nextjs", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", title: "Next.js", glowColor: "#FFFFFF" },
    { id: "react", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", title: "React", glowColor: "#61DAFB" },
    { id: "typescript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript", title: "TypeScript", glowColor: "#3178C6" },
    { id: "tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS", title: "Tailwind CSS", glowColor: "#06B6D4" },
    { id: "vue", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js", title: "Vue.js", glowColor: "#4FC08D" },

    // Backend
    { id: "golang", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", alt: "Golang", title: "Golang", glowColor: "#00ADD8" },
    { id: "nodejs", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", title: "Node.js", glowColor: "#339933" },
    { id: "python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", title: "Python", glowColor: "#3776AB" },
    { id: "postgresql", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL", title: "PostgreSQL", glowColor: "#4169E1" },
    { id: "mongodb", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB", title: "MongoDB", glowColor: "#47A248" },

    // AI/ML
    { id: "tensorflow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow", title: "TensorFlow", glowColor: "#FF6F00" },
    { id: "pytorch", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", alt: "PyTorch", title: "PyTorch", glowColor: "#EE4C2C" },
    { id: "openai", src: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", alt: "OpenAI", title: "OpenAI", glowColor: "#10A37F" },
    { id: "huggingface", src: "https://huggingface.co/front/assets/huggingface_logo.svg", alt: "Hugging Face", title: "Hugging Face", glowColor: "#FFD21E" },

    // Mobile & Tools
    { id: "flutter", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", alt: "Flutter", title: "Flutter", glowColor: "#02569B" },
    { id: "docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", title: "Docker", glowColor: "#2496ED" },
    { id: "kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes", title: "Kubernetes", glowColor: "#326CE5" },
    { id: "git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", title: "Git", glowColor: "#F05032" },
    { id: "graphql", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", alt: "GraphQL", title: "GraphQL", glowColor: "#E10098" },
    { id: "redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", alt: "Redis", title: "Redis", glowColor: "#DC382D" },
    { id: "aws", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", alt: "AWS", title: "AWS", glowColor: "#FF9900" },
    { id: "prisma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", alt: "Prisma", title: "Prisma", glowColor: "#2D3748" },
    { id: "firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase", title: "Firebase", glowColor: "#FFCA28" },
];

const TECH_CATEGORIES = [
    { label: "Frontend", tech: "Next.js", color: "from-white via-gray-200 to-gray-400", modelPath: "/3d/react_logo.glb" },
    { label: "Backend", tech: "Golang", color: "from-cyan-400 via-sky-500 to-blue-600", modelPath: "/3d/gopher.glb" },
    { label: "Mobile", tech: "Flutter", color: "from-pink-400 via-purple-500 to-blue-500", modelPath: "/3d/flutter.glb" },
];

// Preload all 3D models
if (typeof window !== "undefined") {
    preloadModels(TECH_CATEGORIES.map(cat => cat.modelPath));
}

export function TechStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const sphereContainerRef = useRef<HTMLDivElement>(null);
    const [activeModel, setActiveModel] = useState<string | null>(null);
    const [isSectionVisible, setIsSectionVisible] = useState(false);

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

            // Header animation
            gsap.from(".tech-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out"
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
                <div className="text-center mb-20 tech-header">
                    <span className="inline-block text-sm uppercase tracking-[0.3em] text-[var(--color-accent)] mb-6">
                        Technology Stack
                    </span>
                    <h2 className="text-headline mb-6">
                        Built with Modern Tools
                    </h2>
                    <p className="text-body-lg max-w-2xl mx-auto text-[var(--color-text-muted)]">
                        Leveraging cutting-edge technologies to deliver exceptional digital experiences
                    </p>
                </div>

                {/* Main Content: Sphere + Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
                    {/* Left: 3D Sphere with Model Overlay */}
                    <div
                        ref={sphereContainerRef}
                        className="flex justify-center lg:justify-end relative"
                    >
                        <div className="relative w-[600px] h-[600px]">
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
                                            containerSize={600}
                                            sphereRadius={220}
                                            dragSensitivity={0.8}
                                            momentumDecay={0.96}
                                            maxRotationSpeed={6}
                                            baseImageScale={0.15}
                                            hoverScale={1.3}
                                            perspective={1000}
                                            autoRotate={true}
                                            autoRotateSpeed={0.2}
                                            className="mx-auto"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* 3D Model Viewer - Only render when section is visible */}
                            {isSectionVisible && (
                                <TechModelViewer
                                    modelPath={activeModel}
                                    onHide={() => setActiveModel(null)}
                                    autoHideDuration={3000}
                                />
                            )}
                        </div>
                    </div>

                    {/* Right: GSAP Animated Text */}
                    <div ref={textContainerRef} className="space-y-16">
                        {TECH_CATEGORIES.map((category, index) => (
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
                            <p className="text-body text-[var(--color-text-muted)] leading-relaxed">
                                From responsive frontends to scalable backends and native mobile experiences,
                                I architect solutions using industry-leading frameworks and best practices.
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
